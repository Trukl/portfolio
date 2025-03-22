import { cn } from '@/lib/utils';
import { TTechType } from '@/models/types';

const techColors: Record<TTechType, { bg: string; text: string }> = {
  REACT: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  REACT_NATIVE: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  NEXTJS: {
    bg: 'bg-black dark:bg-white/20',
    text: 'text-white dark:text-white',
  },
  TS: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  JS: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  TAILWIND: {
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
  },
  EXPO: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
  },
  FASTIFY: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
  },
  ZOD: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  PRISMA: {
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
  VITE: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
  },
  SOCKETIO: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
  },
};

const techLabels: Record<TTechType, string> = {
  REACT: 'React',
  REACT_NATIVE: 'React Native',
  NEXTJS: 'Next.js',
  TS: 'TypeScript',
  JS: 'JavaScript',
  TAILWIND: 'Tailwind CSS',
  EXPO: 'Expo',
  FASTIFY: 'Fastify',
  ZOD: 'Zod',
  PRISMA: 'Prisma',
  VITE: 'Vite',
  SOCKETIO: 'Socket.io',
};

export interface BadgeProps {
  tech: TTechType;
  className?: string;
}

export function Badge({ tech, className }: BadgeProps) {
  const colorClasses = techColors[tech];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mr-2 mb-2',
        colorClasses.bg,
        colorClasses.text,
        className
      )}>
      {techLabels[tech]}
    </span>
  );
}
