import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ value, onChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarStyle, setCalendarStyle] = useState<React.CSSProperties>({});

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return 'dd.mm.rrrr';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCalendarDays = () => {
    const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      });
    }

    return { days, year, month };
  };

  const calendarData = getCalendarDays();
  const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const dayNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

  const handleDateSelect = (date: Date) => {
    const dateStr = formatDateForInput(date);
    onChange(dateStr);
    setIsDatePickerOpen(false);
  };

  const navigateMonth = (direction: number) => {
    const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
    onChange(formatDateForInput(newDate));
  };

  const selectToday = () => {
    handleDateSelect(new Date());
  };

  const clearDate = () => {
    onChange('');
    setIsDatePickerOpen(false);
  };

  // Pozycjonowanie kalendarza
  useEffect(() => {
    if (!isDatePickerOpen) return;

    const updatePosition = () => {
      const anchor = datePickerRef.current;
      const popover = calendarRef.current;
      if (!anchor || !popover) return;

      const anchorRect = anchor.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();

      const margin = 8;
      const padding = 12;
      const calendarWidth = 280; // Stała szerokość kalendarza

      let top = anchorRect.bottom + margin;
      if (top + popRect.height > window.innerHeight - padding) {
        top = anchorRect.top - popRect.height - margin;
      }
      top = Math.max(padding, Math.min(top, window.innerHeight - popRect.height - padding));

      // Pozycjonowanie poziome: wyrównaj lewą krawędź kalendarza do lewej krawędzi pola input
      let left = anchorRect.left;
      
      // Sprawdź czy kalendarz mieści się w viewport
      // Jeśli nie mieści się po prawej stronie, przesuń w lewo
      if (left + calendarWidth > window.innerWidth - padding) {
        left = window.innerWidth - calendarWidth - padding;
      }
      
      // Jeśli przesunięty w lewo, upewnij się że nie wychodzi poza lewą krawędź
      if (left < padding) {
        left = padding;
      }

      setCalendarStyle({
        position: 'fixed',
        zIndex: 99999,
        top: `${top}px`,
        left: `${left}px`,
        width: `${calendarWidth}px`,
      });
    };

    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isDatePickerOpen]);

  // Zamknij po kliknięciu poza
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isDatePickerOpen &&
        datePickerRef.current &&
        !datePickerRef.current.contains(target) &&
        calendarRef.current &&
        !calendarRef.current.contains(target)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setIsDatePickerOpen(false);
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerOpen]);

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        type="button"
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>
          {formatDateForDisplay(value)}
        </span>
        <svg className="w-4 h-4 text-white flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isDatePickerOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={calendarRef}
          className="fixed bg-[#18232F] border border-white/15 rounded-lg shadow-xl p-4"
          style={Object.keys(calendarStyle).length ? calendarStyle : { zIndex: 99999 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-white text-sm font-medium">
              {monthNames[calendarData.month]} {calendarData.year}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dni tygodnia */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-center text-[10px] text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Kalendarz */}
          <div className="grid grid-cols-7 gap-1">
            {calendarData.days.map((dayObj, idx) => {
              const isSelected = value && formatDateForInput(dayObj.date) === value;
              const isToday = formatDateForInput(dayObj.date) === formatDateForInput(new Date());

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => dayObj.isCurrentMonth && handleDateSelect(dayObj.date)}
                  disabled={!dayObj.isCurrentMonth}
                  className={`aspect-square rounded text-[11px] font-medium transition-all ${
                    !dayObj.isCurrentMonth
                      ? 'text-gray-600 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#fee715] text-[#101820] font-bold'
                      : isToday
                      ? 'bg-white/10 text-[#fee715] border border-[#fee715]/50'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Przyciski */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={clearDate}
              className="flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white text-[10px] transition-colors"
            >
              Wyczyść
            </button>
            <button
              type="button"
              onClick={selectToday}
              className="flex-1 px-2 py-1.5 bg-[#fee715] text-[#101820] rounded text-[10px] font-bold transition-colors hover:bg-[#fee715]/90"
            >
              Dzisiaj
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
