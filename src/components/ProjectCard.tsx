import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { slugify } from '@/utils/functions/general.functions';
import Link from 'next/link';
import { TProject } from '@/models/types';

type TProjectCardProps = {
  project: TProject;
};

export default function ProjectCard({ project }: TProjectCardProps) {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <div className="flex items-center gap-1 justify-center">
          {project.icon ? (
            <Image
              src={project.icon}
              alt={`${project.title} logo`}
              width={40}
              height={40}
              className="rounded"
            />
          ) : (
            <div className="h-10" />
          )}
          <CardTitle className="text-xl font-signika flex items-center">
            {project.title}
            {project.wip && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                WIP
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-40 lg:h-48 mb-4 rounded-lg overflow-hidden">
          <Image src={project.image} alt={project.title} fill className="bg-white object-fill" />
        </div>
        <p className="text-foreground">{project.description}</p>
      </CardContent>
      <CardFooter>
        {!project.wip && (
          <Button variant="link" className="p-0 text-secondary-foreground" asChild>
            <Link href={`/projects/${slugify(project.title)}`}>En savoir plus →</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
