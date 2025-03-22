import { TProject } from './types';

export const projects: TProject[] = [
  {
    title: 'DoggySafe',
    description:
      "Application mobile à destination des propriétaires de chiens afin d'être alerté des potentiels dangers autour de moi.",
    why: /*html*/ `
    <div>
      <p>
        Ayant moi même <strong>2 chiens</strong>, j'ai appris que les chiens peuvent être exposés à des <strong>dangers</strong> que l'on ne connaît pas ou peu en tant qu'humains.
      </p>
      <p>
        Par exemple, dans les étendus d'eau comme les lacs, rivières... il peut y avoir des bactéries appelées <strong>"cyanobactéries"</strong> qui sont extrêmement dangereuses, voire mortelles, pour les chiens.
      </p>
      <p>
        Ne trouvant pas de solution adaptée, j'ai donc voulu créer une application qui permettrait aux propriétaires de chiens d'être alertés sur ce genre de dangers, de les localiser et également de les signaler.
      </p>
    </div>
    `,
    features: [
      'Connexion/Inscription',
      'Carte interactive pour localiser les dangers',
      "Signalement d'un danger en temps réel",
      "Localisation des vétérinaires en cas d'urgence",
    ],
    image: '/images/doggysafe.svg',
    icon: '/images/doggysafe-icon.svg',
    links: [
      {
        name: 'Voir le site',
        link: 'https://doggysafe.corentinminne.fr',
        iconName: 'ExternalLink',
      },
      {
        name: 'App Android',
        link: 'https://play.google.com/store/apps/details?id=com.doggysafe.app',
        iconName: 'GooglePlay',
      },
      {
        name: 'App iOS',
        link: 'https://apps.apple.com/cm/app/doggysafe/id6738889872',
        iconName: 'AppStore',
      },
    ],
    techs: ['REACT_NATIVE', 'EXPO', 'TS', 'FASTIFY', 'ZOD', 'PRISMA'],
    highlighted: true,
    slug: 'doggysafe',
  },
  {
    title: 'DisneyLand Waiting Times',
    description:
      "Un site web pour consulter en temps réel les temps d'attente des attractions à Disneyland Paris.",
    why: /*html*/ `
    <div>
      <p>
        J'ai réalisé ce projet suite à une idée de ma <strong>conjointe</strong>, qui trouvait qu'une application permettant de consulter plus simplement les <strong>temps d'attente</strong> des attractions, par rapport à l'application officielle, serait très pratique.
      </p>
      <p>
        Comme je souhaitais <strong>découvrir React</strong>, j'ai décidé de transformer cette idée en un <strong>premier projet personnel</strong>. Ce projet avait pour objectif de <strong>lui faire plaisir</strong> tout en me permettant d'<strong>apprendre les bases de React</strong>. Il s'agit d'un petit projet que j'ai réalisé <em>rapidement</em>, mais avec beaucoup d'enthousiasme.
      </p>
    </div>
    `,
    features: [
      'Récupération des données depuis une API',
      "Affichage des attractions en fonction de leur état/temps d'attente",
      "Différents filtres | Tous | Favoris | A-Z | Temps d'attente",
      'Liste de favoris',
    ],
    image: '/images/disneywaiting.png',
    icon: '/images/disneywaiting-icon.png',
    images: [
      '/images/projects/disneywaiting/tous.webp',
      '/images/projects/disneywaiting/favoris.webp',
      '/images/projects/disneywaiting/a-z.webp',
      '/images/projects/disneywaiting/temps.webp',
    ],
    links: [
      {
        name: 'Accéder au site',
        link: 'https://disney-times.netlify.app/',
        iconName: 'ExternalLink',
      },
      {
        name: 'Voir le code',
        link: 'https://github.com/Trukl/DisneyWaitingTimes',
        iconName: 'Github',
      },
    ],
    techs: ['REACT', 'JS'],
    highlighted: true,
    slug: 'disneywaiting',
  },
  {
    title: 'SubTerra II',
    description:
      'Reproduction du jeu de société SubTerra II afin de pouvoir y jouer entre amis à distance.',
    why: /*html*/ `
    <div>
      <p>
        J'ai créé ce projet avant tout pour pouvoir jouer à <strong>SubTerra II</strong> avec mes amis, sans avoir à organiser une soirée en physique. Comme certains habitent loin, il n'était pas toujours facile de se réunir. Avec cette version, on peut jouer ensemble plus facilement, peu importe où l'on se trouve.
      </p>
      <p>
        En plus de l'aspect pratique, ce projet représentait aussi un nouveau <strong>challenge</strong> pour moi. Reproduire un jeu de société complexe, avec la gestion des rôles et des mécaniques de jeu, était une belle opportunité pour apprendre et progresser en développement.
      </p>
    </div>
    `,
    features: ['Création de parties', 'Gestion des rôles', 'Gestion des règles du jeu'],
    image: '/images/subterra2.png',
    images: ['/images/projects/subterra/game.png'],
    links: [],
    techs: ['FASTIFY', 'PRISMA', 'SOCKETIO', 'REACT', 'TS', 'NEXTJS', 'TAILWIND'],
    wip: true,
    highlighted: true,
    slug: 'subterra2',
  },
  {
    title: 'Mon portfolio',
    description: 'Mon portfolio personnel présentant mes projets.',
    why: /*html*/ `
    <div>
      <p>
        J'ai créé ce portfolio pour présenter mes projets et mes compétences.
      </p>
    </div>
    `,
    features: ['Responsive', 'Animations', 'Dark mode', 'Animations'],
    image: '/images/portfolio.png',
    images: ['/images/projects/portfolio/home.webp', '/images/projects/portfolio/project.webp'],
    icon: '/images/photo.jpeg',
    links: [
      {
        name: 'Voir le code',
        link: 'https://github.com/Trukl/portfolio',
        iconName: 'Github',
      },
    ],
    techs: ['REACT', 'VITE', 'TAILWIND', 'TS'],
    slug: 'portfolio',
  },
  {
    title: 'Shadow Hunters',
    description:
      'Reproduction du jeu de société Shadow Hunters afin de pouvoir y jouer entre amis à distance.',
    why: '',
    features: [],
    image: '/images/shadowhunters.png',
    links: [],
    techs: ['REACT', 'NEXTJS', 'TAILWIND', 'TS'],
    wip: true,
    hidden: true,
    slug: 'shadowhunters',
  },
];
