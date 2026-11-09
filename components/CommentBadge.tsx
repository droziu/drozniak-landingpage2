import React from 'react';

export type CommentBadgeStatus = 'warning' | 'pending' | 'neutral' | 'closed';

interface CommentBadgeProps {
  count: number;
  status: CommentBadgeStatus;
  onClick?: () => void;
  tooltip?: string;
}

// Status -> kolor tła (z pełnym kontrastem). Klient ma "od razu wiedzieć" co dany kolor znaczy.
const STATUS_BG: Record<CommentBadgeStatus, string> = {
  warning: 'bg-red-500 border-red-300',      // Otwarte - wymagana akcja
  pending: 'bg-amber-400 border-amber-200',  // Do akceptacji - decyzja klienta
  neutral: 'bg-blue-500 border-blue-300',    // W toku - praca trwa
  closed:  'bg-emerald-500 border-emerald-300', // Zatwierdzone/Zamknięte
};

// Tylko otwarte (wymagające akcji) komentarze pulsują - nie chcemy spamu animacjami.
const STATUS_PULSE: Record<CommentBadgeStatus, boolean> = {
  warning: true,
  pending: false,
  neutral: false,
  closed: false,
};

export const CommentBadge: React.FC<CommentBadgeProps> = ({ count, status, onClick, tooltip }) => {
  if (count === 0) return null;

  const bg = STATUS_BG[status] || STATUS_BG.neutral;
  const pulse = STATUS_PULSE[status] || false;

  return (
    <div
      className={`absolute -top-2.5 -right-2.5 min-w-[22px] h-[22px] px-1.5 rounded-full ${bg} border-2 border-[#13151a] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform z-20 shadow-lg ${pulse ? 'animate-pulse' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      title={tooltip || `${count} ${count === 1 ? 'komentarz' : count < 5 ? 'komentarze' : 'komentarzy'}`}
    >
      <span className="text-[11px] font-bold text-white leading-none">{count}</span>
    </div>
  );
};
