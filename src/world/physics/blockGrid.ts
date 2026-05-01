import { BLOCKS, type TBlockId } from '../blocks/palette';

export type Vec3 = [number, number, number];

export class BlockGrid {
  private map = new Map<string, TBlockId>();

  static key(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  set(x: number, y: number, z: number, id: TBlockId): void {
    this.map.set(BlockGrid.key(x, y, z), id);
  }

  get(x: number, y: number, z: number): TBlockId | undefined {
    return this.map.get(BlockGrid.key(x, y, z));
  }

  has(x: number, y: number, z: number): boolean {
    return this.map.has(BlockGrid.key(x, y, z));
  }

  isSolid(x: number, y: number, z: number): boolean {
    const id = this.map.get(BlockGrid.key(x, y, z));
    if (!id) return false;
    return BLOCKS[id].solid;
  }

  delete(x: number, y: number, z: number): void {
    this.map.delete(BlockGrid.key(x, y, z));
  }

  entries(): Array<{ pos: Vec3; id: TBlockId }> {
    const out: Array<{ pos: Vec3; id: TBlockId }> = [];
    for (const [k, id] of this.map) {
      const [x, y, z] = k.split(',').map(Number);
      out.push({ pos: [x, y, z], id });
    }
    return out;
  }

  byType(): Record<TBlockId, Vec3[]> {
    const out = {} as Record<TBlockId, Vec3[]>;
    for (const [k, id] of this.map) {
      const [x, y, z] = k.split(',').map(Number);
      if (!out[id]) out[id] = [];
      out[id].push([x, y, z]);
    }
    return out;
  }

  size(): number {
    return this.map.size;
  }
}
