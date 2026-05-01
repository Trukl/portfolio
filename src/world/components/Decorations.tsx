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

function NpcVillager({ pos, topic }: { pos: [number, number, number]; topic: 'about' | 'contact' }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.4;
    ref.current.position.y = pos[1] + 0.5 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
  });
  const robeColor = topic === 'about' ? '#a23a2a' : '#2a5fa2';
  return (
    <group ref={ref} position={[pos[0] + 0.5, pos[1] + 0.5, pos[2] + 0.5]}>
      {/* Head */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial color="#c9a37a" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.45, 0.32]}>
        <boxGeometry args={[0.18, 0.22, 0.12]} />
        <meshStandardMaterial color="#a07054" />
      </mesh>
      {/* Body / robe */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.7, 0.8, 0.5]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>
      {/* Arms */}
      <mesh position={[0, -0.05, 0.2]}>
        <boxGeometry args={[0.55, 0.5, 0.18]} />
        <meshStandardMaterial color={robeColor} />
      </mesh>
    </group>
  );
}

function ChestLid({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={[pos[0] + 0.5, pos[1] - 0.5 + 0.92, pos[2] + 0.5]}>
      <mesh>
        <boxGeometry args={[0.96, 0.18, 0.96]} />
        <meshStandardMaterial color="#5b3a1d" />
      </mesh>
      {/* lock */}
      <mesh position={[0, -0.05, 0.5]}>
        <boxGeometry args={[0.18, 0.12, 0.04]} />
        <meshStandardMaterial color="#f3d24a" emissive="#7a5a08" emissiveIntensity={0.2} />
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
  // Color the orb based on slug hash for visual variety
  const hue = (Array.from(projectSlug).reduce((a, c) => a + c.charCodeAt(0), 0) % 360) / 360;
  const color = new THREE.Color().setHSL(hue, 0.7, 0.55).getStyle();
  return (
    <mesh ref={ref} position={[pos[0] + 0.5, pos[1] + 0.6, pos[2] + 0.5]}>
      <icosahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} />
    </mesh>
  );
}

function SignText({ pos, text }: { pos: [number, number, number]; text: string }) {
  return (
    <group position={[pos[0] + 0.5, pos[1] + 0.65, pos[2] + 0.55]}>
      <mesh>
        <planeGeometry args={[0.9, 0.35]} />
        <meshStandardMaterial color="#f1e5c6" />
      </mesh>
      <SignBars text={text} />
    </group>
  );
}

// SignBars is purely decorative (no library needed): a line of dark blocks suggesting text
function SignBars({ text }: { text: string }) {
  return (
    <group position={[0, 0, 0.01]}>
      {Array.from({ length: Math.min(text.length, 8) }).map((_, i) => (
        <mesh key={i} position={[-0.32 + i * 0.08, 0, 0]}>
          <planeGeometry args={[0.05, 0.08]} />
          <meshStandardMaterial color="#3a2a1a" />
        </mesh>
      ))}
    </group>
  );
}

export function Decorations({ items }: { items: TDecoration[] }) {
  return (
    <group>
      {items.map((d, i) => {
        if (d.kind === 'portal-shimmer') return <PortalShimmer key={i} pos={d.pos} size={d.size} />;
        if (d.kind === 'npc') return <NpcVillager key={i} pos={d.pos} topic={d.topic} />;
        if (d.kind === 'chest-lid') return <ChestLid key={i} pos={d.pos} />;
        if (d.kind === 'project-banner') {
          return <ProjectBanner key={i} pos={d.pos} projectSlug={d.projectSlug} />;
        }
        if (d.kind === 'sign-text') return <SignText key={i} pos={d.pos} text={d.text} />;
        return null;
      })}
    </group>
  );
}
