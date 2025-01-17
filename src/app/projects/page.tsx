import React from 'react';
import { PROJECTS } from '@/models/constants';
import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';

export default function Projects() {
  return (
    <Section className="xl:max-w-6xl grid gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
      {PROJECTS.filter((project) => !project.hidden).map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </Section>
  );
}
