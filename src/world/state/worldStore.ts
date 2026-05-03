import { create } from 'zustand';
import type { TInteractionPayload, TPortalInteraction } from '../data/interactions';

export type TBiome = 'overworld' | 'nether';

type WorldState = {
  biome: TBiome;
  activeInteractable: TInteractionPayload | null;
  pendingPortal: TPortalInteraction | null;
  isTransitioning: boolean;
  spawnRequest: number; // increments to ask Player to respawn at biome's spawn
  setBiome: (biome: TBiome) => void;
  setActive: (p: TInteractionPayload | null) => void;
  triggerPortalAction: (p: TPortalInteraction) => void;
  clearPortalAction: () => void;
  startTransition: () => void;
  endTransition: () => void;
  triggerRespawn: () => void;
};

export const useWorldStore = create<WorldState>((set) => ({
  biome: 'overworld',
  activeInteractable: null,
  pendingPortal: null,
  isTransitioning: false,
  spawnRequest: 0,
  setBiome: (biome) => set({ biome }),
  setActive: (p) => set({ activeInteractable: p }),
  triggerPortalAction: (p) =>
    set((s) => (s.pendingPortal || s.isTransitioning ? s : { pendingPortal: p })),
  clearPortalAction: () => set({ pendingPortal: null }),
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
  triggerRespawn: () => set((s) => ({ spawnRequest: s.spawnRequest + 1 })),
}));
