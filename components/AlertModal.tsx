import React, { useEffect } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

// Clean Linear/Figma-style alert. Mała kolorowa ikona zamiast krzykliwego boxa, hairline border.
export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  buttonText = 'OK',
  onClose,
  type = 'info',
}) => {
  // ESC zamyka
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const typeStyles = {
    success: {
      iconColor: 'text-emerald-300 bg-emerald-500/15 ring-1 ring-emerald-500/25',
      path: 'M5 13l4 4L19 7',
    },
    error: {
      iconColor: 'text-red-300 bg-red-500/15 ring-1 ring-red-500/25',
      path: 'M6 18L18 6M6 6l12 12',
    },
    info: {
      iconColor: 'text-[#fee715] bg-[#fee715]/12 ring-1 ring-[#fee715]/25',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    warning: {
      iconColor: 'text-amber-300 bg-amber-500/15 ring-1 ring-amber-500/25',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#13151a] rounded-xl border border-white/[0.08] shadow-2xl max-w-md w-full p-5">
        <div className="flex items-start gap-3 mb-5">
          <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${styles.iconColor}`}>
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.path} />
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

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#fee715] text-[#0a0b0e] text-[13px] font-semibold rounded-md hover:brightness-110 transition-all shadow-sm shadow-[#fee715]/20"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
