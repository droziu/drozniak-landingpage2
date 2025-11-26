import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  title,
  message,
  buttonText = 'OK',
  onClose,
  type = 'info',
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      border: 'border-green-500/50',
      bg: 'bg-green-500/10',
    },
    error: {
      icon: (
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      border: 'border-red-500/50',
      bg: 'bg-red-500/10',
    },
    info: {
      icon: (
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      border: 'border-blue-500/50',
      bg: 'bg-blue-500/10',
    },
    warning: {
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      border: 'border-yellow-500/50',
      bg: 'bg-yellow-500/10',
    },
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-gradient-to-br from-[#18232F] to-[#101820] rounded-2xl border-2 ${styles.border} shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all`}>
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/40"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

