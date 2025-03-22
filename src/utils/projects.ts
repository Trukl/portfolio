import { projects } from '@/models/constants';
import { TProject } from '@/models/types';

export const getProjectBySlug = (slug: string): TProject | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getHighlightedProjects = (): TProject[] => {
  return projects.filter((project) => project.highlighted && !project.hidden);
};

export const getVisibleProjects = (): TProject[] => {
  return projects.filter((project) => !project.hidden);
};
