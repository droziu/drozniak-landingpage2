import React from 'react';

interface ConfirmLeaveModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmLeaveModal: React.FC<ConfirmLeaveModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#101820] border border-white/20 rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon - Warning */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white text-center mb-3">
          Uwaga! Niezapisany postęp
        </h3>

        {/* Message */}
        <p className="text-gray-300 text-center mb-6">
          Masz niezapisane dane w formularzu. Jeśli opuścisz tę stronę, Twój postęp zostanie utracony.
        </p>
        <p className="text-gray-400 text-sm text-center mb-6">
          Czy na pewno chcesz opuścić stronę?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Zostań na stronie
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
          >
            Opuść stronę
          </button>
        </div>
      </div>
    </div>
  );
};

