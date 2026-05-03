import { projects } from '@/models/constants';
import type { TBlockId } from '../blocks/palette';
import {
  buildChest,
  buildHouse,
  buildNpc,
  buildPortal,
  buildProjectStand,
  buildSign,
  buildTree,
  placeRect,
} from '../blocks/structures';
import { BlockGrid, type Vec3 } from '../physics/blockGrid';
import { experiences } from './experiences';
import type { TInteractionPayload } from './interactions';
import { skillGroups } from './skills';

export type TInteractable = {
  id: string;
  pos: Vec3; // world position of the interaction point (eye-height target)
  radius: number; // sphere of detection (m)
  label: string;
  payload: TInteractionPayload;
};

export type TBuiltScene = {
  grid: BlockGrid;
  interactables: TInteractable[];
  spawn: Vec3;
  // optional decorative meshes data (for portal shimmer, npc head, etc.)
  decorations: TDecoration[];
};

export type TDecoration =
  | { kind: 'portal-shimmer'; pos: Vec3; size: [number, number] }
  | { kind: 'chest-lid'; pos: Vec3 }
  | { kind: 'npc'; pos: Vec3; topic: 'about' | 'contact' }
  | { kind: 'project-banner'; pos: Vec3; projectSlug: string }
  | { kind: 'sign-text'; pos: Vec3; text: string };

const GROUND_Y = 0;

// ---------------- OVERWORLD ----------------
export function buildOverworld(): TBuiltScene {
  const grid = new BlockGrid();
  const interactables: TInteractable[] = [];
  const decorations: TDecoration[] = [];

  // Ground 50x50 grass + a dirt halo + cobble paths
  const HALF = 25;
  for (let x = -HALF; x <= HALF; x++) {
    for (let z = -HALF; z <= HALF; z++) {
      const r = Math.max(Math.abs(x), Math.abs(z));
      let id: TBlockId = 'grass';
      if (r > HALF - 1) id = 'dirt';
      grid.set(x, GROUND_Y, z, id);
      grid.set(x, GROUND_Y - 1, z, 'dirt');
      grid.set(x, GROUND_Y - 2, z, 'stone');
    }
  }

  // Central plaza (cobble)
  placeRect(grid, -3, -3, 3, 3, GROUND_Y, 'cobble');

  // Path leading to the spawn (south)
  for (let z = 4; z <= 12; z++) grid.set(0, GROUND_Y, z, 'path');

  // 4 houses around the plaza, one per experience.
  // Placed cardinally so each is reachable on foot.
  const housePositions: Array<{ slug: string; cx: number; cz: number }> = [
    { slug: experiences[0].slug, cx: -10, cz: -10 },
    { slug: experiences[1].slug, cx: 10, cz: -10 },
    { slug: experiences[2].slug, cx: -12, cz: 8 },
    { slug: experiences[3].slug, cx: 12, cz: 8 },
  ];

  for (const h of housePositions) {
    const exp = experiences.find((e) => e.slug === h.slug);
    if (!exp) continue;
    const { doorPos } = buildHouse(grid, h.cx, h.cz, GROUND_Y);
    interactables.push({
      id: `house-${h.slug}`,
      pos: doorPos,
      radius: 2.0,
      label: `Entrer chez ${exp.company}`,
      payload: { kind: 'house', experienceSlug: h.slug },
    });
    // Path from plaza to each house
    drawPath(grid, 0, 0, h.cx, h.cz);
  }

  // Trees scattered
  const treeSpots: Array<[number, number]> = [
    [-18, -18], [18, -18], [-20, 5], [20, 5], [-5, -20], [6, -20], [-15, 18], [15, 18],
  ];
  for (const [tx, tz] of treeSpots) buildTree(grid, tx, tz, GROUND_Y);

  // Skill chests on the central plaza, each linked to a SkillGroup
  const chestSpots: Array<{ slug: string; pos: [number, number] }> = [
    { slug: skillGroups[0].slug, pos: [-3, 0] },
    { slug: skillGroups[1].slug, pos: [0, -3] },
    { slug: skillGroups[2].slug, pos: [3, 0] },
  ];
  for (const c of chestSpots) {
    const grp = skillGroups.find((s) => s.slug === c.slug);
    if (!grp) continue;
    const { pos } = buildChest(grid, c.pos[0], c.pos[1], GROUND_Y);
    interactables.push({
      id: `chest-${c.slug}`,
      pos,
      radius: 1.6,
      label: `Ouvrir le coffre — ${grp.title}`,
      payload: { kind: 'chest', title: grp.title, techs: grp.techs },
    });
    decorations.push({ kind: 'chest-lid', pos });
  }

  // NPC villager (about) near the spawn entrance
  {
    const { pos } = buildNpc(grid, 2, 6, GROUND_Y);
    interactables.push({
      id: 'npc-about',
      pos,
      radius: 1.8,
      label: 'Parler au villageois (À propos)',
      payload: { kind: 'npc', topic: 'about' },
    });
    decorations.push({ kind: 'npc', pos, topic: 'about' });
  }
  // NPC contact
  {
    const { pos } = buildNpc(grid, -2, 6, GROUND_Y);
    interactables.push({
      id: 'npc-contact',
      pos,
      radius: 1.8,
      label: 'Parler au villageois (Contact)',
      payload: { kind: 'npc', topic: 'contact' },
    });
    decorations.push({ kind: 'npc', pos, topic: 'contact' });
  }

  // Welcome sign at the spawn
  {
    const { pos } = buildSign(grid, 0, 11, GROUND_Y);
    const text =
      "Bienvenue dans mon monde ! Visite les maisons (expériences), ouvre les coffres (compétences), parle aux villageois (à propos / contact). Le portail violet mène à mes projets perso.";
    interactables.push({
      id: 'sign-welcome',
      pos,
      radius: 1.6,
      label: 'Lire le panneau',
      payload: { kind: 'sign', title: 'Bienvenue', text },
    });
    decorations.push({ kind: 'sign-text', pos, text: 'Bienvenue !' });
  }

  // Nether portal (north of plaza)
  {
    const { triggerPos } = buildPortal(grid, 0, -14, GROUND_Y);
    interactables.push({
      id: 'portal-to-nether',
      pos: triggerPos,
      radius: 1.4,
      label: 'Entrer dans le portail du Nether',
      payload: { kind: 'portal', destination: 'nether' },
    });
    decorations.push({ kind: 'portal-shimmer', pos: triggerPos, size: [2, 3] });
    // Path from plaza to portal
    for (let z = -4; z >= -12; z--) grid.set(0, GROUND_Y, z, 'path');
  }

  return { grid, interactables, spawn: [0, GROUND_Y + 2.62, 10], decorations };
}

