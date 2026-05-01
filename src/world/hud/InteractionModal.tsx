import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ui/project-card';
import { projects } from '@/models/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExperience } from '../data/experiences';
import type {
  TChestInteraction,
  THouseInteraction,
  TInteractionPayload,
  TNpcInteraction,
  TProjectStandInteraction,
  TSignInteraction,
} from '../data/interactions';
import { useWorldStore } from '../state/worldStore';

function HouseModal({ payload }: { payload: THouseInteraction }) {
  const exp = getExperience(payload.experienceSlug);
  if (!exp) return <div>Expérience inconnue.</div>;
  return (
    <div>
      <div className="mb-1 text-xs uppercase tracking-wider text-indigo-500 dark:text-indigo-300">
        {exp.period}
      </div>
      <h2 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">{exp.role}</h2>
      <div className="mb-4 text-base font-medium text-neutral-700 dark:text-neutral-300">
        {exp.company}
      </div>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">{exp.description}</p>
      {exp.highlights.length > 0 && (
        <ul className="mb-4 list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
          {exp.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {exp.techs.length > 0 && (
        <div className="flex flex-wrap">
          {exp.techs.map((t) => (
            <Badge key={t} tech={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectStandModal({ payload }: { payload: TProjectStandInteraction }) {
  const proj = projects.find((p) => p.slug === payload.projectSlug);
  if (!proj) return <div>Projet introuvable.</div>;
  return (
    <div>
      <ProjectCard
        title={proj.title}
        description={proj.description}
        link={`/projets/${proj.slug}`}
        icon={proj.icon}
        image={proj.image}
        techs={proj.techs}
        wip={proj.wip}
      />
      {proj.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {proj.links.map((l) => (
            <Link
              key={l.name}
              to={l.link}
              target={l.link.startsWith('http') ? '_blank' : undefined}
              className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 shadow-sm transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ChestModal({ payload }: { payload: TChestInteraction }) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">{payload.title}</h2>
      <p className="mb-4 text-neutral-600 dark:text-neutral-300">
        Voici les technologies que j&apos;utilise au quotidien dans cette catégorie.
      </p>
      <div className="flex flex-wrap">
        {payload.techs.map((t) => (
          <Badge key={t} tech={t} />
        ))}
      </div>
    </div>
  );
}

function SignModal({ payload }: { payload: TSignInteraction }) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">{payload.title}</h2>
      <p className="text-neutral-700 dark:text-neutral-300">{payload.text}</p>
    </div>
  );
}

function NpcModal({ payload }: { payload: TNpcInteraction }) {
  if (payload.topic === 'about') {
    return (
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">À propos</h2>
        <p className="mb-3 text-neutral-700 dark:text-neutral-300">
          Salut ! Moi c&apos;est <strong>Corentin</strong>, développeur full-stack passionné par le
          web et le mobile. J&apos;aime construire des produits utiles, soigner l&apos;UX et
          explorer de nouvelles technos pour mes projets perso.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          Continue ta visite : entre dans les maisons pour découvrir mes expériences, fouille les
          coffres pour mes compétences, et passe par le portail violet pour voir mes projets perso.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-white">Me contacter</h2>
      <p className="mb-4 text-neutral-700 dark:text-neutral-300">
        N&apos;hésite pas à me contacter, je réponds rapidement.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to="mailto:contact@corentinminne.fr"
          className="inline-flex items-center gap-2 rounded-md bg-blue-900 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800">
          <Mail size={16} /> Email
        </Link>
        <Link
          to="https://linkedin.com/in/corentin-minne"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
          <Linkedin size={16} /> LinkedIn
        </Link>
        <Link
          to="https://github.com/Trukl"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
          <Github size={16} /> GitHub
        </Link>
      </div>
    </div>
  );
}

function InnerContent({ payload }: { payload: TInteractionPayload }) {
  switch (payload.kind) {
    case 'house':
      return <HouseModal payload={payload} />;
    case 'projectStand':
      return <ProjectStandModal payload={payload} />;
    case 'chest':
      return <ChestModal payload={payload} />;
    case 'sign':
      return <SignModal payload={payload} />;
    case 'npc':
      return <NpcModal payload={payload} />;
    case 'portal':
      return null; // portal triggers a transition, not a modal
  }
}

export function InteractionModal() {
  const modal = useWorldStore((s) => s.modal);
  const closeModal = useWorldStore((s) => s.closeModal);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.stopPropagation();
        closeModal();
      }
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [modal, closeModal]);

  return (
    <AnimatePresence>
      {modal && modal.kind !== 'portal' && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}>
          <motion.div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="absolute right-2 top-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              aria-label="Fermer">
              <X size={20} />
            </Button>
            <InnerContent payload={modal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
