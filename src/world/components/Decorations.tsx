import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { TDecoration } from '../data/layout';

function PortalShimmer({ pos, size }: { pos: [number, number, number]; size: [number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const m = ref.current.material as THREE.MeshStandardMaterial;
    m.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 2.4) * 0.4;
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.02;
  });
  return (
    <mesh ref={ref} position={[pos[0] + 0.5, pos[1] + 0.5, pos[2] + 0.5]}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial
        color="#a86bff"
        emissive="#9a4bff"
        emissiveIntensity={1.2}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Villager: group origin = grass top (pos.y = 1 = top of the y=0 grass block).
 * All inner mesh positions are relative to the feet (y=0 = ground level).
 * Total height ~1.85 blocks, similar to the player camera.
 */
function NpcVillager({
  pos,
  topic,
}: {
  pos: [number, number, number];
  topic: 'about' | 'contact';
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.4;
    ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * 1.5) * 0.04;
  });
  const robeColor = topic === 'about' ? '#a23a2a' : '#2a5fa2';
  return (
    <group ref={ref} position={[pos[0] + 0.5, pos[1], pos[2] + 0.5]}>
      {/* Legs (feet at y=0, top at y=0.6) */}
      <mesh position={[-0.18, 0.3, 0]} castShadow>
        <boxGeometry args={[0.28, 0.6, 0.3]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      <mesh position={[0.18, 0.3, 0]} castShadow>
        <boxGeometry args={[0.28, 0.6, 0.3]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>
      {/* Body / robe (y 0.6 → 1.3) */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.42]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>
      {/* Arms folded forward */}
      <mesh position={[0, 1.0, 0.22]} castShadow>
        <boxGeometry args={[0.6, 0.45, 0.2]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>
      {/* Head (y 1.3 → 1.85) */}
      <mesh position={[0, 1.575, 0]} castShadow>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial color="#c9a37a" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 1.52, 0.32]} castShadow>
        <boxGeometry args={[0.18, 0.2, 0.14]} />
        <meshStandardMaterial color="#a07054" />
      </mesh>
    </group>
  );
}

/**
 * Chest = body + trim + lid + lock, sitting flush on the grass.
 * Group origin is at grass top, positions relative to that.
 */
function Chest({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={[pos[0] + 0.5, pos[1], pos[2] + 0.5]}>
      {/* Body (y 0 → 0.7) */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.92, 0.7, 0.92]} />
        <meshStandardMaterial color="#7a4a1f" />
      </mesh>
      {/* Trim */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.96, 0.08, 0.96]} />
        <meshStandardMaterial color="#5b3a1d" />
      </mesh>
      {/* Lid (sits flush on top of body, y 0.7 → 0.92) */}
      <mesh position={[0, 0.81, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.94, 0.22, 0.94]} />
        <meshStandardMaterial color="#8d5a26" />
      </mesh>
      {/* Lock */}
      <mesh position={[0, 0.7, 0.48]} castShadow>
        <boxGeometry args={[0.16, 0.18, 0.06]} />
        <meshStandardMaterial
          color="#f3d24a"
          emissive="#7a5a08"
          emissiveIntensity={0.25}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

function ProjectBanner({
  pos,
  projectSlug,
}: {
  pos: [number, number, number];
  projectSlug: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = pos[1] + 0.6 + Math.sin(clock.elapsedTime * 1.5 + pos[0]) * 0.08;
    ref.current.rotation.y = clock.elapsedTime * 0.6;
  });
  const hue = (Array.from(projectSlug).reduce((a, c) => a + c.charCodeAt(0), 0) % 360) / 360;
  const color = new THREE.Color().setHSL(hue, 0.7, 0.55).getStyle();
  return (
    <mesh ref={ref} position={[pos[0] + 0.5, pos[1] + 0.6, pos[2] + 0.5]} castShadow>
      <icosahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

/**
 * Sign panel floating just above a 2-block wooden post. Group origin is at
 * the top of the post (pos = [cx, groundY+2, cz] from buildSign).
 */
function SignText({ pos, text }: { pos: [number, number, number]; text: string }) {
  return (
    <group position={[pos[0] + 0.5, pos[1] + 1.0, pos[2] + 0.5]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.7, 0.08]} />
        <meshStandardMaterial color="#f1e5c6" />
      </mesh>
      <group position={[0, 0, 0.05]}>
        {Array.from({ length: Math.min(text.length, 8) }).map((_, i) => (
          <mesh key={i} position={[-0.5 + i * 0.13, 0, 0]}>
            <planeGeometry args={[0.08, 0.18]} />
            <meshStandardMaterial color="#3a2a1a" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Decorations({ items }: { items: TDecoration[] }) {
  return (
    <group>
      {items.map((d, i) => {
        if (d.kind === 'portal-shimmer') return <PortalShimmer key={i} pos={d.pos} size={d.size} />;
        if (d.kind === 'npc') return <NpcVillager key={i} pos={d.pos} topic={d.topic} />;
        if (d.kind === 'chest-lid') return <Chest key={i} pos={d.pos} />;
        if (d.kind === 'project-banner') {
          return <ProjectBanner key={i} pos={d.pos} projectSlug={d.projectSlug} />;
        }
        if (d.kind === 'sign-text') return <SignText key={i} pos={d.pos} text={d.text} />;
        return null;
      })}
    </group>
  );
}
