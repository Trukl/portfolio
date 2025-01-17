import { Mail, Linkedin, Github, TabletSmartphone, Monitor, Code2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Section from '@/components/Section';
import Code from './Code';

export default function Hero() {
  return (
    <Section className="flex flex-col gap-2 lg:gap-4 md:text-left">
      {/* className="mb-16 text-center max-w-[900px] md:mx-auto"> */}
      <div className="relative w-32 h-32 mb-2 mx-auto">
        <Image
          src="/photo.jpeg"
          alt="Corentin Minne"
          fill
          className="rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold font-signika">Hey, moi c'est Corentin 👋</h1>
      <p className="text-lg text-muted-foreground leading-9 ">
        Je suis développeur
        <Code>
          <Code2Icon className="inline mb-0.5 mr-1" />
          FullStack
        </Code>
        passionné par le développement
        <Code>
          <Monitor className="inline mb-0.5 mr-1" />
          Web
        </Code>
        et
        <Code>
          <TabletSmartphone className="inline mb-0.5 mr-1" />
          Mobile
        </Code>
        , toujours à la recherche de nouveaux<Code>🚀 Challenges</Code>.
      </p>
      <div className="flex flex-row gap-4 flex-wrap md:justify-start">
        <Button asChild>
          <a href="mailto:contact@corentinminne.fr">
            <Mail className="h-[1.2rem] w-[1.2rem]" /> Me contacter
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://www.linkedin.com/in/corentin-minne"
            target="_blank"
            rel="noopener noreferrer">
            <Linkedin className="h-[1.2rem] w-[1.2rem]" /> Linkedin
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/Trukl" target="_blank" rel="noopener noreferrer">
            <Github className="h-[1.2rem] w-[1.2rem]" /> Github
          </a>
        </Button>
      </div>
    </Section>
  );
}
