import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  size?: 'default' | 'sm';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Wybierz opcję',
  className = '',
  size = 'default',
}) => {
  const isSm = size === 'sm';
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Oblicz pozycję dropdowna gdy jest otwarty (używamy fixed positioning, żeby był nad wszystkimi elementami)
  useEffect(() => {
    if (!isOpen || !buttonRef.current || !dropdownRef.current) return;

    const updatePosition = () => {
      const buttonRect = buttonRef.current?.getBoundingClientRect();
      const dropdownRect = dropdownRef.current?.getBoundingClientRect();
      if (!buttonRect || !dropdownRect) return;

      const margin = 8;
      const minLeft = 12;
      const maxLeft = window.innerWidth - dropdownRect.width - 12;

      // Domyślnie pod przyciskiem
      let top = buttonRect.bottom + margin;
      // Jeśli brakuje miejsca na dole, pokaż nad przyciskiem
      if (top + dropdownRect.height > window.innerHeight - 12) {
        top = buttonRect.top - dropdownRect.height - margin;
      }
      // Clamp do viewportu
      top = Math.max(12, Math.min(top, window.innerHeight - dropdownRect.height - 12));

      let left = buttonRect.left;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setDropdownStyle({
        position: 'fixed',
        zIndex: 99999,
        top: `${top}px`,
        left: `${left}px`,
        width: `${buttonRect.width}px`,
      });
    };

    // Po pierwszym renderze dropdowna złap jego wymiary
    const raf = requestAnimationFrame(updatePosition);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/[0.04] border text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 transition-all flex items-center justify-between ${
          isOpen ? 'border-[#fee715]/50' : 'border-white/10 hover:border-white/20'
        } ${isSm ? 'px-3 py-1.5 rounded text-sm' : 'px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#fee715]/50'}`}
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className={`bg-[#101820] border border-white/15 overflow-hidden ${isSm ? 'rounded shadow-lg' : 'rounded-lg shadow-xl'}`}
        >
          <div className="max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left transition-colors ${
                  value === option.value
                    ? 'bg-[#fee715]/10 text-[#fee715]'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                } ${isSm ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {value === option.value && (
                    <svg className={`text-[#fee715] flex-shrink-0 ${isSm ? 'w-4 h-4' : 'w-5 h-5'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

