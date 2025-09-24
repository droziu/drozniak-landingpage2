
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface CaseCardProps {
    category: string;
    title: string;
    description: string;
    result: string;
    imageUrl: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ category, title, description, result, imageUrl }) => {
    const fadeInCard = useFadeIn<HTMLDivElement>();
    return (
        <div ref={fadeInCard.ref} className={`bg-[#18232F] rounded-lg overflow-hidden group border border-transparent hover:border-[#fee715] transition-all duration-300 ${fadeInCard.className}`}>
            <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="p-8">
                <p className="text-[#fee715] font-semibold mb-2">{category}</p>
                <h3 className="font-[Montserrat] text-2xl font-bold mb-4">{title}</h3>
                <p className="text-gray-300 mb-6">{description}</p>
                <div className="bg-gray-800/50 p-4 rounded-md">
                    <p className="font-semibold text-white">Wynik:</p>
                    <p className="text-[#00C9A7] font-bold text-lg">{result}</p>
                </div>
                <a href="#cta" className="inline-flex items-center text-white font-bold mt-6 group-hover:text-[#fee715] transition-colors duration-300">
                    Zobacz, jak możemy pomóc Tobie
                    <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
            </div>
        </div>
    );
};

export const CaseStudies: React.FC = () => {
    const fadeInHeader = useFadeIn<HTMLDivElement>();
    return (
        <section id="case" className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <div ref={fadeInHeader.ref} className={`text-center mb-16 ${fadeInHeader.className}`}>
                    <h2 className="font-[Montserrat] text-4xl md:text-5xl font-extrabold mb-4">Sprawdzone w praktyce</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">Zobacz, jak ten system zadziałał dla innych małych biznesów.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CaseCard
                        category="Studio Tańca"
                        title="Automatyzacja zapisów na zajęcia"
                        description="Stworzyliśmy interaktywny formularz, który pomagał wybrać odpowiednią grupę i automatycznie wysyłał maila z potwierdzeniem i płatnością."
                        result="+40% zapisów w pierwszym miesiącu"
                        imageUrl="https://picsum.photos/seed/dance/600/400"
                    />
                    <CaseCard
                        category="Dietetyk Online"
                        title="Kalkulator kalorii i spersonalizowana oferta"
                        description="Narzędzie, które na podstawie danych klienta liczyło zapotrzebowanie kaloryczne i proponowało jeden z trzech pakietów dietetycznych."
                        result="3x wzrost konwersji z formularza"
                        imageUrl="https://picsum.photos/seed/health/600/400"
                    />
                    <CaseCard
                        category="Freelance Copywriter"
                        title="System do wyceny i briefowania projektów"
                        description="Zamiast wymiany maili – inteligentny brief, który zbierał wszystkie potrzeby i na ich podstawie generował wstępną wycenę projektu."
                        result="Oszczędność ~5h pracy w tygodniu"
                        imageUrl="https://picsum.photos/seed/work/600/400"
                    />
                </div>
            </div>
        </section>
    );
};
