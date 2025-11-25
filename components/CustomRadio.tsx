import React from 'react';

interface CustomRadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  name: string;
  value: string;
  className?: string;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
  checked,
  onChange,
  label,
  name,
  value,
  className = '',
}) => {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer group ${className}`}>
      <div className="relative">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border-2 rounded-full transition-all duration-300 flex items-center justify-center ${
            checked
              ? 'border-[#fee715]'
              : 'bg-white/5 border-white/20 group-hover:border-[#fee715]/50'
          }`}
        >
          {checked && (
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7]"></div>
          )}
        </div>
      </div>
      <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  );
};

