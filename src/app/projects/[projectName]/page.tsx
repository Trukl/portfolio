import { slugify } from '@/utils/functions/general.functions';
import { PROJECTS, TECHNOLOGIES } from '@/models/constants';
import { redirect } from 'next/navigation';
import React from 'react';
import { Icon as IconifyIcon } from '@iconify/react';
import TooltipItem from '@/components/TooltipItem';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import { Card, CardContent } from '@/components/ui/card';
import Section from '@/components/Section';

export const generateStaticParams = () => {
  return PROJECTS.map((project) => ({ projectName: slugify(project.title) }));
};

type TProjectProps = {
  params: Promise<{
    projectName: string;
  }>;
};

export default async function Project({ params }: TProjectProps) {
  const { projectName } = await params;
  const project = PROJECTS.find((project) => slugify(project.title) === projectName);

  if (!project) {
    return redirect('/projects');
  }
  return (
    <Section className="flex flex-col gap-4 ">
      <div className="flex flex-row items-center gap-4">
        {project.icon && (
          <Image
            src={project.icon}
            alt={project.title}
            width={80}
            height={80}
            className="rounded"
          />
        )}
        <h1 className="text-4xl md:text-5xl font-bold font-signika">
          {project.title}
          {project.wip && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              WIP
            </span>
          )}
        </h1>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <section className="flex flex-col gap-4">
          <p className="text-muted-foreground text-md font-bold">{project.description}</p>
          <div>
            <h2 className="text-3xl font-bold mb-4">Motivation ?</h2>
            <Card className="backdrop-blur-sm">
              <CardContent
                className="p-6 max-w-none"
                dangerouslySetInnerHTML={{ __html: project.why }}
              />
            </Card>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Fonctionnalités principales</h2>
            <ul className="list-disc list-inside grid gap-2">
              {project.features.map((feature) => (
                <Card key={feature} className="backdrop-blur-sm">
                  <CardContent className="py-2 px-4 max-w-none flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-500" />
                    {feature}
                  </CardContent>
                </Card>
              ))}
            </ul>
          </div>
          {project.images && project.images.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Visuels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((screenshot) => (
                  <Card key={screenshot} className="backdrop-blur-sm mx-8 md:m-0 ">
                    <CardContent className="p-0 max-w-none">
                      <Image
                        src={screenshot}
                        alt={project.title}
                        width={900}
                        height={900}
                        className="rounded"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-4">Technologies</h2>
            <div className="flex gap-2 items-center flex-wrap">
              {project.techs.map((tech) => (
                <div key={tech} className="bg-card border rounded-md flex p-1">
                  <TooltipItem
                    trigger={
                      <IconifyIcon
                        icon={TECHNOLOGIES[tech].image}
                        height={40}
                        width={40}
                        className="text-white"
                        color="red"
                      />
                    }
                    content={TECHNOLOGIES[tech].name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Liens</h2>
            <div className="flex flex-row gap-2 sm:flex-row md:flex-col flex-wrap">
              {project.links.map((link, idx) => (
                <div key={link.name} className="flex gap-2 items-center">
                  <Button asChild variant={idx === 0 ? 'default' : 'outline'}>
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      <Icon name={link.iconName} />
                      {link.name}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Section>
  );
}
