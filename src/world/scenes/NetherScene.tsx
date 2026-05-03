import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { useMemo } from 'react';
import { BlockField } from '../components/BlockField';
import { Decorations } from '../components/Decorations';
import { Player } from '../components/Player';
import { buildNether } from '../data/layout';

export function NetherScene() {
  const scene = useMemo(() => buildNether(), []);
  const positionsByType = useMemo(() => scene.grid.byType(), [scene]);
  return (
    <>
      <color attach="background" args={['#2a0606']} />
      <ambientLight intensity={0.5} color="#ff8a4a" />
      <directionalLight position={[10, 30, 10]} intensity={0.4} color="#ff7a3a" />
      <pointLight position={[0, 8, 0]} intensity={1.6} color="#ffb070" distance={40} decay={1.4} />
      <fog attach="fog" args={['#3a0808', 12, 50]} />
      <BlockField positionsByType={positionsByType} />
      <Decorations items={scene.decorations} />
      <Player grid={scene.grid} spawn={scene.spawn} interactables={scene.interactables} />
      <EffectComposer multisampling={0} enableNormalPass>
        <N8AO
          aoRadius={1.0}
          intensity={2.0}
          distanceFalloff={0.8}
          color="#000000"
          quality="medium"
          halfRes
        />
      </EffectComposer>
    </>
  );
}
