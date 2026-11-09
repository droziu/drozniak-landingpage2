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
        className={`w-full bg-[#1a1d24] border text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/30 transition-colors flex items-center justify-between ${
          isOpen ? 'border-[#fee715]/40 ring-1 ring-[#fee715]/20' : 'border-white/[0.08] hover:border-white/[0.14]'
        } ${isSm ? 'px-2.5 py-1.5 rounded-md text-[12px]' : 'px-3 py-2 rounded-md text-[13px]'}`}
      >
        <span className={selectedOption ? 'text-white truncate' : 'text-white/35 truncate'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`text-white/40 transition-transform duration-150 shrink-0 ${isOpen ? 'rotate-180' : ''} ${isSm ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
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
          className="bg-[#13151a] border border-white/[0.08] overflow-hidden rounded-md shadow-2xl shadow-black/50"
        >
          <div className="max-h-56 overflow-y-auto py-0.5">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left transition-colors ${
                  value === option.value
                    ? 'bg-[#fee715]/10 text-[#fee715]'
                    : 'text-white/75 hover:bg-white/[0.05] hover:text-white'
                } ${isSm ? 'px-2.5 py-1.5 text-[12px]' : 'px-3 py-1.5 text-[13px]'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">{option.label}</span>
                  {value === option.value && (
                    <svg className="text-[#fee715] flex-shrink-0 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

