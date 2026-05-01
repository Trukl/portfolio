import type { TTechType } from '@/models/types';

export type TExperience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  techs: TTechType[];
  highlights: string[];
};

export const experiences: TExperience[] = [
  {
    slug: 'freelance',
    company: 'Freelance',
    role: 'Développeur Full-Stack',
    period: '2023 — Aujourd’hui',
    description:
      "Conception et développement d'applications web et mobiles pour mes propres produits (DoggySafe, MyCrochet) et pour des clients : architecture, UX, déploiement.",
    techs: ['REACT', 'REACT_NATIVE', 'EXPO', 'TS', 'FASTIFY', 'PRISMA', 'TAILWIND'],
    highlights: [
      'Lancement de DoggySafe sur iOS et Android',
      'Développement de MyCrochet (mobile + back-office)',
      'Mise en place de pipelines CI/CD et monitoring',
    ],
  },
  {
    slug: 'fullstack-junior',
    company: 'Studio Web',
    role: 'Développeur Full-Stack',
    period: '2021 — 2023',
    description:
      "Développement d'applications web sur mesure pour des PME. Stack JS/TS, Node, React, intégration d'APIs tierces.",
    techs: ['REACT', 'NEXTJS', 'TS', 'TAILWIND', 'FASTIFY', 'PRISMA'],
    highlights: [
      "Migration d'un monolithe legacy vers une stack moderne",
      'Mise en place de tests automatisés (e2e + unitaires)',
      "Encadrement d'un alternant sur 1 an",
    ],
  },
  {
    slug: 'alternance',
    company: 'Agence digitale',
    role: 'Développeur Web (Alternance)',
    period: '2019 — 2021',
    description:
      "Première expérience professionnelle en agence : intégration de maquettes, développement de fonctionnalités sur sites e-commerce et vitrines.",
    techs: ['REACT', 'JS', 'TAILWIND'],
    highlights: [
      'Intégration de plus de 15 sites vitrines responsives',
      'Création de modules WordPress sur mesure',
      "Participation aux refontes UI d'un site e-commerce",
    ],
  },
  {
    slug: 'projets-perso',
    company: 'Projets personnels',
    role: 'Développeur indépendant',
    period: 'En continu',
    description:
      "Développement régulier de projets pour apprendre, tester de nouvelles technologies et résoudre des problèmes du quotidien — voir le portail du Nether pour la liste.",
    techs: ['REACT', 'TS', 'NEXTJS', 'SOCKETIO', 'PRISMA'],
    highlights: [
      'Reproduction de jeux de société en multijoueur',
      "Exploration du temps réel (websockets, état partagé)",
      "Création d'outils internes pour mes projets",
    ],
  },
];

export function getExperience(slug: string): TExperience | undefined {
  return experiences.find((e) => e.slug === slug);
}
