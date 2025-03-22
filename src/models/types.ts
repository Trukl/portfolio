import { icons } from 'lucide-react';

export type TTechType =
  | 'REACT'
  | 'REACT_NATIVE'
  | 'NEXTJS'
  | 'VITE'
  | 'TS'
  | 'JS'
  | 'TAILWIND'
  | 'EXPO'
  | 'FASTIFY'
  | 'ZOD'
  | 'PRISMA';

export type TCustomIconName = 'AppStore' | 'GooglePlay';

export type TIconName = keyof typeof icons | TCustomIconName;

export type TLink = {
  name: string;
  link: string;
  iconName: TIconName;
};

export type TProject = {
  title: string;
  description: string;
  why: string;
  features: string[];
  image: string;
  icon?: string;
  images?: string[];
  links: TLink[];
  techs: TTechType[];
  highlighted?: boolean;
  wip?: boolean;
  hidden?: boolean;
  slug?: string;
};
