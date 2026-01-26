import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { useCourse } from '@/app/hooks/useCourse';

interface CourseCompletionScreenProps {
  onComplete: () => void;
}

export const CourseCompletionScreen: React.FC<CourseCompletionScreenProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { course } = useCourse();
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: user?.email || '',
    phone: '',
    completionDate: new Date().toISOString().split('T')[0],
    additionalQuestion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarStyle, setCalendarStyle] = useState<React.CSSProperties>({});
  
  // Zamknij kalendarz po kliknięciu poza nim
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

  // Utrzymuj kalendarz "przyklejony" do pola (bez uciekania przy scrollu)
  useEffect(() => {
    if (!isDatePickerOpen) return;

    const updatePosition = () => {
      const anchor = datePickerRef.current;
      const popover = calendarRef.current;
      if (!anchor || !popover) return;

      const anchorRect = anchor.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();

      const margin = 8;
      const minLeft = 12;
      const maxLeft = window.innerWidth - popRect.width - 12;

      // Domyślnie pod polem
      let top = anchorRect.bottom + margin;
      // Jeśli brakuje miejsca na dole, pokaż nad polem
      if (top + popRect.height > window.innerHeight - 12) {
        top = anchorRect.top - popRect.height - margin;
      }
      // Clamp do viewportu
      top = Math.max(12, Math.min(top, window.innerHeight - popRect.height - 12));

      let left = anchorRect.left;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setCalendarStyle({
        position: 'fixed',
        zIndex: 99999,
        top: `${top}px`,
        left: `${left}px`,
        width: '400px',
        maxWidth: '90vw'
      });
    };

    // Po pierwszym renderze popovera złap jego wymiary
    const raf = requestAnimationFrame(updatePosition);

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isDatePickerOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !course) return;

    setLoading(true);
    setError(null);

    try {
      // Walidacja
      if (!formData.fullName.trim()) {
        setError('Imię i nazwisko jest wymagane');
        setLoading(false);
        return;
      }
      if (!formData.companyName.trim()) {
        setError('Nazwa firmy jest wymagana');
        setLoading(false);
        return;
      }
      if (!formData.email.trim()) {
        setError('Adres e-mail jest wymagany');
        setLoading(false);
        return;
      }

      // Zapisz dane do bazy
      const { error: insertError } = await supabase
        .from('course_certificates')
        .upsert({
          user_id: user.id,
          course_id: course.id,
          full_name: formData.fullName.trim(),
          company_name: formData.companyName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null,
          completion_date: formData.completionDate,
          additional_question: formData.additionalQuestion.trim() || null,
          submitted_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        });

      if (insertError) {
        console.error('Błąd zapisywania danych certyfikatu:', insertError);
        setError('Wystąpił błąd podczas zapisywania danych. Spróbuj ponownie.');
        setLoading(false);
        return;
      }

      // Oznacz szkolenie jako zakończone w course_certificates
      const { error: updateError } = await supabase
        .from('course_certificates')
        .update({
          course_completed: true,
          course_completed_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('course_id', course.id);

      if (updateError) {
        console.error('Błąd oznaczania szkolenia jako zakończone:', updateError);
      }

      // Wyślij email przez Resend
      try {
        const emailResponse = await fetch('/api/course-completion-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            companyName: formData.companyName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            completionDate: formData.completionDate,
            additionalQuestion: formData.additionalQuestion.trim() || null,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Błąd wysyłania emaila:', await emailResponse.text());
          // Nie przerywamy procesu - dane są zapisane w bazie
        }
      } catch (emailError) {
        console.error('Błąd wysyłania emaila:', emailError);
        // Nie przerywamy procesu - dane są zapisane w bazie
      }

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err) {
      console.error('Błąd:', err);
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#101820] via-[#1a2332] to-[#101820] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-2xl p-1">
            <div className="bg-[#101820] rounded-xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold text-white mb-4">
                Dziękujemy!
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Twoje dane zostały przesłane. Zaświadczenie ukończenia szkolenia zostanie przygotowane i wysłane na podany adres e-mail.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101820] via-[#1a2332] to-[#101820] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full p-1">
              <div className="bg-[#101820] rounded-full p-4">
                <svg className="w-16 h-16 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="font-[Montserrat] text-4xl md:text-5xl font-bold text-white mb-4">
            Gratulacje!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Ukończyłeś szkolenie
          </p>
          <p className="text-2xl md:text-3xl font-bold text-[#fee715] mb-6">
            „Social Boost: Sztuka Marketingu Online i Pozyskiwania Klientów"
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Przeszedłeś przez wszystkie moduły szkolenia. Poniżej możesz przesłać dane do przygotowania imiennego zaświadczenia oraz – jeśli chcesz – zadać dodatkowe pytanie.
          </p>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sekcja: Dane do zaświadczenia */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8" style={{ overflow: 'visible' }}>
            <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
              Dane do zaświadczenia
            </h2>
            <p className="text-gray-400 text-sm mb-6">Pola wymagane, poza oznaczonymi jako „opcjonalne"</p>

            <div className="space-y-6">
              {/* Imię i nazwisko */}
              <div>
                <label htmlFor="fullName" className="block text-white font-semibold mb-2">
                  Imię i nazwisko <span className="text-red-400">*</span>
                </label>
                <p className="text-gray-400 text-sm mb-2">Tak, jak ma się pojawić na zaświadczeniu</p>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="np. Jan Kowalski"
                  required
                />
              </div>

              {/* Nazwa firmy */}
              <div>
                <label htmlFor="companyName" className="block text-white font-semibold mb-2">
                  Nazwa firmy <span className="text-red-400">*</span>
                </label>
                <p className="text-gray-400 text-sm mb-2">Np. „Hotel XYZ", „Firma Usługowa ABC"</p>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="np. Hotel XYZ"
                  required
                />
              </div>

              {/* Adres e-mail */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Adres e-mail do wysyłki zaświadczenia <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="twoj@email.pl"
                  required
                />
              </div>

              {/* Numer telefonu */}
              <div>
                <label htmlFor="phone" className="block text-white font-semibold mb-2">
                  Numer telefonu kontaktowego <span className="text-gray-400 text-sm font-normal">(opcjonalnie)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="+48 123 456 789"
                />
              </div>

              {/* Data ukończenia */}
              <div>
                <label htmlFor="completionDate" className="block text-white font-semibold mb-2">
                  Data ukończenia szkolenia
                </label>
                <p className="text-gray-400 text-sm mb-2">(może być automatycznie uzupełniona bieżącą datą)</p>
                
                {/* Custom Date Picker */}
                <div className="relative date-picker-container" ref={datePickerRef}>
                  {(() => {
                    const formatDateForDisplay = (dateStr: string) => {
                      if (!dateStr) return '';
                      const date = new Date(dateStr + 'T00:00:00');
                      return date.toLocaleDateString('pl-PL', {
                        day: 'numeric',
                        month: 'long',
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
                      const currentDate = formData.completionDate ? new Date(formData.completionDate + 'T00:00:00') : new Date();
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
                      setFormData({ ...formData, completionDate: dateStr });
                      setIsDatePickerOpen(false);
                    };

                    const navigateMonth = (direction: number) => {
                      const currentDate = formData.completionDate ? new Date(formData.completionDate + 'T00:00:00') : new Date();
                      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
                      setFormData({ ...formData, completionDate: formatDateForInput(newDate) });
                    };

                    const selectToday = () => {
                      handleDateSelect(new Date());
                    };

                    const clearDate = () => {
                      setFormData({ ...formData, completionDate: new Date().toISOString().split('T')[0] });
                      setIsDatePickerOpen(false);
                    };

                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                          className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-left flex items-center justify-between transition-all duration-300 ${
                            formData.completionDate
                              ? 'border-[#fee715]/50 hover:border-[#fee715]'
                              : 'border-white/10 hover:border-[#fee715]/50'
                          }`}
                        >
                          <span className={`text-lg ${formData.completionDate ? 'text-white' : 'text-gray-400'}`}>
                            {formData.completionDate ? formatDateForDisplay(formData.completionDate) : 'Kliknij, aby wybrać datę'}
                          </span>
                          <svg className={`w-6 h-6 transition-colors duration-300 ${formData.completionDate ? 'text-[#fee715]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>

                        {isDatePickerOpen && createPortal(
                          <div 
                            ref={calendarRef}
                            className="fixed bg-[#18232F] border-2 border-[#fee715]/30 rounded-xl shadow-2xl p-6"
                            style={Object.keys(calendarStyle).length ? calendarStyle : { zIndex: 99999 }}
                          >
                            {/* Header kalendarza */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                type="button"
                                onClick={() => navigateMonth(-1)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <h3 className="font-[Montserrat] font-bold text-white text-lg">
                                {monthNames[calendarData.month]} {calendarData.year}
                              </h3>
                              <button
                                type="button"
                                onClick={() => navigateMonth(1)}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>

                            {/* Dni tygodnia */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {dayNames.map((day, idx) => (
                                <div key={idx} className="text-center text-xs font-semibold text-gray-400 py-2">
                                  {day}
                                </div>
                              ))}
                            </div>

                            {/* Kalendarz */}
                            <div className="grid grid-cols-7 gap-1">
                              {calendarData.days.map((dayObj, idx) => {
                                const isSelected = formData.completionDate && formatDateForInput(dayObj.date) === formData.completionDate;
                                const isToday = formatDateForInput(dayObj.date) === formatDateForInput(new Date());

                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => dayObj.isCurrentMonth && handleDateSelect(dayObj.date)}
                                    disabled={!dayObj.isCurrentMonth}
                                    className={`aspect-square rounded-lg text-sm font-medium transition-all duration-200 ${
                                      !dayObj.isCurrentMonth
                                        ? 'text-gray-600 cursor-not-allowed'
                                        : isSelected
                                        ? 'bg-gradient-to-br from-[#fee715] to-[#00C9A7] text-[#101820] font-bold shadow-lg'
                                        : isToday
                                        ? 'bg-white/10 text-[#fee715] border-2 border-[#fee715]/50 hover:bg-white/20'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                                  >
                                    {dayObj.day}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Przyciski akcji */}
                            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                              <button
                                type="button"
                                onClick={clearDate}
                                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                              >
                                Wyczyść
                              </button>
                              <button
                                type="button"
                                onClick={selectToday}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#fee715]/30"
                              >
                                Dzisiaj
                              </button>
                            </div>
                          </div>,
                          document.body
                        )}
                      </>
                    );
                  })()}
                </div>
                {/* Ukryte pole dla formularza */}
                <input
                  type="hidden"
                  name="completionDate"
                  value={formData.completionDate}
                />
              </div>
            </div>
          </div>

          {/* Sekcja: Pytanie do prowadzącego */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
            <h2 className="font-[Montserrat] text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
              Pytanie do prowadzącego (opcjonalnie)
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Jeśli chcesz, możesz wpisać tutaj:
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm mb-6 space-y-1 ml-4">
              <li>pytanie dotyczące swoich działań marketingowych,</li>
              <li>prośbę o krótką rekomendację kolejnych kroków,</li>
              <li>temat, który chciałbyś poruszyć przy następnej rozmowie.</li>
            </ul>

            <div>
              <label htmlFor="additionalQuestion" className="block text-white font-semibold mb-2">
                Twoje pytanie / komentarz <span className="text-gray-400 text-sm font-normal">(opcjonalnie)</span>
              </label>
              <textarea
                id="additionalQuestion"
                value={formData.additionalQuestion}
                onChange={(e) => setFormData({ ...formData, additionalQuestion: e.target.value })}
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all resize-none"
                placeholder="Twoje pytanie / komentarz (opcjonalnie)"
              />
            </div>
          </div>

          {/* Błąd */}
          {error && (
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Informacja i przycisk */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8">
            <p className="text-gray-400 text-sm mb-6 text-center">
              Po wysłaniu formularza Twoje dane zostaną przesłane do prowadzącego. Na ich podstawie zostanie przygotowane imienne zaświadczenie ukończenia szkolenia.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Wysyłanie...</span>
                </>
              ) : (
                <span>Wyślij i zakończ szkolenie</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

