import React, { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'warning' | 'danger' | 'info';
}

// Clean Linear/Figma-style confirm. ESC = cancel.
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Potwierdź',
  cancelText = 'Anuluj',
  onConfirm,
  onCancel,
  type = 'warning',
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const typeStyles = {
    warning: {
      iconColor: 'text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/25',
      confirmBg: 'bg-amber-500 hover:brightness-110 text-[#0a0b0e] font-semibold shadow-sm',
    },
    danger: {
      iconColor: 'text-red-300 bg-red-500/15 ring-1 ring-red-500/25',
      confirmBg: 'bg-red-500 hover:brightness-110 text-white shadow-sm',
    },
    info: {
      iconColor: 'text-[#fee715] bg-[#fee715]/12 ring-1 ring-[#fee715]/25',
      confirmBg: 'bg-[#fee715] hover:brightness-110 text-[#0a0b0e] shadow-sm',
    },
  };

  const styles = typeStyles[type];
  const iconPath = type === 'info'
    ? 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    : 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative bg-[#13151a] rounded-xl border border-white/[0.08] shadow-2xl max-w-md w-full p-5">
        <div className="flex items-start gap-3 mb-5">
          <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${styles.iconColor}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">
              {title}
            </h3>
            <p className="text-[13px] text-white/65 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] text-white/80 text-[13px] font-medium rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-3 py-1.5 text-[13px] font-semibold rounded-md transition-all ${styles.confirmBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
