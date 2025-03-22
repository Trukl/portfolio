"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard, ProjectCardProps } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

type ProjectItem = Omit<ProjectCardProps, "className" | "imageClassName" | "contentClassName">;

export function ProjectShowcase({
  items,
  className,
}: {
  items: ProjectItem[];
  className?: string;
}) {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <div className={cn("relative max-w-5xl mx-auto", className)}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin.current]}
        className="w-full"
      >
        <CarouselContent className="py-8">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2"
            >
              <ProjectCard
                {...item}
                className="px-4"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 absolute bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm shadow-md" />
        <CarouselNext className="right-0 absolute bg-white/80 dark:bg-neutral-800/80 hover:bg-white dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm shadow-md" />
      </Carousel>
    </div>
  );
}