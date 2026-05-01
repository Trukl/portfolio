import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { BLOCKS, type TBlockId } from '../blocks/palette';
import type { Vec3 } from '../physics/blockGrid';

type Props = {
  positionsByType: Record<TBlockId, Vec3[]>;
};

const BOX = new THREE.BoxGeometry(1, 1, 1);

function useMaterial(id: TBlockId) {
  return useMemo(() => {
    const def = BLOCKS[id];
    return new THREE.MeshStandardMaterial({
      color: def.color,
      emissive: def.emissive ?? '#000000',
      emissiveIntensity: def.emissiveIntensity ?? 0,
      transparent: def.transparent ?? false,
      opacity: def.opacity ?? 1,
      roughness: 0.85,
      metalness: 0,
    });
  }, [id]);
}

function InstancedBlocks({ id, positions }: { id: TBlockId; positions: Vec3[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const material = useMaterial(id);

  useEffect(() => {
    if (!ref.current) return;
    const m = new THREE.Matrix4();
    positions.forEach((p, i) => {
      m.makeTranslation(p[0] + 0.5, p[1] + 0.5, p[2] + 0.5);
      ref.current!.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  if (!positions.length) return null;
  return (
    <instancedMesh
      ref={ref}
      args={[BOX, material, positions.length]}
      castShadow={false}
      receiveShadow={false}
    />
  );
}

export function BlockField({ positionsByType }: Props) {
  return (
    <group>
      {(Object.keys(positionsByType) as TBlockId[]).map((id) => (
        <InstancedBlocks key={id} id={id} positions={positionsByType[id]} />
      ))}
    </group>
  );
}
