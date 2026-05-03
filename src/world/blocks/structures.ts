import type { TBlockId } from './palette';
import { BlockGrid, type Vec3 } from '../physics/blockGrid';

export type TPlacement = { pos: Vec3; id: TBlockId };

export function placeRect(
  grid: BlockGrid,
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number,
  id: TBlockId
) {
  const [minX, maxX] = [Math.min(x0, x1), Math.max(x0, x1)];
  const [minZ, maxZ] = [Math.min(z0, z1), Math.max(z0, z1)];
  for (let x = minX; x <= maxX; x++) {
    for (let z = minZ; z <= maxZ; z++) {
      grid.set(x, y, z, id);
    }
  }
}

export function placeBox(
  grid: BlockGrid,
  x0: number, y0: number, z0: number,
  x1: number, y1: number, z1: number,
  id: TBlockId,
  hollow = false
) {
  const [minX, maxX] = [Math.min(x0, x1), Math.max(x0, x1)];
  const [minY, maxY] = [Math.min(y0, y1), Math.max(y0, y1)];
  const [minZ, maxZ] = [Math.min(z0, z1), Math.max(z0, z1)];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (hollow && x !== minX && x !== maxX && y !== minY && y !== maxY && z !== minZ && z !== maxZ) {
          continue;
        }
        grid.set(x, y, z, id);
      }
    }
  }
}

/**
 * Build a small house centered on (cx, cz), 7x6x5 blocks.
 * Walls planks_oak, roof wood_dark, window glass on opposite wall, door opening facing -Z.
 * Returns the door interaction position (where player triggers the experience).
 */
export function buildHouse(
  grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { doorPos: Vec3; doorBlocks: Vec3[] } {
  const w = 7; // x width
  const d = 6; // z depth
  const h = 5; // y height (interior 4)
  const x0 = cx - Math.floor(w / 2);
  const x1 = x0 + w - 1;
  const z0 = cz - Math.floor(d / 2);
  const z1 = z0 + d - 1;
  const y0 = groundY + 1;
  const y1 = y0 + h - 1;

  // Floor (planks)
  placeRect(grid, x0, z0, x1, z1, y0, 'planks_oak');

  // Walls (planks_oak), hollow
  for (let y = y0 + 1; y < y1; y++) {
    for (let x = x0; x <= x1; x++) {
      grid.set(x, y, z0, 'planks_oak');
      grid.set(x, y, z1, 'planks_oak');
    }
    for (let z = z0 + 1; z < z1; z++) {
      grid.set(x0, y, z, 'planks_oak');
      grid.set(x1, y, z, 'planks_oak');
    }
  }

  // Corner pillars (wood_oak)
  for (let y = y0 + 1; y < y1; y++) {
    grid.set(x0, y, z0, 'wood_oak');
    grid.set(x1, y, z0, 'wood_oak');
    grid.set(x0, y, z1, 'wood_oak');
    grid.set(x1, y, z1, 'wood_oak');
  }

  // Window on +Z wall (glass)
  const wzCenterX = cx;
  for (let dx = -1; dx <= 1; dx++) {
    grid.set(wzCenterX + dx, y0 + 2, z1, 'glass');
  }
  // Window on -X wall
  for (let dz = -1; dz <= 1; dz++) {
    grid.set(x0, y0 + 2, cz + dz, 'glass');
  }

  // Roof (wood_dark) — flat slab + a slight rim
  for (let x = x0 - 1; x <= x1 + 1; x++) {
    for (let z = z0 - 1; z <= z1 + 1; z++) {
      grid.set(x, y1, z, 'wood_dark');
    }
  }

  // Door opening on -Z wall (centered, 1 wide x 2 high)
  const doorX = cx;
  const doorZ = z0;
  grid.delete(doorX, y0 + 1, doorZ);
  grid.delete(doorX, y0 + 2, doorZ);

  // Front porch path
  for (let dz = 1; dz <= 3; dz++) {
    grid.set(doorX, groundY, doorZ - dz, 'path');
  }

  // Glowstone lantern beside the door
  grid.set(doorX - 1, y0 + 2, doorZ - 1, 'glowstone');

  // Bookshelf inside near back wall — gives the sense of work
  grid.set(cx - 1, y0 + 1, z1 - 1, 'bookshelf');
  grid.set(cx, y0 + 1, z1 - 1, 'bookshelf');
  grid.set(cx + 1, y0 + 1, z1 - 1, 'bookshelf');

  // The door interaction box: just outside the doorway
  const doorPos: Vec3 = [doorX, y0 + 1, doorZ - 1];
  const doorBlocks: Vec3[] = [
    [doorX, y0 + 1, doorZ],
    [doorX, y0 + 2, doorZ],
  ];
  return { doorPos, doorBlocks };
}

export function buildTree(grid: BlockGrid, cx: number, cz: number, groundY: number) {
  const trunkH = 4;
  for (let i = 1; i <= trunkH; i++) {
    grid.set(cx, groundY + i, cz, 'wood_oak');
  }
  // leaves: 3x3x2 + top cross
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      if (Math.abs(dx) === 2 && Math.abs(dz) === 2) continue;
      grid.set(cx + dx, groundY + trunkH, cz + dz, 'leaves');
      if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) {
        grid.set(cx + dx, groundY + trunkH + 1, cz + dz, 'leaves');
      }
    }
  }
  grid.set(cx, groundY + trunkH + 2, cz, 'leaves');
  grid.set(cx + 1, groundY + trunkH + 2, cz, 'leaves');
  grid.set(cx - 1, groundY + trunkH + 2, cz, 'leaves');
  grid.set(cx, groundY + trunkH + 2, cz + 1, 'leaves');
  grid.set(cx, groundY + trunkH + 2, cz - 1, 'leaves');
}

