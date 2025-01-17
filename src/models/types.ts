import { icons } from 'lucide-react';

export type TTechnology =
  | 'REACT'
  | 'NEXTJS'
  | 'TAILWIND'
  | 'JS'
  | 'TS'
  | 'REACT_NATIVE'
  | 'FASTIFY'
  | 'ZOD'
  | 'EXPO'
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
  techs: TTechnology[];
  wip?: boolean;
  hidden?: boolean;
  highlighted?: boolean;
};
