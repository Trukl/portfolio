import { BlockGrid } from './blockGrid';

export type Box = { min: [number, number, number]; max: [number, number, number] };

// Player AABB is asymmetric around the camera (which is the eye):
//   feet at  py - EYE_FROM_FEET
//   head at  py + HEAD_ABOVE_EYE
// Total height = 1.8 blocks (Minecraft-like proportions).
export const PLAYER_HALF_XZ = 0.3;
export const EYE_FROM_FEET = 1.62;
export const HEAD_ABOVE_EYE = 0.18;

const EPS = 1e-3;

function playerBox(px: number, py: number, pz: number): Box {
  return {
    min: [px - PLAYER_HALF_XZ, py - EYE_FROM_FEET, pz - PLAYER_HALF_XZ],
    max: [px + PLAYER_HALF_XZ, py + HEAD_ABOVE_EYE, pz + PLAYER_HALF_XZ],
  };
}

function boxIntersectsSolidBlock(box: Box, grid: BlockGrid): boolean {
  const minX = Math.floor(box.min[0]);
  const maxX = Math.floor(box.max[0]);
  const minY = Math.floor(box.min[1]);
  const maxY = Math.floor(box.max[1]);
  const minZ = Math.floor(box.min[2]);
  const maxZ = Math.floor(box.max[2]);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (!grid.isSolid(x, y, z)) continue;
        if (
          box.min[0] < x + 1 &&
          box.max[0] > x &&
          box.min[1] < y + 1 &&
          box.max[1] > y &&
          box.min[2] < z + 1 &&
          box.max[2] > z
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function moveAxis(
  pos: { x: number; y: number; z: number },
  axis: 'x' | 'y' | 'z',
  delta: number,
  grid: BlockGrid
): { hit: boolean; newPos: number } {
  if (delta === 0) return { hit: false, newPos: pos[axis] };
  const next = pos[axis] + delta;
  const test = { ...pos, [axis]: next };
  const box = playerBox(test.x, test.y, test.z);
  if (!boxIntersectsSolidBlock(box, grid)) {
    return { hit: false, newPos: next };
  }
  let snapped = pos[axis];
  if (axis === 'x') {
    snapped = delta > 0
      ? Math.floor(next + PLAYER_HALF_XZ) - PLAYER_HALF_XZ - EPS
      : Math.ceil(next - PLAYER_HALF_XZ) + PLAYER_HALF_XZ + EPS;
  } else if (axis === 'y') {
    snapped = delta > 0
      ? Math.floor(next + HEAD_ABOVE_EYE) - HEAD_ABOVE_EYE - EPS
      : Math.ceil(next - EYE_FROM_FEET) + EYE_FROM_FEET + EPS;
  } else {
    snapped = delta > 0
      ? Math.floor(next + PLAYER_HALF_XZ) - PLAYER_HALF_XZ - EPS
      : Math.ceil(next - PLAYER_HALF_XZ) + PLAYER_HALF_XZ + EPS;
  }
  return { hit: true, newPos: snapped };
}

export function isOnGround(
  pos: { x: number; y: number; z: number },
  grid: BlockGrid
): boolean {
  const probe = playerBox(pos.x, pos.y - EPS * 4, pos.z);
  return boxIntersectsSolidBlock(probe, grid);
}
