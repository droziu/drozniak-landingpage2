import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System pozyskiwania klientów i strony WWW dla małych firm',
  description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Tworzę systemy pozyskiwania klientów, strony internetowe dla małych firm oraz szkolenia z AI w marketingu.',
  keywords: ['system pozyskiwania klientów', 'strony internetowe dla małych firm', 'strony www dla freelancerów', 'AI w marketingu małej firmy', 'automatyzacja marketingu', 'strategia marketingowa dla małych firm'],
  openGraph: {
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    url: 'https://drozniak.pl',
    images: [
      {
        url: 'https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp',
        width: 1200,
        height: 630,
        alt: 'Stanisław Drożniak',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System pozyskiwania klientów i strony WWW dla małych firm',
    description: 'Pomagam małym firmom i freelancerom pozyskiwać klientów z internetu. Systemy sprzedażowe, strony WWW i szkolenia z AI.',
    images: ['https://drozniak.pl/images/Drozniak_Zdjecie_Suit_2.webp'],
  },
  alternates: {
    canonical: 'https://drozniak.pl',
  },
};

export default function HomePage() {
  return (
    <main className="bg-[#101820] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-7xl">
          {/* Row 1: Typography + Visual - Similar Sizes */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-16 lg:gap-20 items-center mb-6 sm:mb-8 md:mb-12">
            {/* Left - Typography */}
            <div className="space-y-4 sm:space-y-6 md:space-y-8 order-2 lg:order-1">
              {/* Main headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-[Montserrat] leading-[1.15]">
                <span className="block text-white">Pomagam małym firmom</span>
                <span className="block text-white">i freelancerom</span>
                <span className="block bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">pozyskiwać klientów online</span>
              </h1>
              
              {/* Lead */}
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Tworzę systemy pozyskiwania klientów z internetu, strony internetowe dla małych firm oraz wykorzystuję AI w marketingu i automatyzację do zwiększania sprzedaży.
              </p>
            </div>
            
            {/* Right - Photo - Visible on mobile too */}
            <div className="relative order-1 lg:order-2 mb-4 sm:mb-6 lg:mb-0">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
                <Image
                  src="/images/Drozniak_Zdjecie_Suit_2.webp"
                  alt="Stanisław Drożniak"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>
          </div>
          
          {/* Row 2: Centered CTAs */}
          <div className="flex justify-center order-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
              <Link
                href="/strony-www"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/20 transition-all duration-300 text-sm sm:text-base"
              >
                Strony internetowe dla małych firm
              </Link>
              <Link
                href="/system"
                className="inline-flex items-center justify-center border-2 border-[#fee715] text-[#fee715] hover:bg-[#fee715] hover:text-[#101820] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 text-sm sm:text-base"
              >
                System pozyskiwania klientów
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Yellow title box - centered, same width as text */}
          <div className="flex justify-center mb-8 md:mb-10">
            <div className="max-w-4xl w-full">
              <div className="bg-[#fee715] px-8 md:px-12 lg:px-16 py-4 md:py-5 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-[Montserrat] text-[#101820] leading-tight tracking-tight uppercase m-0 p-0">
                  KIM JESTEM I JAK PRACUJĘ
                </h2>
              </div>
            </div>
          </div>
          
          {/* Full width content */}
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Jestem specjalistą od marketingu i technologii. Od lat pomagam małym firmom i freelancerom uporządkować procesy sprzedażowe i komunikację online.
            </p>
            
            <div className="space-y-4 text-base md:text-lg text-gray-300 leading-relaxed">
              <p>
                Zajmuję się <span className="font-bold text-[#fee715]">wdrażaniem systemów pozyskiwania klientów dla małych firm</span> - od sprawdzenia aktualnych działań, przez automatyzację marketingu i analizę danych, po wdrożenie AI w procesach sprzedażowych.
              </p>
              <p>
                <span className="font-bold text-[#fee715]">Tworzę też strony internetowe dla małych firm i freelancerów</span>, które są nie tylko szybkie i estetyczne, ale przede wszystkim zaprojektowane z myślą o konwersji i pozyskiwaniu klientów.
              </p>
            </div>
            
            <p className="text-base text-gray-400 italic">
              Pracuję samodzielnie - bez zespołu i pośredników. Cały budżet moich klientów idzie w jakość, design i skuteczność.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent to-[#101820]/50">
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
                  System pozyskiwania klientów dla małych firm
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  Analizuję wszystkie działania marketingowe - od landing page'a, przez reklamy i social media, po wykorzystanie AI. Na tej podstawie tworzę <strong>system pozyskiwania klientów</strong>, który realnie pomaga małym firmom i freelancerom pozyskiwać nowych klientów z internetu.
                </p>
                
                <Link
                  href="/system"
                  className="inline-flex items-center text-[#fee715] hover:text-white font-medium transition-colors duration-300"
                >
                  Zobacz system pozyskiwania klientów
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
                  Strony internetowe dla małych firm i freelancerów
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  Buduję <strong>strony www dla małych firm i freelancerów</strong> oparte na nowoczesnych frameworkach (np. Next.js, Astro, Vercel). Każda powstaje od zera - dopasowana do marki, lekka, szybka i gotowa do skalowania. Strony projektowane pod pozyskiwanie klientów.
                </p>
                
                <Link
                  href="/strony-www"
                  className="inline-flex items-center text-[#fee715] hover:text-white font-medium transition-colors duration-300"
                >
                  Zobacz strony internetowe dla małych firm
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
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-8">
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
                Współpraca 1:1 - bez pośredników, bez ogromnych budżetów.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="py-20 md:py-32 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-transparent to-[#101820]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Montserrat]">
              Masz projekt, który chcesz dopracować?
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Napisz do mnie -<br className="md:hidden" /> odpowiadam w 24 godziny.
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
}
