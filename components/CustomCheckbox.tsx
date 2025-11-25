import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded transition-all duration-300 flex items-center justify-center ${
            checked
              ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] border-transparent'
              : 'bg-white/5 border-white/20 group-hover:border-[#fee715]/50'
          }`}
        >
          {checked && (
            <svg className="w-3 h-3 text-[#101820] font-bold" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  );
};

