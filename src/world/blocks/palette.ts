export type TBlockId =
  | 'grass'
  | 'dirt'
  | 'stone'
  | 'wood_oak'
  | 'wood_dark'
  | 'planks_oak'
  | 'leaves'
  | 'cobble'
  | 'glass'
  | 'sand'
  | 'water'
  | 'path'
  | 'netherrack'
  | 'soul_sand'
  | 'glowstone'
  | 'obsidian'
  | 'portal'
  | 'lava'
  | 'quartz'
  | 'bookshelf'
  | 'gold';

export type TBlockDef = {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
  solid: boolean;
};

export const BLOCKS: Record<TBlockId, TBlockDef> = {
  grass: { color: '#6cae3e', solid: true },
  dirt: { color: '#8b5a2b', solid: true },
  stone: { color: '#7d7d7d', solid: true },
  wood_oak: { color: '#a07346', solid: true },
  wood_dark: { color: '#5b3a1d', solid: true },
  planks_oak: { color: '#c3955b', solid: true },
  leaves: { color: '#3f8b2a', solid: true },
  cobble: { color: '#6b6b6b', solid: true },
  glass: { color: '#bce4ff', transparent: true, opacity: 0.35, solid: false },
  sand: { color: '#e8d9a0', solid: true },
  water: { color: '#3b82c4', transparent: true, opacity: 0.6, solid: false },
  path: { color: '#a07c4b', solid: true },
  netherrack: { color: '#6e1f1c', solid: true },
  soul_sand: { color: '#604031', solid: true },
  glowstone: { color: '#f5c44b', emissive: '#f5c44b', emissiveIntensity: 0.9, solid: true },
  obsidian: { color: '#1d1228', solid: true },
  portal: {
    color: '#7a3bd1',
    emissive: '#a86bff',
    emissiveIntensity: 1.4,
    transparent: true,
    opacity: 0.75,
    solid: false,
  },
  lava: { color: '#ff6a1a', emissive: '#ff8a1a', emissiveIntensity: 1.0, solid: true },
  quartz: { color: '#ece5d8', solid: true },
  bookshelf: { color: '#7a4a1f', solid: true },
  gold: { color: '#f3d24a', emissive: '#7a5a08', emissiveIntensity: 0.2, solid: true },
};
