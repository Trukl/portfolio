import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { KEY_MAP } from './controls/keymap';
import { Crosshair } from './hud/Crosshair';
import { ExitButton } from './hud/ExitButton';
import { HelpHint } from './hud/HelpHint';
import { InteractionModal } from './hud/InteractionModal';
import { InteractionPrompt } from './hud/InteractionPrompt';
import { TransitionOverlay } from './hud/TransitionOverlay';
import { NetherScene } from './scenes/NetherScene';
import { OverworldScene } from './scenes/OverworldScene';
import { useWorldStore } from './state/worldStore';

function PortalEffectHandler() {
  const modal = useWorldStore((s) => s.modal);
  const setBiome = useWorldStore((s) => s.setBiome);
  const startTransition = useWorldStore((s) => s.startTransition);
  const endTransition = useWorldStore((s) => s.endTransition);
  const closeModal = useWorldStore((s) => s.closeModal);
  const triggerRespawn = useWorldStore((s) => s.triggerRespawn);

  useEffect(() => {
    if (!modal || modal.kind !== 'portal') return;
    let mounted = true;
    startTransition();
    const t1 = setTimeout(() => {
      if (!mounted) return;
      setBiome(modal.destination);
      triggerRespawn();
    }, 500);
    const t2 = setTimeout(() => {
      if (!mounted) return;
      endTransition();
      closeModal();
    }, 900);
    return () => {
      mounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [modal, setBiome, startTransition, endTransition, closeModal, triggerRespawn]);

  return null;
}

export default function WorldRoot() {
  const biome = useWorldStore((s) => s.biome);

  // On mount, ensure we start fresh in the overworld each visit
  useEffect(() => {
    const store = useWorldStore.getState();
    store.setBiome('overworld');
    store.closeModal();
    store.endTransition();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <KeyboardControls map={KEY_MAP}>
        <Canvas
          shadows={false}
          dpr={[1, 1.5]}
          camera={{ fov: 75, near: 0.1, far: 200, position: [0, 1.9, 10] }}>
          {biome === 'overworld' ? <OverworldScene /> : <NetherScene />}
        </Canvas>
      </KeyboardControls>
      <Crosshair />
      <InteractionPrompt />
      <HelpHint />
      <ExitButton />
      <InteractionModal />
      <TransitionOverlay />
      <PortalEffectHandler />
    </div>
  );
}
