
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

interface StepProps {
    number: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const ProcessStep: React.FC<StepProps> = ({ number, title, description, isLast = false }) => {
    const fadeInStep = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInStep.ref} className={`relative flex items-start ${fadeInStep.className}`}>
            <div className="flex-shrink-0 flex flex-col items-center mr-4 md:mr-6 lg:mr-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#fee715] text-[#101820] flex items-center justify-center font-bold font-[Montserrat] text-lg md:text-2xl">
                    {number}
                </div>
                {!isLast && <div className="w-px h-full bg-gray-700 mt-4"></div>}
            </div>
            <div className="pt-1 md:pt-2">
                <h3 className="font-[Montserrat] text-xl md:text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{description}</p>
            </div>
        </div>
    );
};

export const Process: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLDivElement>();
    return (
        <section className="py-16 md:py-20 px-4 md:px-6 bg-[#18232F]">
            <div className="container mx-auto max-w-3xl">
                <div ref={fadeInHeader.ref} className={`text-center mb-12 md:mb-16 px-2 ${fadeInHeader.className}`}>
                    <h2 className="font-[Montserrat] text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">Proces w 4 krokach</h2>
                    <p className="text-base md:text-lg text-gray-400 mb-4 md:mb-6">Od chaosu do przewidywalnego systemu w kilka tygodni.</p>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                            Prowadzę Cię za rękę przez cały proces. Ustalam propozycję, plan działania i rozwiązania. Sam wymyślam narzędzie interaktywne, dopasowane do Twojego biznesu i branży. Po zakupie wszystkie Twoje problemy się rozwiązują.
                        </p>
                    </div>
                </div>
                <div className="space-y-8 md:space-y-12">
                    <ProcessStep
                        number="1"
                        title="Diagnoza"
                        description="Podczas rozmowy (20–30 min) poznaję Twoją ofertę, klientów i wąskie gardła."
                    />
                    <ProcessStep
                        number="2"
                        title="Projekt"
                        description="Tworzę prosty schemat ścieżki klienta i makietę narzędzia."
                    />
                    <ProcessStep
                        number="3"
                        title="Wdrożenie"
                        description="Wdrażam narzędzie, integracje i automatyzacje AI. Testuję rozwiązanie."
                    />
                    <ProcessStep
                        number="4"
                        title="Uruchomienie"
                        description="Przekazuję gotowy projekt, nagrywam krótką instrukcję i pomagam przy starcie."
                        isLast
                    />
                </div>
            </div>
        </section>
    );
};
