import { TProject, TTechnology } from './types';

export const TECHNOLOGIES: {
  [key in TTechnology]: {
    name: string;
    image: string;
  };
} = {
  REACT: {
    name: 'React',
    image: 'devicon:react',
  },
  NEXTJS: {
    name: 'Next.js',
    image: 'devicon:nextjs',
  },
  TAILWIND: {
    name: 'Tailwind',
    image: 'devicon:tailwindcss',
  },
  JS: {
    name: 'JavaScript',
    image: 'devicon:javascript',
  },
  TS: {
    name: 'TypeScript',
    image: 'devicon:typescript',
  },
  REACT_NATIVE: {
    name: 'React Native',
    image: 'devicon:reactnative-wordmark',
  },
  FASTIFY: {
    name: 'Fastify',
    image: 'devicon:fastify',
  },
  ZOD: {
    name: 'Zod',
    image: 'logos:zod',
  },
  EXPO: {
    name: 'Expo',
    image: 'logos:expo',
  },
  PRISMA: {
    name: 'Prisma',
    image: 'logos:prisma',
  },
};

export const PROJECTS: Array<TProject> = [
  {
    title: 'DoggySafe',
    description:
      "Application mobile à destination des propriétaires de chiens afin d'être alerté des potentiels dangers autour de moi.",
    why: /*html*/ `
    Ayant moi même <strong>2 chiens</strong>, j'ai appris que les chiens peuvent être exposés à des <strong>dangers</strong> que l'on ne connaît pas ou peu en tant qu'humains.<br />
    Par exemple, dans les étendus d'eau comme les lacs, rivières... il peut y avoir des bactéries appelées <strong>"cyanobactéries"</strong> qui sont extrêmement dangereuses, voire mortelles, pour les chiens.<br />
    Ne trouvant pas de solution adaptée, j'ai donc voulu créer une application qui permettrait aux propriétaires de chiens d'être alertés sur ce genre de dangers, de les localiser et également de les signaler.`,
    features: [
      'Connexion/Inscription',
      'Carte interactive pour localiser les dangers',
      "Signalement d'un danger en temps réel",
      "Localisation des vétérinaires en cas d'urgence",
    ],
    image: '/doggysafe.svg',
    icon: '/doggysafe-icon.svg',
    links: [
      {
        name: 'Voir le site',
        link: 'https://doggysafe.corentinminne.fr',
        iconName: 'Globe',
      },
      {
        name: 'Application (Android)',
        link: 'https://play.google.com/store/apps/details?id=com.doggysafe.app',
        iconName: 'GooglePlay',
      },
      {
        name: 'Application (iOS)',
        link: 'https://apps.apple.com/cm/app/doggysafe/id6738889872',
        iconName: 'AppStore',
      },
    ],
    techs: ['REACT_NATIVE', 'EXPO', 'TS', 'FASTIFY', 'ZOD', 'PRISMA'],
  },
  {
    title: 'SubTerra II',
    description:
      'Reproduction du jeu de société SubTerra II afin de pouvoir y jouer entre amis à distance.',
    why: '',
    features: [],
    image: '/subterra2.png',
    links: [],
    techs: ['REACT', 'NEXTJS', 'TAILWIND', 'TS'],
    wip: true,
  },
  {
    title: 'Shadow Hunters',
    description:
      'Reproduction du jeu de société Shadow Hunters afin de pouvoir y jouer entre amis à distance.',
    why: '',
    features: [],
    image: '/shadowhunters.png',
    links: [],
    techs: ['REACT', 'NEXTJS', 'TAILWIND', 'TS'],
    wip: true,
  },
];
