import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { useSEO } from '../hooks/useSEO';

// Add custom styles for animation
const pathAnimationStyle = `
  @keyframes drawPath {
    from {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
    }
  }
  
  .animate-draw-path {
    animation: drawPath 3s ease-in-out forwards;
  }
`;

export const StronyWWWPage: React.FC = () => {
  useSEO({
    title: 'Strony internetowe dla małych firm i freelancerów | Stanisław Drożniak',
    description: 'Strony www dla małych firm i freelancerów. Strona internetowa dla trenera, dietetyka, zespołu muzycznego. Szybkie, nowoczesne strony projektowane pod pozyskiwanie klientów.',
    keywords: 'strony internetowe dla małych firm, strony www dla freelancerów, strona www dla trenera, strona internetowa dla dietetyka, strona www dla zespołu muzycznego, strony www dla małych firm',
    ogTitle: 'Strony internetowe dla małych firm i freelancerów',
    ogDescription: 'Strony www dla małych firm i freelancerów. Szybkie, nowoczesne strony projektowane pod pozyskiwanie klientów.',
  });

  const [expandedTech, setExpandedTech] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [activeStep, setActiveStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [firstView, setFirstView] = useState(0);
  const [content, setContent] = useState(0);
  const [stability, setStability] = useState(0);
  const [mySpeedWidth, setMySpeedWidth] = useState(0);
  const [templateSpeedWidth, setTemplateSpeedWidth] = useState(0);
  const [selectedBudget, setSelectedBudget] = useState<{ value: string; label: string }>({ value: '', label: '' });
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const budgetDropdownRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const firstViewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stabilityRef = useRef<HTMLDivElement>(null);
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  const testimonialsContentRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const industry = formData.get('industry') as string;
    const budget = selectedBudget.value;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !industry || !budget || !message) {
      alert('Proszę wypełnić wszystkie pola formularza.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Proszę podać prawidłowy adres e-mail.');
      return;
    }

    try {
      const response = await fetch('/api/strony-www', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          industry,
          budget,
          message,
        }),
      });

      // Check if response is ok and has content
      if (!response.ok) {
        // Try to parse error response, but handle empty responses
        let errorMessage = 'Wystąpił błąd podczas wysyłania formularza';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text) {
              const errorData = JSON.parse(text);
              errorMessage = errorData.error || errorMessage;
            }
          } else {
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
        } catch (parseError) {
          // If we can't parse the error, use default message
          console.error('Error parsing error response:', parseError);
          if (response.status === 404) {
            errorMessage = 'Endpoint API nie został znaleziony. Upewnij się, że używasz Vercel CLI do lokalnego developmentu (vercel dev) lub przetestuj na produkcji.';
          }
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      const text = await response.text();
      if (!text) {
        throw new Error('Otrzymano pustą odpowiedź z serwera.');
      }

      const result = JSON.parse(text);
      
      if (result.success) {
        setFormStatus('success');
        form.reset();
        setSelectedBudget({ value: '', label: '' });
        setTimeout(() => setFormStatus('idle'), 10000);
      } else {
        throw new Error('Formularz został wysłany, ale wystąpił nieoczekiwany błąd.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof SyntaxError && error.message.includes('JSON')) {
        alert('Błąd komunikacji z serwerem. Endpointy API działają tylko na Vercel. Użyj "vercel dev" do lokalnego testowania lub przetestuj na produkcji.');
      } else {
        alert(error instanceof Error ? error.message : 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
      }
    }
  };

  // Scroll detection for timeline progress
  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById('process');
      if (!timelineSection) return;

      const rect = timelineSection.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate progress through the timeline section
      const sectionStart = sectionTop - windowHeight * 0.5;
      const sectionEnd = sectionBottom - windowHeight * 0.5;
      const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (sectionEnd - sectionStart)));

      // Determine active step based on progress
      const totalSteps = 5;
      const stepProgress = progress * totalSteps;
      const currentStep = Math.floor(stepProgress);

      setActiveStep(Math.min(currentStep, totalSteps - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close budget dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target as Node)) {
        setIsBudgetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Counter animations for speed section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
              let start = 0;
              const increment = target / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                  setter(target);
                  clearInterval(timer);
                } else {
                  setter(Number(start.toFixed(2)));
                }
              }, 16);
            };

            // Animate counters
            animateCounter(setFirstView, 1.0, 1000);
            animateCounter(setContent, 1.5, 1200);
            animateCounter(setStability, 0.01, 800);

            // Animate chart bars
            setTimeout(() => setMySpeedWidth(30), 200); // ~1.5s out of 5s total
            setTimeout(() => setTemplateSpeedWidth(60), 700); // ~3s out of 5s total

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const speedSection = document.getElementById('speed-performance');
    if (speedSection) {
      observer.observe(speedSection);
    }

    return () => observer.disconnect();
  }, []);

  // Detect desktop/mobile for testimonials animation
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  // Endless scroll for mobile testimonials (manual scroll)
  useEffect(() => {
    const container = testimonialsContainerRef.current;
    const content = testimonialsContentRef.current;
    
    if (!container || !content) return;

    // Check if mobile on mount and resize
    const checkMobile = () => window.innerWidth < 768;
    if (!checkMobile()) return; // Only on mobile

    const handleScroll = () => {
      if (!checkMobile()) return; // Exit if resized to desktop
      
      const scrollTop = container.scrollTop;
      const scrollHeight = content.scrollHeight;
      const clientHeight = container.clientHeight;
      const midpoint = scrollHeight / 2;
      const threshold = 50; // Threshold for reset

      // Endless loop: when reaching near the end of first half, reset to beginning
      if (scrollTop >= midpoint - threshold) {
        // Reset to equivalent position in first half
        container.scrollTop = scrollTop - midpoint;
      } else if (scrollTop <= threshold) {
        // If scrolled near top, jump to equivalent position in second half for seamless upward scroll
        container.scrollTop = midpoint + scrollTop;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <style>{pathAnimationStyle}</style>
      {/* Hero Section - Sticky Left Column */}
      <section className="min-h-screen py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Column - Sticky on desktop */}
            <div className="md:sticky md:top-32 h-fit">
              <h1 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white">
                Strona www bez <span className="text-[#fee715]">kompromisów</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Projekt na zamówienie. Błyskawicznie szybkie w działaniu. Zaprojektowane pod cele Twojej firmy z uwzględnieniem strategii marketingowych. Tworzę <strong>strony www dla małych firm i freelancerów</strong>, które pomagają w <strong>pozyskiwaniu klientów</strong>.
              </p>

              {/* 3 Pills */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex-shrink-0 mt-1"></div>
                  <div>
                    <p className="text-white font-semibold mb-1">Strona szyta na miarę</p>
                    <p className="text-sm text-gray-400">Nie korzystam z szablonów</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex-shrink-0 mt-1"></div>
                  <div>
                    <p className="text-white font-semibold mb-1">Szybkie w działaniu</p>
                    <p className="text-sm text-gray-400">Tworzę strony w oparciu o nowoczesne technologie</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex-shrink-0 mt-1"></div>
                  <div>
                    <p className="text-white font-semibold mb-1">Prosta edycja po wdrożeniu</p>
                    <p className="text-sm text-gray-400">Przejrzysta instrukcja i dostęp</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a 
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#cta')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg text-center hover:shadow-xl hover:shadow-[#fee715]/20 transition-shadow duration-300"
                >
                  Umów rozmowę 20 min
                </a>
                <a 
                  href="#case"
                  className="border border-white/20 text-white font-medium py-4 px-8 rounded-lg text-center hover:bg-white/5 transition-colors duration-300"
                >
                  Zobacz realizacje →
                </a>
              </div>

              {/* Trust Line */}
              <p className="text-sm text-gray-500">
                Dla małych i średnich firm oraz freelancerów.
              </p>
            </div>

            {/* Right Column - Testimonials */}
            <div className="md:sticky md:top-32 h-fit">
              {/* Section title - above the testimonials */}
              <h3 className="text-white font-semibold text-lg mb-6">Co mówią osoby, z którymi współpracowałem</h3>
              
              <div className="relative">
              {/* Gradient fade-out overlays - extended */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#101820] via-[#101820]/90 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#101820] via-[#101820]/90 to-transparent z-10 pointer-events-none"></div>
              
                     {/* Testimonials - CSS transform animation on desktop, manual scroll on mobile */}
                     <div 
                       ref={testimonialsContainerRef}
                       className="relative md:overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:hidden"
                       style={{ 
                         maxHeight: 'calc(60vh - 1px)',
                         scrollbarWidth: 'none',
                         msOverflowStyle: 'none'
                       }}
                       onMouseEnter={() => {
                         if (window.innerWidth >= 768) {
                           setIsHovering(true);
                         }
                       }}
                       onMouseLeave={() => {
                         if (window.innerWidth >= 768) {
                           setIsHovering(false);
                         }
                       }}
                     >
                       <div 
                         ref={testimonialsContentRef}
                         className={`space-y-4 pr-4 testimonials-scroll-desktop ${isHovering ? 'paused' : ''}`}
                       >
                         {/* Testimonial 1 - Brent Peterson with photo */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <img 
                               src="/images/c1.jpg" 
                               alt="Brent Peterson" 
                               className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                               width="48"
                               height="48"
                               loading="eager"
                             />
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Brent Peterson</h4>
                               <p className="text-gray-400 text-xs mb-3">CEO, Wagento</p>
                               <p className="text-gray-300 text-sm leading-relaxed">„Świetna obsługa i błyskawiczny czas realizacji. Zdecydowanie polecam współpracę."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 2 - Russell Garner with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Russell Garner</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Stanisław trafił w dziesiątkę. Zrozumiał wizję, był zaangażowany i dowiózł efekt, który przerósł oczekiwania."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 3 - Kalen Jordan with photo */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <img 
                               src="/images/c2.jpg" 
                               alt="Kalen Jordan" 
                               className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                               width="48"
                               height="48"
                               loading="eager"
                             />
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Kalen Jordan</h4>
                               <p className="text-gray-400 text-xs mb-3">Co-Founder, Commerce Hero</p>
                               <p className="text-gray-300 text-sm leading-relaxed">„Stanislaw is awesome! Reliable and great work."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 4 - Michał Fus with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Michał Fus</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Szybka realizacja, dopracowany każdy detal, pełen profesjonalizm."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 6 - Kaja Lewandowska with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Kaja Lewandowska</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Efekt mnie zaskoczył. Z czystym sumieniem polecam współpracę."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 7 - Damian Lewandowski with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Damian Lewandowski</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Indywidualne podejście i pełen profesjonalizm."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 8 - Jarosław Babiuch with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Jarosław Babiuch</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Z niczego potrafi zrobić coś. Efekt końcowy – pozytywne zaskoczenie."</p>
                             </div>
                           </div>
                         </div>

                         {/* Duplicate for seamless loop */}
                         {/* Testimonial 1 - Brent Peterson with photo */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <img 
                               src="/images/c1.jpg" 
                               alt="Brent Peterson" 
                               className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                               width="48"
                               height="48"
                               loading="eager"
                             />
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Brent Peterson</h4>
                               <p className="text-gray-400 text-xs mb-3">CEO, Wagento</p>
                               <p className="text-gray-300 text-sm leading-relaxed">„Świetna obsługa i błyskawiczny czas realizacji. Zdecydowanie polecam współpracę."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 2 - Russell Garner with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Russell Garner</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Stanisław trafił w dziesiątkę. Zrozumiał wizję, był zaangażowany i dowiózł efekt, który przerósł oczekiwania."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 3 - Kalen Jordan with photo */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <img 
                               src="/images/c2.jpg" 
                               alt="Kalen Jordan" 
                               className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                               width="48"
                               height="48"
                               loading="eager"
                             />
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Kalen Jordan</h4>
                               <p className="text-gray-400 text-xs mb-3">Co-Founder, Commerce Hero</p>
                               <p className="text-gray-300 text-sm leading-relaxed">„Stanislaw is awesome! Reliable and great work."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 4 - Michał Fus with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Michał Fus</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Szybka realizacja, dopracowany każdy detal, pełen profesjonalizm."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 6 - Kaja Lewandowska with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Kaja Lewandowska</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Efekt mnie zaskoczył. Z czystym sumieniem polecam współpracę."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 7 - Damian Lewandowski with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Damian Lewandowski</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Indywidualne podejście i pełen profesjonalizm."</p>
                             </div>
                           </div>
                         </div>

                         {/* Testimonial 8 - Jarosław Babiuch with icon */}
                         <div className="bg-white/5 border border-white/10 rounded-xl p-6" style={{ willChange: 'auto' }}>
                           <div className="flex items-start space-x-4">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center flex-shrink-0">
                               <svg className="w-6 h-6 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                             </div>
                             <div className="flex-1">
                               <h4 className="text-white font-semibold text-sm">Jarosław Babiuch</h4>
                               <p className="text-gray-300 text-sm leading-relaxed">„Z niczego potrafi zrobić coś. Efekt końcowy – pozytywne zaskoczenie."</p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-white/5">
        <div className="container mx-auto text-center px-4">
          <p className="text-gray-500 uppercase tracking-widest text-xs md:text-sm mb-6">Pracowałem już z</p>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8 md:space-x-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex space-x-8 md:space-x-12 flex-shrink-0">
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Chess.com</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Wagento</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">eWay Corp</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">BigCommerce</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Tour & Holiday</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Commerce Hero</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Dietana</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Redlin</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">Talk Commerce</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                  <span className="text-gray-300 text-sm md:text-base whitespace-nowrap">PASW</span>
                  <span className="text-[#fee715] text-lg md:text-xl">&bull;</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case" className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white">
            Kilka wybranych projektów
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Case 1 - REDLIN */}
            <Link to="/portfolio-redlin" className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#fee715]/30 transition-all duration-300 block">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/images/redlin_mockup_thumbnail.jpg" 
                  alt="Strona www dla zespołu muzycznego REDLIN z systemem płatności i modułem biletów" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-white mb-2">Strona www dla zespołu muzycznego REDLIN</h3>
                <p className="text-sm text-gray-300">Kompletny, responsywny serwis koncertowy z wygodnym procesem kupowania biletów, płatnościami online i sekcjami zaprojektowanymi pod fanów. Przykład <strong>strony internetowej dla zespołu muzycznego</strong>.</p>
              </div>
            </Link>

            {/* Case 2 - Akademia Sztuk Walki */}
            <Link to="/portfolio-pasw" className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#fee715]/30 transition-all duration-300 block">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/images/pasw_mockup_thumbnail.jpg" 
                  alt="Strona internetowa dla szkoły sztuk walki - Pszczyńska Akademia Sztuk Walki" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-white mb-2">Strona internetowa dla szkoły sztuk walki</h3>
                <p className="text-sm text-gray-300">Ultraszybka, responsywna witryna z przejrzystą nawigacją, łatwym kontaktem i odświeżoną historią szkoły w formie osi czasu. Przykład <strong>strony www dla małej firmy</strong> z branży edukacyjnej.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits - Premium Redesign */}
      <section id="dlaczego-moje-strony" className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-radial from-[#101820] via-[#101820]/95 to-[#101820]"></div>
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" className="text-white"/>
          </svg>
        </div>
        
        {/* Fade-out overlays for smooth transitions */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#101820] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 color-morph-bottom z-20 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <header className="text-center mb-16">
            <h2 id="why-better-heading" className="text-3xl md:text-5xl font-bold font-[Montserrat] text-white mb-4">
              Co sprawia, że moje strony
              <br />
              <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent animate-gradient">
                działają lepiej
              </span>
            </h2>
          </header>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Card 1 - Target/Goal */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-1-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-1-title" className="card-title">
                  Strony projektowane jak narzędzia sprzedaży
                </h3>
                <p className="card-description">
                  Każdy projekt powstaje w oparciu o dane, psychologię decyzji i doświadczenie marketingowe. Wygląd to tylko część procesu - najważniejsze, by strona realizowała cele biznesowe.
                </p>
              </div>
            </article>

            {/* Card 2 - Lightning/Speed */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-2-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-2-title" className="card-title">
                  Nowoczesna technologia i błyskawiczne działanie
                </h3>
                <p className="card-description">
                  Buduję w frameworkach klasy premium (Next.js, Astro, Vercel). Dzięki temu strony ładują się w ok. 1 sekundę i działają stabilnie przez lata - bez wtyczek, lagów i zbędnych aktualizacji.
                </p>
              </div>
            </article>

            {/* Card 3 - User-minus/Simple */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-3-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-3-title" className="card-title">
                  Bez pośredników i zbędnych kosztów
                </h3>
                <p className="card-description">
                  Nie płacisz za agencję, zespół czy biuro. Pracuję sam, dlatego cały budżet inwestuję w jakość kodu, design i skuteczność strony.
                </p>
              </div>
            </article>

            {/* Card 4 - Ruler/Pen */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-4-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-4-title" className="card-title">
                  Strona uszyta na miarę Twojej marki
                </h3>
                <p className="card-description">
                  Nie korzystam z gotowych szablonów ani ograniczeń WordPressa. Każdy element powstaje od zera - dopasowany do Twojej branży, stylu i odbiorcy.
                </p>
              </div>
            </article>

            {/* Card 5 - Edit/Pen-square */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-5-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-5-title" className="card-title">
                  Samodzielna edycja treści po wdrożeniu
                </h3>
                <p className="card-description">
                  Po uruchomieniu otrzymujesz prosty system do zmian treści i krótkie wideo-instrukcje. Pełna kontrola - bez technicznych barier.
                </p>
              </div>
            </article>

            {/* Card 6 - Lifebuoy/Line-chart */}
            <article className="group card-premium" tabIndex={0} aria-labelledby="card-6-title">
              <div className="icon-wrapper">
                <svg className="w-6 h-6 text-[#fee715] transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="card-content">
                <h3 id="card-6-title" className="card-title">
                  Wsparcie i optymalizacja po starcie
                </h3>
                <p className="card-description">
                  Przez 60 dni pomagam dopracować stronę, analizuję wyniki i doradzam, jak zwiększyć konwersję oraz wykorzystać potencjał strony w marketingu.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Hero Transition Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f14] via-[#0d1217] to-[#101820]"></div>
        
        {/* Animated Content */}
        <div className="relative z-10 text-center px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white opacity-0 animate-fade-slide-up">
              Od pomysłu do gotowej strony.
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 opacity-0 animate-fade-slide-up-delay leading-relaxed">
              Zobacz, jak wygląda cały proces.
            </p>
          </div>
        </div>
        
        {/* Subtle bottom gradient transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#101820] to-transparent pointer-events-none"></div>
      </section>

      {/* Process - Timeline Section */}
      <section id="process" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold mb-20 text-center text-white">
            Krok po kroku
          </h2>
          
          {/* Timeline Container */}
          <div className="relative">
               {/* Timeline Line */}
               <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>

               {/* Progress Line */}
               <div
                 className="absolute left-4 md:left-8 top-0 w-0.5 bg-gradient-to-b from-[#fee715] via-[#00C9A7] to-transparent transition-all duration-1000"
                 style={{ height: `${Math.min(100, Math.max(0, (activeStep / 4) * 100))}%` }}
               ></div>

               {/* Fade-out overlay for the line */}
               <div className="absolute left-4 md:left-8 bottom-0 w-0.5 h-20 bg-gradient-to-t from-[#101820] to-transparent z-30"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {[
                {
                  title: "Krótka rozmowa lub wiadomość",
                  description: "Zaczynamy od prostego kontaktu - możesz napisać lub umówić krótką rozmowę.",
                  details: [
                    "Na podstawie kilku pytań oceniam, czego naprawdę potrzebujesz i czy mogę pomóc.",
                    "Ty mówisz, czego chcesz. Ja tłumaczę, jak możemy to osiągnąć."
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )
                },
                {
                  title: "Propozycja i plan projektu",
                  description: "W większości przypadków od razu mogę powiedzieć, jaki będzie koszt i jak wygląda cały proces.",
                  details: [
                    "Jeśli projekt jest bardziej rozbudowany lub nietypowy, w ciągu maksymalnie dwóch dni przygotowuję szczegółowy plan z zakresem, terminem i wyceną.",
                    "Wiesz dokładnie, co powstanie, ile to potrwa i za ile."
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                },
                {
                  title: "Projekt i treści",
                  description: "Po akceptacji przygotowuję projekt strony dopasowany do Twojej marki.",
                  details: [
                    "Tworzę strukturę, treści i UX tak, aby strona nie tylko wyglądała dobrze, ale przede wszystkim działała skutecznie.",
                    "Widzisz postępy i możesz wprowadzać swoje uwagi."
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  )
                },
                {
                  title: "Kodowanie i testy",
                  description: "Po zatwierdzeniu projektu wdrażam stronę w oparciu o nowoczesne technologie.",
                  details: [
                    "Testuję jej szybkość, SEO i poprawne działanie na wszystkich urządzeniach.",
                    "Masz pewność, że wszystko działa perfekcyjnie."
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                {
                  title: "Start i wsparcie po wdrożeniu",
                  description: "Publikujemy stronę. Otrzymujesz dostęp, krótką instrukcję i 60 dni wsparcia technicznego.",
                  details: [
                    "Na życzenie pomagam też w podstawowej analityce i marketingu.",
                    "Twoja strona działa, a Ty masz pełną kontrolę."
                  ],
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  ref={(el) => { if (el) stepRefs.current[index] = el; }}
                  className="relative flex items-start"
                >
                  {/* Timeline Point */}
                  <div className={`absolute left-4 md:left-8 w-8 h-8 rounded-full transform -translate-x-1/2 transition-all duration-1000 z-20 ${
                    activeStep >= index 
                      ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] shadow-lg shadow-[#fee715]/30 scale-110' 
                      : 'bg-gray-600'
                  }`}>
                    <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-1000 font-bold text-sm ${
                      activeStep >= index ? 'text-[#101820]' : 'text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-12 md:ml-16 w-full transition-all duration-1000 ${
                    activeStep >= index 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-50 transform translate-x-4'
                  }`}>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative hover:border-[#fee715]/30 transition-all duration-500">
                      {/* Card Arrow */}
                      <div className={`absolute left-0 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white/5 transform -translate-x-full transition-all duration-1000 ${
                        activeStep >= index ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                      
                      {/* Card Header with Icon */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg flex items-center justify-center">
                          <div className="text-[#fee715]">
                            {step.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-xl mb-2">{step.title}</h3>
                          <p className="text-gray-300">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-400 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="mt-20 text-center">
              <p className="text-gray-300 text-lg mb-6">
                Cały proces trwa zwykle 14–21 dni roboczych.<br />
                <span className="whitespace-nowrap">Jesteśmy w stałym kontakcie</span> - dokładnie wiesz, co dzieje się na każdym etapie.
              </p>
              <a 
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#cta')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="inline-block bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-shadow duration-300"
              >
                Zacznij tutaj
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Performance */}
      <section id="speed-performance" className="py-12 md:py-20 px-4 md:px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Column - Text and Microinteractions */}
            <div className="space-y-8">
              <div>
                <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
                  <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">Szybkość</span>, którą widać od razu.
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Im szybciej wyświetlisz kluczową treść, tym mniej osób rezygnuje. Projektuję strony tak, by pierwsze wrażenie było błyskawiczne i stabilne - nawet przy animacjach i zdjęciach w tle.
                </p>
              </div>

              {/* Three Pills */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/10 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7]"></div>
                  <div>
                    <p className="text-white font-semibold">Pierwszy widok ~1 s (PL/EU)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/10 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7]"></div>
                  <div>
                    <p className="text-white font-semibold">Kluczowa treść ~1,5 s</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:shadow-lg hover:shadow-[#fee715]/10 transition-all duration-300">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7]"></div>
                  <div>
                    <p className="text-white font-semibold">Stabilność układu: 0,00–0,05</p>
                  </div>
                </div>
              </div>

              {/* Explanatory Paragraph with Tooltip */}
              <div className="relative">
                <p className="text-gray-300 leading-relaxed">
                  Nie używam ciężkich <button 
                    className="text-[#fee715] hover:text-white transition-colors duration-200 relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip(!showTooltip)}
                  >
                    page-builderów
                  </button>. Kod i zasoby ładuję selektywnie, a kluczowe elementy mają pierwszeństwo.
                </p>
                
                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl z-50 max-w-xs">
                    <p className="text-sm text-gray-300">
                      Typowe przykłady: Wix, Elementor, WordPress z gotowymi motywami, Squarespace.
                    </p>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-l border-t border-gray-600 rotate-45"></div>
                  </div>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed">
                Jeśli projekt wymaga WordPressa - realizuję go lekko (motyw na zamówienie lub headless), bez spowalniających nakładek.
              </p>

              {/* Technical Details Toggle */}
              <div className="pt-4">
                <button
                  onClick={() => setExpandedTech(!expandedTech)}
                  className="text-[#fee715] hover:text-white transition-colors duration-200 text-lg"
                >
                  Chcesz szczegóły techniczne? →
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedTech ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      <strong>Priorytety:</strong> minimalna liczba skryptów, nowoczesne formaty obrazów, odroczone ładowanie elementów „poniżej zagięcia", brak nadmiarowych wtyczek.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <strong>Architektura:</strong> wykorzystuję SSG (Static Site Generation) i SSR (Server-Side Rendering), dzięki czemu kluczowe treści ładują się natychmiast - niezależnie od miejsca, urządzenia i przeglądarki.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visualizations */}
            <div className="space-y-8">
              {/* Performance Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#fee715] mb-2" ref={firstViewRef}>
                    {firstView}s
                  </div>
                  <p className="text-white font-semibold mb-1 whitespace-nowrap">Pierwszy widok</p>
                  <p className="text-sm text-gray-400">moment, gdy widać treść</p>
                </div>
                <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#fee715] mb-2" ref={contentRef}>
                    {content}s
                  </div>
                  <p className="text-white font-semibold mb-1 whitespace-nowrap">Kluczowa treść</p>
                  <p className="text-sm text-gray-400">pełny layout gotowy do użycia</p>
                </div>
                <div className="text-center p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-3xl md:text-4xl font-bold text-[#fee715] mb-2" ref={stabilityRef}>
                    {stability}
                  </div>
                  <p className="text-white font-semibold mb-1 whitespace-nowrap">Stabilność</p>
                  <p className="text-sm text-gray-400">brak przesunięć układu</p>
                </div>
              </div>

              {/* Speed Comparison Chart */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-6 text-center">Porównanie szybkości</h3>
                
                {/* My implementations */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Moje realizacje</span>
                    <span className="text-[#fee715] font-semibold">~1.5s</span>
                  </div>
                  <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${mySpeedWidth}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Technologia: nowoczesne frameworki webowe (m.in. Next.js, Vercel, TailwindCSS)</p>
                </div>


                {/* Template sites */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Gotowe kreatory stron</span>
                    <span className="text-gray-400 font-semibold">3-6s</span>
                  </div>
                  <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-full transition-all duration-2000 ease-out delay-500"
                      style={{ width: `${templateSpeedWidth}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">np. WordPress, Wix, Squarespace – oparte na wolniejszych, uniwersalnych motywach</p>
                </div>
              </div>

              {/* Lighthouse Screenshot */}
              <div className="hover:scale-[1.02] transition-transform duration-300">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/30 mb-6">
                  <img 
                    src="/images/pasw_speedtest.jpg" 
                    alt="Wyniki wydajności strony internetowej dla małej firmy - Lighthouse Performance Metrics" 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Text below the image */}
                <div className="text-center">
                  <p className="text-gray-500 text-xs mb-2">Źródło: lighthouse-metrics.com (Desktop)</p>
                  <p className="text-white text-base font-semibold leading-relaxed">
                    Indywidualny kod = błyskawiczne strony. Bez gotowych motywów.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation FAQ */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-[Montserrat] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Masz pytania? Ja też bym miał.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Oto kilka najczęściej zadawanych pytań.
            </p>
          </div>

          {/* Typing Animation */}
          <div className="text-center mb-12">
            <div className="typing-indicator">
              <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-[#fee715] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#00C9A7] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#fee715] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-2 font-medium">Ty pytasz, ja odpowiadam.</p>
            </div>
          </div>

          {/* Conversation */}
          <div className="space-y-6">
            {[
              {
                question: "Czy to strona na WordPressie?",
                answer: "Nie. Nie korzystam z WordPressa ani gotowych kreatorów. Tworzę strony w oparciu o nowoczesne frameworki webowe (takie jak Next.js czy Astro) i infrastrukturę Vercel. Dzięki temu kod jest lekki, stabilny i błyskawiczny, a strona ładuje się w około 1 sekundę - bez potrzeby ciągłych aktualizacji czy martwienia się o wtyczki. WordPress to dobry wybór dla blogów, ale jeśli chcesz stronę, która sprzedaje, działa szybko i nie wymaga opieki technicznej, potrzebujesz nowoczesnego rozwiązania."
              },
              {
                question: "Ile to kosztuje?",
                answer: "Prosty landing page zaczyna się od 1500 zł netto, a większość projektów mieści się w przedziale 3000 - 5000 zł. W tej cenie otrzymujesz stronę, która pracuje na Twoje wyniki - jest szybka, zoptymalizowana i zaprojektowana pod konwersję. Pracuję bez pośredników i zespołów projektowych - wszystko tworzę sam, od strategii po wdrożenie. Dzięki temu płacisz za jakość i skuteczność, nie za strukturę agencji i wewnętrzne koszty."
              },
              {
                question: "Czym Twoje strony różnią się od innych wykonawców?",
                answer: "Łączę marketing, design i technologię w jeden spójny proces. Nie buduję stron \"na oko\" - każda decyzja, od układu po kolor, wynika z wiedzy o zachowaniach użytkowników i zasadach konwersji. Mam za sobą lata doświadczenia w marketingu oraz certyfikaty m.in. z Adobe, Meta i University of California, dzięki czemu rozumiem, jak połączyć estetykę z psychologią decyzji. Dlatego moje strony nie tylko dobrze wyglądają - one po prostu działają skutecznie."
              },
              {
                question: "Czy będę mógł coś samodzielnie zmieniać?",
                answer: "Tak, otrzymasz prosty panel do edycji treści, zdjęć i nagłówków. Dodatkowo nagrywam krótką wideoinstrukcję, żebyś nie musiał zgadywać, co kliknąć. Nie zostawiam Cię z plikiem ZIP - zostawiam Ci stronę, którą faktycznie możesz obsłużyć."
              },
              {
                question: "Ile to trwa?",
                answer: "Zazwyczaj 2–4 tygodnie, w zależności od projektu i materiałów. Pracujemy etapami - najpierw strategia, potem projekt, potem wdrożenie. Wszystko widzisz i akceptujesz po drodze."
              },
              {
                question: "Co jeśli będę chciał coś poprawić po starcie?",
                answer: "W cenie masz poprawki, dopasowania i wsparcie po wdrożeniu. Nie kończę projektu w dniu publikacji - pomagam Ci ustawić wszystko tak, by strona działała w praktyce."
              }
            ].map((chat, index) => (
              <div key={index} className="conversation-block">
                {/* Client Question */}
                <div className="flex justify-start mb-4">
                  <div className="client-message">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">Klient</span>
                    </div>
                    <button 
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="client-bubble cursor-pointer hover:bg-white/10 transition-colors duration-300 w-full text-left"
                    >
                      <p className="text-gray-300 text-sm leading-relaxed">{chat.question}</p>
                      <div className="flex items-center justify-end mt-2">
                        <span className="text-xs text-gray-500">
                          {expandedFAQ === index ? 'Kliknij, aby ukryć odpowiedź' : 'Kliknij, aby zobaczyć odpowiedź'}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* My Answer - Hidden by default */}
                <div className={`flex justify-end mb-6 transition-all duration-500 ease-in-out ${
                  expandedFAQ === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  <div className="my-message">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-xs text-gray-400 font-medium mr-2">Ja</span>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#101820]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="my-bubble">
                      <p className="text-white text-sm leading-relaxed">{chat.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="cta" className="py-12 md:py-20 px-4 md:px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white">
            Wybierz preferowaną formę kontaktu
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 text-center">
              <h3 className="font-bold text-white mb-2">Umów rozmowę 20 min</h3>
              <p className="text-sm text-gray-300 mb-4">Krótko i konkretnie.</p>
              <a 
                href="https://calendly.com/drozniakstanislaw/spotkanie"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 px-6 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-shadow duration-300"
              >
                Umów rozmowę
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <h3 className="font-bold text-white mb-2">Napisz maila</h3>
              <p className="text-sm text-gray-300 mb-4">Odpowiadam tego samego dnia.</p>
              <a 
                href="mailto:stanislaw@drozniak.com"
                className="block border border-white/20 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                stanislaw@drozniak.com
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <h3 className="font-bold text-white mb-2">Zadzwoń</h3>
              <p className="text-sm text-gray-300 mb-4">Pon–Pt 10:00–16:00</p>
              <a 
                href="tel:+48792491196"
                className="block border border-white/20 text-white font-medium py-3 px-6 rounded-lg hover:bg-white/5 transition-colors duration-300"
              >
                +48 792 491 196
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="font-bold text-white text-xl mb-6 text-center">Wyślij krótkie zapytanie</h3>
            
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <p className="text-[#fee715] font-bold text-lg mb-2">Dziękuję za kontakt. Zazwyczaj odpowiadam w ciągu 24 godzin w dni robocze.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Imię i firma</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fee715] transition-colors"
                    placeholder="Jan Kowalski, Firma XYZ"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fee715] transition-colors"
                    placeholder="jan@firma.pl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Branża</label>
                  <input 
                    type="text"
                    name="industry"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fee715] transition-colors"
                    placeholder="np. usługi prawne, gastronomia, edukacja..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budżet</label>
                  <div className="relative" ref={budgetDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsBudgetDropdownOpen(!isBudgetDropdownOpen)}
                      className={`w-full bg-white/10 border rounded-lg px-4 py-3 text-left text-white focus:outline-none focus:border-[#fee715] transition-colors flex items-center justify-between ${
                        isBudgetDropdownOpen ? 'border-[#fee715]' : 'border-white/20'
                      }`}
                    >
                      <span className={selectedBudget.value ? 'text-white' : 'text-gray-400'}>
                        {selectedBudget.label || 'Wybierz budżet'}
                      </span>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isBudgetDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isBudgetDropdownOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-[#18232F] border border-white/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur-md">
                        <div className="py-2">
                          {[
                            { value: '', label: 'Wybierz budżet' },
                            { value: '1500-3000', label: '1500–3000 zł' },
                            { value: '3000-6000', label: '3000–6000 zł' },
                            { value: '6000-12000', label: '6000–12000 zł' },
                            { value: '12000+', label: '12000 zł+' }
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                if (option.value) {
                                  setSelectedBudget({ value: option.value, label: option.label });
                                }
                                setIsBudgetDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-white transition-all duration-200 flex items-center justify-between group ${
                                selectedBudget.value === option.value
                                  ? 'bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 border-l-2 border-[#fee715]'
                                  : option.value 
                                    ? 'hover:bg-white/10 hover:border-l-2 hover:border-white/20'
                                    : 'text-gray-400 cursor-default'
                              }`}
                              disabled={!option.value}
                            >
                              <span className={option.value ? 'text-white' : 'text-gray-400'}>{option.label}</span>
                              {selectedBudget.value === option.value && (
                                <div className="flex items-center">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] flex items-center justify-center">
                                    <svg className="w-3 h-3 text-[#101820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Hidden input for form submission */}
                    <input type="hidden" name="budget" value={selectedBudget.value} required={!selectedBudget.value} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cel strony</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#fee715] transition-colors resize-none"
                    placeholder="Co ma osiągnąć Twoja strona?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-shadow duration-300"
                >
                  Wyślij zapytanie
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Wysyłając zapytanie, akceptujesz przetwarzanie danych w celu kontaktu. 
                  <a href="/polityka-prywatnosci" className="text-[#fee715] hover:text-white ml-1">Polityka prywatności →</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
