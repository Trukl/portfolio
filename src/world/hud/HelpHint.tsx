import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HelpHint() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 9000);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="rounded-lg border border-white/20 bg-black/55 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-md">
            <span className="font-semibold">Clique pour activer la souris.</span>
            <span className="mx-2 opacity-70">·</span>
            <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-xs">ZQSD</kbd>
            <span className="mx-1">se déplacer</span>
            <span className="mx-1 opacity-70">·</span>
            <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-xs">Espace</kbd>
            <span className="mx-1">sauter</span>
            <span className="mx-1 opacity-70">·</span>
            <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-xs">E</kbd>
            <span className="mx-1">interagir</span>
            <span className="mx-1 opacity-70">·</span>
            <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-xs">Échap</kbd>
            <span className="mx-1">libérer la souris</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
