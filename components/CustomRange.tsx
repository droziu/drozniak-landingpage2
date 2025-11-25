import React from 'react';

interface CustomRangeProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export const CustomRange: React.FC<CustomRangeProps> = ({
  value,
  onChange,
  min,
  max,
  label,
  leftLabel,
  rightLabel,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={className}>
      {label && (
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer custom-range"
          style={{
            background: `linear-gradient(to right, 
              #fee715 0%, 
              #fee715 ${percentage}%, 
              rgba(255, 255, 255, 0.1) ${percentage}%, 
              rgba(255, 255, 255, 0.1) 100%)`
          }}
        />
        <style>{`
          .custom-range::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #fee715, #00C9A7);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            border: 2px solid #101820;
          }
          .custom-range::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #fee715, #00C9A7);
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            border: 2px solid #101820;
          }
        `}</style>
      </div>
      <div className="flex justify-between items-center mt-3">
        {leftLabel && (
          <span className="text-sm text-gray-400">{leftLabel}</span>
        )}
        <span className="text-[#fee715] font-bold text-lg">{value}</span>
        {rightLabel && (
          <span className="text-sm text-gray-400">{rightLabel}</span>
        )}
      </div>
    </div>
  );
};