/**
 * Build a 4x5 obsidian portal frame with portal blocks inside.
 * Returns the trigger center.
 */
export function buildPortal(
  grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { triggerPos: Vec3 } {
  const w = 4;
  const h = 5;
  const x0 = cx - Math.floor(w / 2);
  const x1 = x0 + w - 1;
  const y0 = groundY + 1;
  const y1 = y0 + h - 1;
  // Frame on the X-Y plane at z = cz
  for (let x = x0; x <= x1; x++) {
    grid.set(x, y0, cz, 'obsidian');
    grid.set(x, y1, cz, 'obsidian');
  }
  for (let y = y0; y <= y1; y++) {
    grid.set(x0, y, cz, 'obsidian');
    grid.set(x1, y, cz, 'obsidian');
  }
  // Portal interior
  for (let x = x0 + 1; x <= x1 - 1; x++) {
    for (let y = y0 + 1; y <= y1 - 1; y++) {
      grid.set(x, y, cz, 'portal');
    }
  }
  // Stone base under and a small cobble plaza
  for (let dx = -3; dx <= 3; dx++) {
    for (let dz = -3; dz <= 3; dz++) {
      grid.set(cx + dx, groundY, cz + dz, 'cobble');
    }
  }

  return { triggerPos: [cx, y0 + 1, cz] };
}

/**
 * Chest interaction point — visual is fully rendered by the Decorations layer
 * (no block placed here so the body+lid mesh sits flush on the ground).
 */
export function buildChest(
  _grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { pos: Vec3 } {
  return { pos: [cx, groundY + 1, cz] };
}

/**
 * Sign: a single wooden post block. The SignText decoration mounts a
 * readable plate on the +Z face of the post (facing the spawn).
 * Returns the post block position so the panel sits flush on it.
 */
export function buildSign(
  grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { pos: Vec3 } {
  grid.set(cx, groundY + 1, cz, 'wood_oak');
  return { pos: [cx, groundY + 1, cz] };
}

/**
 * NPC stand — purely an interaction point. The villager mesh stands
 * directly on the grass via the Decorations layer.
 */
export function buildNpc(
  _grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { pos: Vec3 } {
  return { pos: [cx, groundY + 1, cz] };
}

/**
 * A "project stand": small pedestal in the Nether, visually distinct.
 * Made of glowstone topped with quartz to grab attention.
 */
export function buildProjectStand(
  grid: BlockGrid,
  cx: number,
  cz: number,
  groundY: number
): { pos: Vec3 } {
  grid.set(cx, groundY + 1, cz, 'glowstone');
  grid.set(cx, groundY + 2, cz, 'quartz');
  return { pos: [cx, groundY + 3, cz] };
}
