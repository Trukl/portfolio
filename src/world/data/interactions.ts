import type { TTechType } from '@/models/types';

export type THouseInteraction = {
  kind: 'house';
  experienceSlug: string;
};

export type TProjectStandInteraction = {
  kind: 'projectStand';
  projectSlug: string;
};

export type TChestInteraction = {
  kind: 'chest';
  title: string;
  techs: TTechType[];
};

export type TSignInteraction = {
  kind: 'sign';
  title: string;
  text: string;
};

export type TNpcInteraction = {
  kind: 'npc';
  topic: 'about' | 'contact';
};

export type TPortalInteraction = {
  kind: 'portal';
  destination: 'overworld' | 'nether';
};

export type TInteractionPayload =
  | THouseInteraction
  | TProjectStandInteraction
  | TChestInteraction
  | TSignInteraction
  | TNpcInteraction
  | TPortalInteraction;
