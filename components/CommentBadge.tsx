import React from 'react';
import { ChatCircle } from 'phosphor-react';

interface CommentBadgeProps {
  count: number;
  status: 'warning' | 'pending' | 'neutral';
  onClick?: () => void;
  tooltip?: string;
}

export const CommentBadge: React.FC<CommentBadgeProps> = ({ count, status, onClick, tooltip }) => {
  if (count === 0) return null;

  const statusColors = {
    warning: 'bg-red-500/90 border-red-400',
    pending: 'bg-amber-500/90 border-amber-400',
    neutral: 'bg-blue-500/90 border-blue-400',
  };

  return (
    <div
      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full ${statusColors[status]} border-2 border-[#101820] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-20`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      title={tooltip}
    >
      <span className="text-[10px] font-bold text-white leading-none">{count}</span>
    </div>
  );
};