// ---------------- NETHER ----------------
export function buildNether(): TBuiltScene {
  const grid = new BlockGrid();
  const interactables: TInteractable[] = [];
  const decorations: TDecoration[] = [];

  // Nether floor 40x40 of netherrack with veins of soul_sand
  const HALF = 20;
  for (let x = -HALF; x <= HALF; x++) {
    for (let z = -HALF; z <= HALF; z++) {
      const id: TBlockId = (Math.abs(x + z) % 7 === 0) ? 'soul_sand' : 'netherrack';
      grid.set(x, GROUND_Y, z, id);
      grid.set(x, GROUND_Y - 1, z, 'netherrack');
    }
  }

  // Lava pools
  for (let i = 0; i < 6; i++) {
    const lx = (i * 7) - 14;
    const lz = (i % 2 === 0) ? -12 : 12;
    grid.set(lx, GROUND_Y, lz, 'lava');
    grid.set(lx + 1, GROUND_Y, lz, 'lava');
    grid.set(lx, GROUND_Y, lz + 1, 'lava');
  }

  // Glowstone clusters in the "ceiling" decoration (high up, just visual blocks)
  const glowSpots: Array<[number, number, number]> = [
    [-8, 7, -8], [8, 7, -8], [0, 7, 8], [-6, 7, 6], [6, 7, 6],
  ];
  for (const [gx, gy, gz] of glowSpots) grid.set(gx, gy, gz, 'glowstone');

  // Portal back to overworld
  {
    const { triggerPos } = buildPortal(grid, 0, 12, GROUND_Y);
    interactables.push({
      id: 'portal-to-overworld',
      pos: triggerPos,
      radius: 1.4,
      label: 'Retourner dans le monde',
      payload: { kind: 'portal', destination: 'overworld' },
    });
    decorations.push({ kind: 'portal-shimmer', pos: triggerPos, size: [2, 3] });
  }

  // Project stands — one per visible project, in a circle
  const visibleProjects = projects.filter((p) => !p.hidden);
  const radius = 9;
  visibleProjects.forEach((proj, i) => {
    const angle = (i / visibleProjects.length) * Math.PI * 2 - Math.PI / 2;
    const cx = Math.round(Math.cos(angle) * radius);
    const cz = Math.round(Math.sin(angle) * radius);
    const { pos } = buildProjectStand(grid, cx, cz, GROUND_Y);
    interactables.push({
      id: `project-${proj.slug}`,
      pos,
      radius: 1.8,
      label: `Voir le projet ${proj.title}`,
      payload: { kind: 'projectStand', projectSlug: proj.slug ?? '' },
    });
    decorations.push({ kind: 'project-banner', pos, projectSlug: proj.slug ?? '' });
  });

  return { grid, interactables, spawn: [0, GROUND_Y + 2.62, 9], decorations };
}

// ---------------- helpers ----------------
function drawPath(grid: BlockGrid, x0: number, z0: number, x1: number, z1: number) {
  // simple L-shaped path, only over grass
  const stepX = Math.sign(x1 - x0);
  for (let x = x0; x !== x1; x += stepX) {
    if (grid.get(x, GROUND_Y, z0) === 'grass') grid.set(x, GROUND_Y, z0, 'path');
  }
  const stepZ = Math.sign(z1 - z0);
  for (let z = z0; z !== z1; z += stepZ) {
    if (grid.get(x1, GROUND_Y, z) === 'grass') grid.set(x1, GROUND_Y, z, 'path');
  }
}
