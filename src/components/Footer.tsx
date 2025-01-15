import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Section from './Section';

export default function Footer() {
  return (
    <Section className="px-4 md:px-4 lg:px-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground mb-4 md:mb-0">
          © {new Date().getFullYear()} Corentin Minne. Tous droits réservés.
        </p>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:contact@corentinminne.fr">
              <Mail className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.linkedin.com/in/corentin-minne"
              target="_blank"
              rel="noopener noreferrer">
              <Linkedin className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/Trukl" target="_blank" rel="noopener noreferrer">
              <Github className="h-[1.2rem] w-[1.2rem]" />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
