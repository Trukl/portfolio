import type { TTechType } from '@/models/types';

export type TSkillGroup = {
  slug: string;
  title: string;
  techs: TTechType[];
};

export const skillGroups: TSkillGroup[] = [
  {
    slug: 'frontend',
    title: 'Front-end & Web',
    techs: ['REACT', 'NEXTJS', 'VITE', 'TAILWIND', 'TS', 'JS'],
  },
  {
    slug: 'mobile',
    title: 'Mobile',
    techs: ['REACT_NATIVE', 'EXPO', 'TS'],
  },
  {
    slug: 'backend',
    title: 'Back-end & Données',
    techs: ['FASTIFY', 'PRISMA', 'ZOD', 'SOCKETIO'],
  },
];

export function getSkillGroup(slug: string): TSkillGroup | undefined {
  return skillGroups.find((s) => s.slug === slug);
}
