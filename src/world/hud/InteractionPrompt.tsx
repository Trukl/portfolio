import { AnimatePresence, motion } from 'framer-motion';
import { useWorldStore } from '../state/worldStore';
import type { TInteractionPayload } from '../data/interactions';
import { getExperience } from '../data/experiences';
import { projects } from '@/models/constants';

function labelFor(p: TInteractionPayload): string {
  switch (p.kind) {
    case 'house': {
      const exp = getExperience(p.experienceSlug);
      return exp ? `Entrer chez ${exp.company}` : 'Entrer';
    }
    case 'projectStand': {
      const proj = projects.find((pr) => pr.slug === p.projectSlug);
      return proj ? `Voir ${proj.title}` : 'Voir le projet';
    }
    case 'chest':
      return `Ouvrir — ${p.title}`;
    case 'sign':
      return 'Lire le panneau';
    case 'npc':
      return p.topic === 'about' ? 'Parler — À propos' : 'Parler — Contact';
    case 'portal':
      return p.destination === 'nether' ? 'Entrer dans le Nether' : 'Retourner au monde';
  }
}

export function InteractionPrompt() {
  const active = useWorldStore((s) => s.activeInteractable);
  const paused = useWorldStore((s) => s.paused);
  const show = !!active && !paused;
  return (
    <AnimatePresence>
      {show && active && (
        <motion.div
          key={active.kind + ('experienceSlug' in active ? active.experienceSlug : '') + ('projectSlug' in active ? active.projectSlug : '')}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="rounded-full border border-white/30 bg-black/55 px-5 py-2.5 text-white shadow-lg backdrop-blur-md">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/40 bg-white/15 text-xs font-bold">
              E
            </span>
            <span className="text-sm font-medium">{labelFor(active)}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
