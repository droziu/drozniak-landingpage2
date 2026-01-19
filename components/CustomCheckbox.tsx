import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  id?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  labelClassName?: string;
  size?: 'sm' | 'md';
  align?: 'start' | 'center';
  'aria-describedby'?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  id,
  name,
  disabled = false,
  error = false,
  className = '',
  labelClassName = 'text-gray-400',
  size = 'md',
  align = 'center',
  'aria-describedby': ariaDescribedBy,
}) => {
  const boxSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const checkSize = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer group ${align === 'start' ? 'items-start' : 'items-center'} gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          className="sr-only"
          aria-invalid={error}
          aria-describedby={ariaDescribedBy}
        />
        <div
          className={`${boxSize} rounded-[4px] border flex items-center justify-center transition-colors duration-200 ${
            error && !checked
              ? 'border-red-500/50 bg-red-500/5'
              : checked
                ? 'border-[#fee715]/50 bg-[#fee715]/12'
                : 'border-white/15 bg-white/[0.04]'
          } ${!disabled && !error && !checked ? 'group-hover:border-white/25' : ''}`}
        >
          {checked && (
            <svg className={`${checkSize} text-[#fee715] flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      {label != null && (
        <span className={`flex-1 ${labelClassName}`}>{label}</span>
      )}
    </label>
  );
};
