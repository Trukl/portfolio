import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { PROJECTS } from '@/models/constants';
import ProjectCard from './ProjectCard';
import Section from './Section';

export default function Projects() {
  return (
    <Section className="px-12 sm:px-12 lg:max-w-4xl flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center font-signika">Mes Projets</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <CarouselContent className="">
          {PROJECTS.map((project, index) => (
            <CarouselItem key={index} className="md:basis-1/2 py-2">
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  );
}
