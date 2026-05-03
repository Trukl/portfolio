import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { TActionKey } from '../controls/keymap';
import { isOnGround, moveAxis } from '../physics/aabb';
import type { BlockGrid, Vec3 } from '../physics/blockGrid';
import { useWorldStore } from '../state/worldStore';
import type { TInteractable } from '../data/layout';

const WALK_SPEED = 4.5;
const SPRINT_SPEED = 7.5;
const GRAVITY = 25;
const JUMP_VELOCITY = 8.5;

type Props = {
  grid: BlockGrid;
  spawn: Vec3;
  interactables: TInteractable[];
};

export function Player({ grid, spawn, interactables }: Props) {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls<TActionKey>();
  const velocityY = useRef(0);
  const grounded = useRef(false);

  const isTransitioning = useWorldStore((s) => s.isTransitioning);
  const setActive = useWorldStore((s) => s.setActive);
  const triggerPortal = useWorldStore((s) => s.triggerPortalAction);
  const spawnRequest = useWorldStore((s) => s.spawnRequest);

  const forwardVec = useRef(new THREE.Vector3());
  const rightVec = useRef(new THREE.Vector3());
  const moveVec = useRef(new THREE.Vector3());

  // Spawn / respawn
  useEffect(() => {
    camera.position.set(spawn[0], spawn[1], spawn[2]);
    velocityY.current = 0;
  }, [camera, spawn, spawnRequest]);

  useFrame((_, dt) => {
    const clampedDt = Math.min(dt, 0.05);

    // Transition: freeze movement input but still apply gravity for stability
    if (!isTransitioning) {
      const state = getKeys();
      const moveX = (state.right ? 1 : 0) - (state.left ? 1 : 0);
      const moveZ = (state.back ? 1 : 0) - (state.forward ? 1 : 0);
      const sprinting = !!state.sprint;

      forwardVec.current.set(0, 0, -1).applyQuaternion(camera.quaternion);
      forwardVec.current.y = 0;
      forwardVec.current.normalize();
      rightVec.current.set(1, 0, 0).applyQuaternion(camera.quaternion);
      rightVec.current.y = 0;
      rightVec.current.normalize();

      moveVec.current.set(0, 0, 0);
      moveVec.current.addScaledVector(forwardVec.current, -moveZ);
      moveVec.current.addScaledVector(rightVec.current, moveX);
      if (moveVec.current.lengthSq() > 0) {
        moveVec.current.normalize().multiplyScalar(sprinting ? SPRINT_SPEED : WALK_SPEED);
      }

      // Jump
      if (state.jump && grounded.current) {
        velocityY.current = JUMP_VELOCITY;
        grounded.current = false;
      }
    } else {
      moveVec.current.set(0, 0, 0);
    }

    // Gravity
    velocityY.current -= GRAVITY * clampedDt;

    // Integrate with collision
    const pos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    // X
    {
      const r = moveAxis(pos, 'x', moveVec.current.x * clampedDt, grid);
      pos.x = r.newPos;
    }
    // Z
    {
      const r = moveAxis(pos, 'z', moveVec.current.z * clampedDt, grid);
      pos.z = r.newPos;
    }
    // Y
    {
      const r = moveAxis(pos, 'y', velocityY.current * clampedDt, grid);
      pos.y = r.newPos;
      if (r.hit) velocityY.current = 0;
    }
    grounded.current = isOnGround(pos, grid);
    if (grounded.current && velocityY.current < 0) velocityY.current = 0;

    // Recover from falls below the world
    if (pos.y < -20) {
      pos.x = spawn[0];
      pos.y = spawn[1];
      pos.z = spawn[2];
      velocityY.current = 0;
    }

    camera.position.set(pos.x, pos.y, pos.z);

    // ----- Interaction detection: nearest interactable in view cone -----
    let nearest: TInteractable | null = null;
    let nearestScore = -Infinity;
    const viewDir = forwardVec.current; // already up-to-date
    const eye = camera.position;
    for (const it of interactables) {
      const dx = it.pos[0] + 0.5 - eye.x;
      const dy = it.pos[1] + 0.5 - eye.y;
      const dz = it.pos[2] + 0.5 - eye.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist > it.radius + 1.5) continue;
      const inv = 1 / Math.max(dist, 0.001);
      const dot = (dx * viewDir.x + dz * viewDir.z) * inv; // ignore Y for cone
      // accept if either close enough OR roughly facing
      const score = dot - dist * 0.2;
      if ((dot > 0.2 || dist < it.radius) && score > nearestScore) {
        nearestScore = score;
        nearest = it;
      }
    }
    setActive(nearest ? nearest.payload : null);

    // Auto-trigger portal: walking into the frame fires the transition.
    if (nearest && nearest.payload.kind === 'portal' && !isTransitioning) {
      const dx = nearest.pos[0] + 0.5 - eye.x;
      const dz = nearest.pos[2] + 0.5 - eye.z;
      if (Math.sqrt(dx * dx + dz * dz) < 0.7) {
        triggerPortal(nearest.payload);
      }
    }

    // Camera y is the eye position (feet at y - 1.62 via aabb.ts).
  });

  return <PointerLockControls makeDefault />;
}
