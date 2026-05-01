import { create } from 'zustand';
import type { TInteractionPayload } from '../data/interactions';

export type TBiome = 'overworld' | 'nether';

type WorldState = {
  biome: TBiome;
  paused: boolean;
  activeInteractable: TInteractionPayload | null;
  modal: TInteractionPayload | null;
  isTransitioning: boolean;
  spawnRequest: number; // increments to ask Player to respawn at biome's spawn
  setBiome: (biome: TBiome) => void;
  setActive: (p: TInteractionPayload | null) => void;
  openModal: (p: TInteractionPayload) => void;
  closeModal: () => void;
  setPaused: (v: boolean) => void;
  startTransition: () => void;
  endTransition: () => void;
  triggerRespawn: () => void;
};

export const useWorldStore = create<WorldState>((set) => ({
  biome: 'overworld',
  paused: false,
  activeInteractable: null,
  modal: null,
  isTransitioning: false,
  spawnRequest: 0,
  setBiome: (biome) => set({ biome }),
  setActive: (p) => set({ activeInteractable: p }),
  openModal: (p) => set({ modal: p, paused: true, activeInteractable: null }),
  closeModal: () => set({ modal: null, paused: false }),
  setPaused: (v) => set({ paused: v }),
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
  triggerRespawn: () => set((s) => ({ spawnRequest: s.spawnRequest + 1 })),
}));
