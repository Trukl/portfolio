import { Badge } from '@/components/ui/badge';
import { projects } from '@/models/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getExperience } from '../data/experiences';
import type {
  TChestInteraction,
  THouseInteraction,
  TInteractionPayload,
  TNpcInteraction,
  TPortalInteraction,
  TProjectStandInteraction,
  TSignInteraction,
} from '../data/interactions';
import { useWorldStore } from '../state/worldStore';

function payloadKey(p: TInteractionPayload): string {
  switch (p.kind) {
    case 'house':
      return `house-${p.experienceSlug}`;
    case 'projectStand':
      return `proj-${p.projectSlug}`;
    case 'chest':
      return `chest-${p.title}`;
    case 'sign':
      return `sign-${p.title}`;
    case 'npc':
      return `npc-${p.topic}`;
    case 'portal':
      return `portal-${p.destination}`;
  }
}

function HouseBubble({ payload }: { payload: THouseInteraction }) {
  const exp = getExperience(payload.experienceSlug);
  if (!exp) return <div>Expérience inconnue.</div>;
  return (
    <>
      <div className="mb-1 text-xs uppercase tracking-wider text-emerald-300">{exp.period}</div>
      <h3 className="text-base font-bold leading-tight">
        {exp.role}
        <span className="font-normal text-white/70"> @ {exp.company}</span>
      </h3>
      <p className="mt-1.5 text-sm text-white/85">{exp.description}</p>
      {exp.highlights.length > 0 && (
        <ul className="mt-2 space-y-0.5 text-sm text-white/75">
          {exp.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-emerald-300">›</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      {exp.techs.length > 0 && (
        <div className="mt-2 flex flex-wrap">
          {exp.techs.map((t) => (
            <Badge key={t} tech={t} className="!mb-1 !mr-1" />
          ))}
        </div>
      )}
    </>
  );
}

function ProjectBubble({ payload }: { payload: TProjectStandInteraction }) {
  const proj = projects.find((p) => p.slug === payload.projectSlug);
  if (!proj) return <div>Projet introuvable.</div>;
  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-base font-bold leading-tight">{proj.title}</h3>
        {proj.wip && (
          <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs font-semibold text-yellow-200">
            En cours
          </span>
        )}
      </div>
      <p className="text-sm text-white/85">{proj.description}</p>
      {proj.techs.length > 0 && (
        <div className="mt-2 flex flex-wrap">
          {proj.techs.map((t) => (
            <Badge key={t} tech={t} className="!mb-1 !mr-1" />
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          to={`/projets/${proj.slug}`}
          className="rounded-md bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25">
          Voir la fiche projet
        </Link>
        {proj.links.slice(0, 3).map((l) => (
          <Link
            key={l.name}
            to={l.link}
            target={l.link.startsWith('http') ? '_blank' : undefined}
            className="rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10">
            {l.name}
          </Link>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-white/50">Échap puis clic pour ouvrir un lien</p>
    </>
  );
}

function ChestBubble({ payload }: { payload: TChestInteraction }) {
  return (
    <>
      <h3 className="text-base font-bold">📦 {payload.title}</h3>
      <p className="text-sm text-white/75">Technos que j&apos;utilise dans cette catégorie :</p>
      <div className="mt-2 flex flex-wrap">
        {payload.techs.map((t) => (
          <Badge key={t} tech={t} className="!mb-1 !mr-1" />
        ))}
      </div>
    </>
  );
}

function SignBubble({ payload }: { payload: TSignInteraction }) {
  return (
    <>
      <h3 className="text-base font-bold">📝 {payload.title}</h3>
      <p className="mt-1 text-sm text-white/85">{payload.text}</p>
    </>
  );
}

function NpcBubble({ payload }: { payload: TNpcInteraction }) {
  if (payload.topic === 'about') {
    return (
      <>
        <h3 className="text-base font-bold">🧑 À propos</h3>
        <p className="mt-1 text-sm text-white/85">
          Salut ! Moi c&apos;est <strong>Corentin</strong>, développeur full-stack passionné par
          le web et le mobile. J&apos;aime construire des produits utiles, soigner l&apos;UX et
          explorer de nouvelles technos pour mes projets perso.
        </p>
        <p className="mt-1 text-sm text-white/75">
          Continue ta visite : entre dans les maisons, fouille les coffres et passe par le portail
          violet pour voir mes projets perso.
        </p>
      </>
    );
  }
  return (
    <>
      <h3 className="text-base font-bold">📬 Me contacter</h3>
      <p className="mt-1 text-sm text-white/85">N&apos;hésite pas, je réponds rapidement.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <Link
          to="mailto:contact@corentinminne.fr"
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500">
          <Mail size={14} /> Email
        </Link>
        <Link
          to="https://linkedin.com/in/corentin-minne"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10">
          <Linkedin size={14} /> LinkedIn
        </Link>
        <Link
          to="https://github.com/Trukl"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10">
          <Github size={14} /> GitHub
        </Link>
      </div>
      <p className="mt-2 text-[11px] text-white/50">Échap puis clic pour ouvrir un lien</p>
    </>
  );
}

function PortalBubble({ payload }: { payload: TPortalInteraction }) {
  return (
    <>
      <h3 className="text-base font-bold">
        {payload.destination === 'nether' ? '🔥 Portail du Nether' : '🌳 Portail de retour'}
      </h3>
      <p className="mt-1 text-sm text-white/85">
        {payload.destination === 'nether'
          ? 'Avance encore pour entrer dans mes projets perso.'
          : 'Avance encore pour revenir au village.'}
      </p>
    </>
  );
}

function BubbleContent({ payload }: { payload: TInteractionPayload }) {
  switch (payload.kind) {
    case 'house':
      return <HouseBubble payload={payload} />;
    case 'projectStand':
      return <ProjectBubble payload={payload} />;
    case 'chest':
      return <ChestBubble payload={payload} />;
    case 'sign':
      return <SignBubble payload={payload} />;
    case 'npc':
      return <NpcBubble payload={payload} />;
    case 'portal':
      return <PortalBubble payload={payload} />;
  }
}

export function ChatBubble() {
  const active = useWorldStore((s) => s.activeInteractable);
  const isTransitioning = useWorldStore((s) => s.isTransitioning);
  const showing = !!active && !isTransitioning;

  return (
    <AnimatePresence mode="wait">
      {showing && active && (
        <motion.div
          key={payloadKey(active)}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-20 w-[min(94vw,720px)] -translate-x-1/2">
          <div className="pointer-events-auto rounded-2xl border border-white/15 bg-black/65 px-5 py-4 text-white shadow-2xl backdrop-blur-md">
            <BubbleContent payload={active} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
