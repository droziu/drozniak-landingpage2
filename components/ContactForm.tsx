'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  privacy: boolean;
  company_website: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  privacy?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    privacy: false,
    company_website: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(72, textareaRef.current.scrollHeight)}px`;
    }
  }, [formData.message]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Adres e-mail jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy adres e-mail';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Wiadomość musi mieć co najmniej 10 znaków';
    }

    if (!formData.privacy) {
      newErrors.privacy = 'Musisz zaakceptować przetwarzanie danych';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.company_website) {
      return; // Bot detected, silently ignore
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          company_website: formData.company_website, // honeypot
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Wystąpił błąd podczas wysyłania wiadomości');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        privacy: false,
        company_website: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#101820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-4">
          Dziękuję za wiadomość
        </h3>
        <p className="text-gray-300 mb-6">
          Zwykle odpisuję w ciągu 24 godzin. Jeśli wolisz, możesz od razu zarezerwować 20-min rozmowę.
        </p>
        <a
          href="https://calendly.com/drozniakstanislaw/spotkanie"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-[#fee715] text-[#fee715] hover:bg-[#fee715] hover:text-[#101820] font-medium py-2 px-6 rounded-lg transition-all duration-300"
        >
          Zarezerwuj rozmowę
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden */}
      <input
        type="text"
        name="company_website"
        value={formData.company_website}
        onChange={handleInputChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Row 1: Name | Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Imię i nazwisko*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 transition-all duration-300 ${
              errors.name ? 'border-red-500' : 'border-white/20 focus:border-[#fee715]'
            }`}
            placeholder="Twoje imię i nazwisko"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Adres e-mail*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 transition-all duration-300 ${
              errors.email ? 'border-red-500' : 'border-white/20 focus:border-[#fee715]'
            }`}
            placeholder="Adres e-mail do odpowiedzi"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone (optional, full width) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Telefon (opc.)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fee715] focus:ring-2 focus:ring-[#fee715]/50 transition-all duration-300"
          placeholder="Telefon (jeśli wolisz szybki kontakt)"
        />
      </div>

      {/* Row 3: Message (full width) */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Wiadomość*
        </label>
        <textarea
          ref={textareaRef}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 transition-all duration-300 resize-none min-h-[72px] max-h-[200px] overflow-y-auto ${
            errors.message ? 'border-red-500' : 'border-white/20 focus:border-[#fee715]'
          }`}
          placeholder="Napisz krótko, czego potrzebujesz: nowa strona www, system pozyskiwania klientów, szkolenie z AI w marketingu (cel, branża, przybliżony zakres)"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Row 4: Privacy (left) | Submit (right) */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            checked={formData.privacy}
            onChange={handleInputChange}
            className={`mt-1 w-4 h-4 rounded border focus:ring-2 focus:ring-[#fee715]/50 transition-all duration-300 ${
              errors.privacy ? 'border-red-500' : 'border-white/20 focus:border-[#fee715]'
            }`}
            aria-describedby={errors.privacy ? 'privacy-error' : undefined}
          />
          <label htmlFor="privacy" className="text-sm text-gray-300 leading-relaxed">
            Akceptuję przetwarzanie danych w celu odpowiedzi na wiadomość.
            <br />
            <a href="/polityka-prywatnosci" className="text-[#fee715] hover:text-white transition-colors">
              Polityka prywatności
            </a>
          </label>
        </div>
        {errors.privacy && (
          <p id="privacy-error" className="text-sm text-red-400 md:hidden" role="alert">
            {errors.privacy}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed md:flex-shrink-0"
        >
          {isLoading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </button>
      </div>

      {errors.privacy && (
        <p className="text-sm text-red-400 hidden md:block" role="alert">
          {errors.privacy}
        </p>
      )}
    </form>
  );
};
