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
      <ambientLight intensity={0.55} />
      <directionalLight position={[40, 60, 20]} intensity={1.0} />
      <hemisphereLight args={['#bcdfff', '#3a2a1a', 0.4]} />
      <fog attach="fog" args={['#cfe6ff', 25, 90]} />
      <BlockField positionsByType={positionsByType} />
      <Decorations items={scene.decorations} />
      <Player grid={scene.grid} spawn={scene.spawn} interactables={scene.interactables} />
    </>
  );
}
