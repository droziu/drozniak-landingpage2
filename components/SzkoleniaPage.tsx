import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const SzkoleniaPage: React.FC = () => {
  useSEO({
    title: 'Szkolenia z AI w marketingu dla małych firm | Stanisław Drożniak',
    description: 'Szkolenia z AI w marketingu dla małych firm. AI w marketingu małej firmy - praktyczne zastosowania. Automatyzacja marketingu w małej firmie. Warsztaty i szkolenia projektowane na zamówienie.',
    keywords: 'szkolenia z AI w marketingu, AI w marketingu małej firmy, automatyzacja marketingu w małej firmie, szkolenia AI w marketingu, AI w marketingu dla małych firm',
    ogTitle: 'Szkolenia z AI w marketingu dla małych firm',
    ogDescription: 'Szkolenia z AI w marketingu dla małych firm. Praktyczne zastosowania AI i automatyzacji marketingu w małej firmie.',
  });

  // Reset scroll position to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const targetAudience = [
    'działów marketingu i komunikacji',
    'zespołów odpowiedzialnych za sprzedaż i obsługę klienta',
    'firm wdrażających automatyzacje i AI w procesach',
    'organizacji poszukujących efektywniejszego wykorzystania mediów społecznościowych',
    'przedsiębiorstw realizujących projekty szkoleniowe w ramach dofinansowań'
  ];

  const trainingTypes = [
    {
      title: 'Marketing i strategia digitalowa',
      description: 'Analiza procesów marketingowych, planowanie działań, nowoczesne podejście do pozyskiwania klientów.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Media społecznościowe w organizacji',
      description: 'Efektywne zarządzanie treściami, analityka, procesy wewnętrzne, komunikacja spójna z marką.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: 'AI w marketingu małej firmy – praktyczne zastosowania',
      description: 'Zastosowanie narzędzi AI w tworzeniu treści, automatyzacji zadań, analizie danych i pracy zespołów. <strong>AI w marketingu małej firmy</strong> - realne przykłady i wdrożenia.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Automatyzacja marketingu w małej firmie',
      description: 'Przykłady integracji i <strong>automatyzacji marketingu w małej firmie</strong>, tworzenie workflowów, dokumentacji i procedur wykorzystujących AI.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Warsztaty praktyczne dla zespołów',
      description: 'Zajęcia typu hands-on – praca na realnych przypadkach firmy, procedury krok po kroku.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Szkolenia projektowane na zamówienie',
      description: 'Program tworzony na podstawie celów organizacji, profilu działalności oraz poziomu zaawansowania uczestników.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Diagnoza potrzeb i celów szkoleniowych',
      description: 'Analiza procesów, struktury zespołu i oczekiwań biznesowych.'
    },
    {
      step: '2',
      title: 'Opracowanie programu szkolenia',
      description: 'Zakres, harmonogram, materiały i wymagania organizacyjne.'
    },
    {
      step: '3',
      title: 'Realizacja szkolenia (online lub stacjonarnie)',
      description: 'Praktyczne warsztaty prowadzone w formie dostosowanej do zespołu.'
    },
    {
      step: '4',
      title: 'Materiały i dokumentacja powykonawcza',
      description: 'Checklisty, instrukcje, procedury, systemy promptów, rekomendacje.'
    },
    {
      step: '5',
      title: 'Wsparcie po szkoleniu (30 dni)',
      description: 'Możliwość konsultacji dodatkowych pytań oraz oceny wdrożonych zmian.'
    }
  ];

  const benefits = [
    'usprawnienie pracy zespołów i skrócenie czasu realizacji zadań',
    'uporządkowanie komunikacji marketingowej',
    'wdrożenie realnych zastosowań AI w codziennych procesach',
    'poprawa jakości treści i spójności przekazu marki',
    'zwiększenie efektywności działań sprzedażowych i marketingowych'
  ];

  return (
    <main className="py-16 md:py-24 px-4 md:px-6 bg-[#101820]">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                Szkolenia z AI w marketingu
              </span>
              <br />
              <span className="text-white">dla małych firm</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              <strong>AI w marketingu małej firmy</strong> - praktyczne zastosowania i <strong>automatyzacja marketingu w małej firmie</strong>. Kompleksowe programy szkoleniowe dostosowane do potrzeb organizacji, zespołów marketingowych i działów sprzedaży. Możliwe również szkolenia indywidualne (1:1), projektowane pod konkretne wymagania i cele biznesowe.
            </p>
            <div className="flex justify-center">
              <Link
                to="/kontakt"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105"
              >
                <span>Poproś o ofertę</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Charakter i przeznaczenie szkoleń Section */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-6 text-center text-white">
              Charakter i przeznaczenie szkoleń
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 text-center leading-relaxed max-w-4xl mx-auto">
              Szkolenia zostały opracowane z myślą o organizacjach, które potrzebują usprawnić działania marketingowe, uporządkować procesy komunikacji, zmodernizować strategię digitalową lub skutecznie wdrożyć narzędzia AI w pracy zespołów.
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-8 font-medium">
              Materiały i zakres są każdorazowo dostosowywane do:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {targetAudience.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center text-[#fee715] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-[Montserrat] text-lg font-bold text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zakres tematyczny szkoleń Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Zakres tematyczny szkoleń
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingTypes.map((training, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00C9A7]/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center text-[#00C9A7] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {training.icon}
                </div>
                <h3 className="font-[Montserrat] text-lg font-bold text-white mb-2">
                  {training.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                  {training.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Przebieg współpracy szkoleniowej Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Przebieg współpracy szkoleniowej
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center text-[#fee715] font-bold text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <h3 className="font-[Montserrat] text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Szkolenia z dofinansowaniem Section */}
        <section className="mb-20 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-[Montserrat] text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  Szkolenia z dofinansowaniem
                </h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Szkolenia mogą być realizowane w ramach dofinansowań i programów rozwojowych.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Zapewniam przygotowanie zakresu szkolenia, dokumentacji oraz wsparcie w procesie zgłoszenia.
              </p>
            </div>
          </div>
        </section>

        {/* Efekty wdrożeń szkoleniowych Section */}
        <section className="mb-20 md:mb-24">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Efekty wdrożeń szkoleniowych
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[#00C9A7]/30 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 flex items-center justify-center text-[#00C9A7] flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="font-[Montserrat] text-2xl md:text-3xl font-bold mb-4 text-white">
              Chcesz zrealizować szkolenie dla swojego zespołu?
            </h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Przygotuję program dostosowany do potrzeb Twojej firmy.
            </p>
            <div className="flex justify-center">
              <Link
                to="/kontakt"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Poproś o ofertę</span>
                <svg 
                  className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
