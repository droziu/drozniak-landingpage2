'use client';

import React from 'react';
import {
  ArrowsClockwise,
  Briefcase,
  Browser,
  CalendarCheck,
  ChalkboardTeacher,
  Coins,
  Handshake,
  Medal,
  Phone,
  ListChecks,
  MagnifyingGlass,
  RocketLaunch,
  SlidersHorizontal,
  UsersThree,
  Camera,
  ChartLineUp,
  ChatCircleText,
  EnvelopeSimple,
  FilmSlate,
  Lightning,
  Megaphone,
  PencilSimpleLine,
  ShareNetwork,
  ShoppingBag,
  Tag,
  Target,
  FileText,
  ClipboardText,
  Sparkle,
  PuzzlePiece,
  ChatsCircle,
  EnvelopeSimpleOpen,
} from 'phosphor-react';

/**
 * Ikony obszarów pracy. phosphor-react korzysta z kontekstu Reacta,
 * więc ikony renderuje ten komponent kliencki, a strona przekazuje tylko nazwę.
 */
const ICONS = {
  ads: Megaphone,
  text: PencilSimpleLine,
  site: Browser,
  mail: EnvelopeSimple,
  inquiry: ChatCircleText,
  auto: Lightning,
  data: ChartLineUp,
  social: ShareNetwork,
  film: FilmSlate,
  photo: Camera,
  shop: ShoppingBag,
  offer: Tag,
  target: Target,
  search: MagnifyingGlass,
  plan: ListChecks,
  launch: RocketLaunch,
  repeat: ArrowsClockwise,
  people: UsersThree,
  work: Briefcase,
  teach: ChalkboardTeacher,
  money: Coins,
  calendar: CalendarCheck,
  sliders: SlidersHorizontal,
  deal: Handshake,
  medal: Medal,
  phone: Phone,
  doc: FileText,
  clipboard: ClipboardText,
  ai: Sparkle,
  custom: PuzzlePiece,
  talk: ChatsCircle,
  mailOpen: EnvelopeSimpleOpen,
} as const;

export type IconName = keyof typeof ICONS;

export const AreaIcon: React.FC<{ name: IconName; size?: number }> = ({ name, size = 24 }) => {
  const Icon = ICONS[name];
  return <Icon size={size} weight="regular" aria-hidden="true" />;
};

/** Obszary pracy w kolejności, w jakiej pokazują je pasy w hero */
export const AREAS: { icon: IconName; label: string }[] = [
  { icon: 'ads', label: 'Reklamy' },
  { icon: 'film', label: 'Kreacje i filmy' },
  { icon: 'text', label: 'Teksty i oferta' },
  { icon: 'site', label: 'Strona i landingi' },
  { icon: 'mail', label: 'Mailing' },
  { icon: 'inquiry', label: 'Obsługa zapytań' },
  { icon: 'auto', label: 'Automatyzacje' },
  { icon: 'data', label: 'Pomiar i analiza' },
  { icon: 'social', label: 'Media społecznościowe' },
];
