import { motion } from 'framer-motion';
import { Github, Heart, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Trukl',
    icon: <Github size={20} />,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/corentin-minne',
    icon: <Linkedin size={20} />,
  },
  {
    name: 'Email',
    href: 'mailto:contact@corentinminne.fr',
    icon: <Mail size={20} />,
  },
];

export function Footer() {
  return (
    <motion.footer
      className="relative py-16 mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-transparent to-neutral-50/80 dark:from-transparent dark:to-neutral-900/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none">
          <path
            fill="currentColor"
            className="text-neutral-100 dark:text-neutral-800"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold font-heading mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Corentin Minne
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
              Développeur passionné par la création de solutions modernes et utiles.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-heading mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/projets"
                  className="text-neutral-600 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Projets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-heading mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center justify-center h-12 w-12 rounded-full bg-white/80 dark:bg-neutral-800/80 shadow-lg hover:shadow-xl text-neutral-600 dark:text-neutral-400 transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 backdrop-blur-sm"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {link.name}
                  </span>
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center justify-center space-x-1">
            <span>© {new Date().getFullYear()} Corentin Minne</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>Tous droits réservés</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
