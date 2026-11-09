'use client';

import React from 'react';
import {
  CalendarCheck,
  ChalkboardTeacher,
  ChatCircleText,
  ChatsCircle,
  ClipboardText,
  FileText,
  Lightning,
  ListChecks,
  Megaphone,
  PuzzlePiece,
  Sparkle,
} from 'phosphor-react';

/**
 * Ikony podstrony szkoleń. phosphor-react korzysta z kontekstu Reacta,
 * więc ikony renderuje ten komponent kliencki, a strona przekazuje tylko nazwę.
 */
const ICONS = {
  ads: Megaphone,
  inquiry: ChatCircleText,
  auto: Lightning,
  ai: Sparkle,
  custom: PuzzlePiece,
  talk: ChatsCircle,
  plan: ClipboardText,
  teach: ChalkboardTeacher,
  month: CalendarCheck,
  doc: FileText,
  check: ListChecks,
} as const;

export type SzIconName = keyof typeof ICONS;

export const SzIcon: React.FC<{ name: SzIconName; size?: number }> = ({ name, size = 28 }) => {
  const Icon = ICONS[name];
  return <Icon size={size} weight="regular" aria-hidden="true" />;
};
