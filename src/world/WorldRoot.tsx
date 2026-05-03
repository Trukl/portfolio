import { KeyboardControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { KEY_MAP } from './controls/keymap';
import { ChatBubble } from './hud/ChatBubble';
import { Crosshair } from './hud/Crosshair';
import { ExitButton } from './hud/ExitButton';
import { HelpHint } from './hud/HelpHint';
import { TransitionOverlay } from './hud/TransitionOverlay';
import { NetherScene } from './scenes/NetherScene';
import { OverworldScene } from './scenes/OverworldScene';
import { useWorldStore } from './state/worldStore';

function PortalEffectHandler() {
  const pendingPortal = useWorldStore((s) => s.pendingPortal);
  const setBiome = useWorldStore((s) => s.setBiome);
  const startTransition = useWorldStore((s) => s.startTransition);
  const endTransition = useWorldStore((s) => s.endTransition);
  const clearPortalAction = useWorldStore((s) => s.clearPortalAction);
  const triggerRespawn = useWorldStore((s) => s.triggerRespawn);

  useEffect(() => {
    if (!pendingPortal) return;
    let mounted = true;
    startTransition();
    const t1 = setTimeout(() => {
      if (!mounted) return;
      setBiome(pendingPortal.destination);
      triggerRespawn();
    }, 500);
    const t2 = setTimeout(() => {
      if (!mounted) return;
      endTransition();
      clearPortalAction();
    }, 900);
    return () => {
      mounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pendingPortal, setBiome, startTransition, endTransition, clearPortalAction, triggerRespawn]);

  return null;
}

export default function WorldRoot() {
  const biome = useWorldStore((s) => s.biome);

  // Reset state on entry so revisits start fresh in the overworld
  useEffect(() => {
    const store = useWorldStore.getState();
    store.setBiome('overworld');
    store.clearPortalAction();
    store.endTransition();
    store.setActive(null);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <KeyboardControls map={KEY_MAP}>
        <Canvas
          shadows="soft"
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
          camera={{ fov: 75, near: 0.1, far: 200, position: [0, 2.62, 10] }}>
          {biome === 'overworld' ? <OverworldScene /> : <NetherScene />}
        </Canvas>
      </KeyboardControls>
      <Crosshair />
      <ChatBubble />
      <HelpHint />
      <ExitButton />
      <TransitionOverlay />
      <PortalEffectHandler />
    </div>
  );
}
