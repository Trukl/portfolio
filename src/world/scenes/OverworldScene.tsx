import { Sky } from '@react-three/drei';
import { useMemo } from 'react';
import { BlockField } from '../components/BlockField';
import { Decorations } from '../components/Decorations';
import { Player } from '../components/Player';
import { buildOverworld } from '../data/layout';

export function OverworldScene() {
  const scene = useMemo(() => buildOverworld(), []);
  const positionsByType = useMemo(() => scene.grid.byType(), [scene]);
  return (
    <>
      <Sky sunPosition={[80, 30, 50]} turbidity={3} rayleigh={1.2} mieCoefficient={0.005} />
      <ambientLight intensity={0.32} color="#cfe6ff" />
      <hemisphereLight args={['#bcdfff', '#3a2a1a', 0.22]} />
      <directionalLight
        position={[40, 60, 20]}
        intensity={1.35}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={180}
        shadow-camera-left={-35}
        shadow-camera-right={35}
        shadow-camera-top={35}
        shadow-camera-bottom={-35}
        shadow-bias={-0.0008}
        shadow-normalBias={0.03}
      />
      <fog attach="fog" args={['#cfe6ff', 30, 95]} />
      <BlockField positionsByType={positionsByType} />
      <Decorations items={scene.decorations} />
      <Player grid={scene.grid} spawn={scene.spawn} interactables={scene.interactables} />
    </>
  );
}
