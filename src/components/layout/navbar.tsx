import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../theme-provider';

const navItems = [
  {
    path: '/',
    match: /^\/$/,
    name: 'Accueil',
  },
  {
    path: '/projets',
    match: /^\/projets(\/[^/]+)?$/,
    name: 'Projets',
  },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else if (window.scrollY < 2) {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        scrolled
          ? 'bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md shadow-lg shadow-neutral-200/20 dark:shadow-neutral-900/20'
          : 'bg-transparent',
        isOpen && 'backdrop-blur-none'
      )}>
      <div className={cn('container mx-auto transition-all duration-500 h-20', scrolled && 'h-16')}>
        <div className="flex h-full items-center justify-between px-4">
          <Link to="/" className="text-xl font-bold font-heading">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group">
              <span className="font-heading group relative text-foreground">
                Corentin
                <span className="font-heading absolute left-0 w-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                  Corentin
                </span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}>
                  <Link
                    to={item.path}
                    className={cn(
                      'text-sm font-medium transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 relative py-2 group',
                      location.pathname.match(item.match)
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-neutral-700 dark:text-neutral-300'
                    )}>
                    {item.name}
                    {location.pathname.match(item.match) && (
                      <motion.span
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                        layoutId="navbar-indicator"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600/20 dark:bg-indigo-400/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      initial={false}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 group"
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-label="Changer le thème">
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5 }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300"
              onClick={toggleTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              aria-label="Changer le thème">
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5 }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
            <motion.button
              className={cn(
                'text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300',
                isOpen && 'z-[60]'
              )}
              onClick={toggleMenu}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-neutral-950/95 h-[100dvh]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            {/* Menu content */}
            <div className="container mx-auto px-4 pt-20 flex-1">
              <ul className="flex flex-col space-y-4 py-8">
                {navItems.map((item) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}>
                    <Link
                      to={item.path}
                      className={cn(
                        'text-xl font-medium transition-all duration-300 block py-3 group relative',
                        location.pathname === item.path
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-neutral-700 dark:text-neutral-300'
                      )}
                      onClick={toggleMenu}>
                      <span className="relative z-10">{item.name}</span>
                      <motion.span
                        className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
