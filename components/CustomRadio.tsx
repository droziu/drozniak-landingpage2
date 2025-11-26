import React from 'react';

interface CustomRadioProps {
  id: string;
  name: string;
  value: number;
  checked: boolean;
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300
        ${checked
          ? 'bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border-2 border-[#fee715] shadow-lg shadow-[#fee715]/20'
          : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:border-white/20'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <div className="relative flex items-center justify-center mr-4">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={() => !disabled && onChange(value)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${checked
              ? 'border-[#fee715] bg-gradient-to-r from-[#fee715] to-[#00C9A7]'
              : 'border-gray-400 bg-transparent'
            }
          `}
        >
          {checked && (
            <div className="w-2 h-2 rounded-full bg-[#101820]"></div>
          )}
        </div>
      </div>
      <span className={`text-gray-200 flex-1 ${checked ? 'font-semibold' : ''}`}>
        {label}
      </span>
    </label>
  );
};
