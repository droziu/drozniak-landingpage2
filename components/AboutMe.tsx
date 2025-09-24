import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const AboutMe: React.FC = () => {
  const fadeInSection = useFadeIn<HTMLDivElement>();
  const fadeInImage = useFadeIn<HTMLDivElement>();
  const fadeInContent = useFadeIn<HTMLDivElement>();

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-b from-[#18232F] to-[#101820]">
      <div className="container mx-auto max-w-6xl">
        <div ref={fadeInSection.ref} className={`text-center mb-12 md:mb-16 ${fadeInSection.className}`}>
          <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Kim <span className="text-[#fee715]">jestem?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo Section */}
          <div ref={fadeInImage.ref} className={`order-2 lg:order-1 ${fadeInImage.className}`}>
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-2xl transform rotate-3 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C9A7] to-[#fee715] rounded-2xl transform -rotate-3 group-hover:-rotate-6 group-hover:scale-105 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative bg-[#101820] rounded-2xl p-2 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="/images/12345.jpg" 
                  alt="Stanisław Drożniak" 
                  className="w-full h-auto rounded-xl object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#fee715] text-[#101820] px-4 py-2 rounded-full font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                9 lat doświadczenia
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Content Section */}
          <div ref={fadeInContent.ref} className={`order-1 lg:order-2 space-y-6 ${fadeInContent.className}`}>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Zaczynałem jako nauczyciel szachów i freelancer montujący filmy. Z czasem coraz więcej czasu poświęcałem na marketing i automatyzację procesów.
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                <span className="text-[#fee715] font-semibold">Prawdopodobnie mamy podobne doświadczenia</span> – ja też byłem freelancerem, który aktywnie szukał klientów i zmagał się z niestabilnością przychodów.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Przez lata pomogłem dziesiątkom firm i freelancerów z ich marketingiem, integracją AI i automatyzacją procesów. Wiem, jak wyglądają Twoje zmagania, więc prawdopodobnie będę mógł Ci pomóc skuteczniej niż duża agencja.
              </p>
            </div>

            {/* Certificates */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="font-[Montserrat] text-xl font-bold text-[#fee715] mb-6 text-center">Certyfikaty i kwalifikacje</h3>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
                <div className="bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 rounded-lg px-4 py-2">
                  <span className="text-[#fee715] font-bold text-sm md:text-base">META</span>
                </div>
                <div className="bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 rounded-lg px-4 py-2">
                  <span className="text-[#fee715] font-bold text-sm md:text-base">Adobe</span>
                </div>
                <div className="bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 rounded-lg px-4 py-2">
                  <span className="text-[#fee715] font-bold text-sm md:text-base">University of California</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
              <p className="text-lg md:text-xl text-gray-200 font-medium text-center">
                "Rozumiem Twoje problemy i frustracje biznesowe.<br/>
                Wspólnie możemy popracować nad Twoim marketingiem i stworzyć działający system."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
