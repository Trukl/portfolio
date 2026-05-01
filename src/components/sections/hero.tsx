import { motion } from 'framer-motion';
import { Gamepad2, Mail as MailIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Badge component
function Badge({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="leading-tight inline-flex items-center gap-1 px-2 py-1 mx-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
      <span className="text-base">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative pt-10 mb-5 md:mb-10 md:pt-20">
      <div className="container max-w-6xl m-auto relative z-10 px-4 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-8 relative border-4 border-white shadow-lg dark:border-neutral-800">
          <img src="/images/photo.jpeg" alt="Corentin" className="object-cover" />
        </div>

        <motion.h1
          className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          Hey, moi c&apos;est Corentin
          <motion.span
            className="text-black dark:text-white animate-wave text-4xl md:text-5xl lg:text-6xl ml-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            👋
          </motion.span>
        </motion.h1>

        <motion.div
          className="text-center items-center justify-center gap-2 mb-8 max-w-3xl text-lg leading-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          Je suis développeur
          <Badge label="FullStack" icon="</>" />
          passionné par le développement
          <Badge label="Web" icon="🖥️" />
          et
          <Badge label="Mobile" icon="📱" />
          toujours à la recherche de nouveaux
          <Badge label="Challenges" icon="🚀" />.
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <Link
            to="mailto:contact@corentinminne.fr"
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <MailIcon size={20} />
            <span>Me contacter</span>
          </Link>
          <Link
            to="https://linkedin.com/in/corentin-minne"
            target="_blank"
            className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <span>LinkedIn</span>
          </Link>
          <Link
            to="https://github.com/Trukl"
            target="_blank"
            className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <span>Github</span>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}>
          <Link
            to="/monde"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border-2 border-emerald-700 bg-emerald-600 px-8 py-4 text-white shadow-[0_4px_0_0_rgb(6,78,59)] transition-all hover:bg-emerald-500 hover:shadow-[0_2px_0_0_rgb(6,78,59)] hover:translate-y-0.5 active:translate-y-1 active:shadow-none dark:border-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600">
            <Gamepad2 size={22} />
            <span className="text-lg font-bold tracking-wide">Entrer dans le monde</span>
            <span className="ml-1 rounded bg-emerald-900/40 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Bêta
            </span>
          </Link>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Visite mon portfolio façon Minecraft 🎮 (clavier + souris recommandés)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
