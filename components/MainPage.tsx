import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
  return (
    <main className="bg-[#101820] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-8 py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Centered Eyebrow */}
          <div className="text-center mb-16">
            <p className="text-[#fee715] text-sm font-medium tracking-wide uppercase">
              Marketing • strony www • sztuczna inteligencja • szkolenia
            </p>
          </div>
          
          {/* Row 1: Typography + Visual - Similar Sizes */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
            {/* Left - Typography */}
            <div className="space-y-8">
              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Montserrat] leading-tight">
                Tworzę <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">systemy</span>, które sprzedają
                <br />
                i <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">strony</span>, które naprawdę działają.
              </h1>
              
              {/* Lead */}
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                Łączę strategię marketingową, nowoczesny design i technologie webowe.
              </p>
            </div>
            
            {/* Right - Visual - Similar Scale */}
            <div className="relative hidden md:block">
              {/* Background Halo/Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fee715]/25 via-transparent to-[#00C9A7]/25 rounded-3xl blur-3xl scale-110"></div>
              
              {/* Main Visual Container */}
              <div className="relative transform translate-y-2">
                <div className="bg-gradient-to-br from-[#fee715]/15 to-[#00C9A7]/15 rounded-3xl p-10 lg:p-12 backdrop-blur-sm border border-white/20 shadow-2xl ring-1 ring-white/10">
                  <div className="space-y-6">
                    {/* Browser Header */}
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div className="flex-1 h-6 bg-white/10 rounded ml-4"></div>
                    </div>
                    
                    {/* Content Lines */}
                    <div className="space-y-4">
                      <div className="h-5 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full w-4/5"></div>
                      <div className="h-4 bg-white/25 rounded-full w-3/5"></div>
                      <div className="h-4 bg-white/20 rounded-full w-full"></div>
                      <div className="h-4 bg-white/15 rounded-full w-2/3"></div>
                    </div>
                    
                    {/* Grid Layout */}
                    <div className="grid grid-cols-3 gap-4 pt-6">
                      <div className="h-20 bg-gradient-to-br from-[#fee715]/30 to-[#00C9A7]/30 rounded-xl border border-white/20"></div>
                      <div className="h-20 bg-gradient-to-br from-[#00C9A7]/20 to-[#fee715]/20 rounded-xl border border-white/15"></div>
                      <div className="h-20 bg-gradient-to-br from-[#fee715]/25 to-[#00C9A7]/25 rounded-xl border border-white/20"></div>
                    </div>
                    
                    {/* Code-like Elements */}
                    <div className="space-y-3 pt-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-[#fee715] rounded-full"></div>
                        <div className="h-3 bg-white/20 rounded w-1/4"></div>
                        <div className="h-3 bg-white/15 rounded w-1/6"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-[#00C9A7] rounded-full"></div>
                        <div className="h-3 bg-white/20 rounded w-1/3"></div>
                        <div className="h-3 bg-white/15 rounded w-1/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Row 2: Centered CTAs */}
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/strony-www"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-all duration-300"
              >
                Zobacz strony WWW
              </Link>
              <Link
                to="/system"
                className="inline-flex items-center justify-center border-2 border-[#fee715] text-[#fee715] hover:bg-[#fee715] hover:text-[#101820] font-bold py-4 px-8 rounded-lg transition-all duration-300"
              >
                Zobacz system sprzedażowy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Montserrat] bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent leading-tight pb-2">
                Kim jestem i jak pracuję
              </h2>
              
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                <p>
                  Jestem specjalistą od marketingu i technologii. Od lat pomagam firmom uporządkować procesy sprzedażowe i komunikację online.
                </p>
                <p>
                  Zajmuję się <span className="font-bold text-[#fee715]">wdrażaniem systemów pozyskiwania klientów</span> - od sprawdzenia aktualnych działań, przez automatyzację i analizę danych, po wdrożenie AI w procesach.
                </p>
                <p>
                  <span className="font-bold text-[#fee715]">Tworzę też strony internetowe</span>, które są nie tylko szybkie i estetyczne, ale przede wszystkim zaprojektowane z myślą o konwersji.
                </p>
              </div>
              
              <p className="text-base text-gray-400 italic">
                Pracuję samodzielnie - bez zespołu i pośredników. Cały budżet moich klientów idzie w jakość, design i skuteczność.
              </p>
            </div>
            
            {/* Right - Photo */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/drozniak_photo_v1.jpg"
                  alt="Stanisław Drożniak"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent to-[#101820]/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Service 1 - Systems */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-[#fee715]/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold font-[Montserrat]">
                  Kompletny system sprzedaży dla Twojej firmy
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  Analizuję wszystkie działania marketingowe — od landing page'a, przez reklamy i social media, po wykorzystanie AI. Na tej podstawie tworzę proces, który realnie pomaga pozyskiwać nowych klientów.
                </p>
                
                <Link
                  to="/system"
                  className="inline-flex items-center text-[#fee715] hover:text-white font-medium transition-colors duration-300"
                >
                  Zobacz, jak to działa
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Service 2 - Websites */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10 hover:border-[#fee715]/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold font-[Montserrat]">
                  Strony, które łączą design i skuteczność
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  Buduję strony oparte na nowoczesnych frameworkach (np. Next.js, Astro, Vercel). Każda powstaje od zera - dopasowana do marki, lekka, szybka i gotowa do skalowania.
                </p>
                
                <Link
                  to="/strony-www"
                  className="inline-flex items-center text-[#fee715] hover:text-white font-medium transition-colors duration-300"
                >
                  Zobacz realizacje
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Metrics Section */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Metric 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Ponad 9 lat doświadczenia w marketingu i projektowaniu systemów sprzedaży.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Certyfikaty: Adobe, Meta, University of California.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Doświadczenie w pracy z firmami o wartości milionów złotych.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 rounded-2xl flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Współpraca 1:1 — bez pośredników, bez ogromnych budżetów.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b from-transparent to-[#101820]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Montserrat]">
              Masz projekt, który chcesz dopracować?
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Napisz do mnie —<br className="md:hidden" /> odpowiadam w 24 godziny.
            </p>
            
            <a
              href="https://calendly.com/drozniakstanislaw/spotkanie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-all duration-300"
            >
              Umów rozmowę 20 min
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
