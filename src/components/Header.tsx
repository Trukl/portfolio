'use client';
// import { useState } from 'react';
// import { Moon, Sun } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Projets', href: '/projects' },
  // { name: 'À propos de moi', href: '/about' },
];

export default function Header() {
  // const [darkMode, setDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.toggle('dark');
  // };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="md:text-2xl font-bold text-xl font-signika">Corentin Minne</h1>
        <div className="flex gap-4 items-center">
          {NAVIGATION_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="group relative inline-block">
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full"></div>
              <span className="text-muted-foreground hover:text-foreground transition-colors relative">
                {link.name}
              </span>
            </Link>
          ))}
          {/* <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button> */}
        </div>
      </div>
    </header>
  );
}
