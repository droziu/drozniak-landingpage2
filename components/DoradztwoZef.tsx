import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { CustomSelect } from './CustomSelect';
import { CustomCheckbox } from './CustomCheckbox';
import { CustomRadio } from './CustomRadio';
import { CustomRange } from './CustomRange';
import { CustomModal } from './CustomModal';
import { ConfirmLeaveModal } from './ConfirmLeaveModal';

interface FormData {
  // Krok 2: Dane podstawowe
  companyName: string;
  location: string;
  mainActivities: string;
  cateringStage: string;
  scale: string;
  changes: string;
  
  // Krok 3: Klienci i oferta
  currentClientGroups: string[];
  currentClientGroupsOther: string;
  cateringClientGroups: string[];
  cateringClientGroupsOther: string;
  advantage: string;
  cateringOffer: string;
  clientChallenges: string;
  
  // Krok 4: Marketing online
  marketingChannels: string[];
  marketingChannelsOther: string;
  marketingPerson: string;
  marketingRegularity: number;
  clientSources: string;
  marketingProblems: string;
  
  // Krok 5: Procesy i narzędzia
  mainProcess: string;
  cateringProcess: string;
  tools: string;
  timeConsumingTasks: string;
  chaoticAreas: string;
  
  // Krok 6: Dane i analityka
  collectedData: string[];
  collectedDataOther: string;
  analyticsTools: string;
  dataVsIntuition: number;
  missingAnalytics: string;
  
  // Krok 7: AI i automatyzacja
  aiUsage: string;
  aiPotential: string[];
  aiPotentialOther: string;
  aiConcerns: string;
  automationNeeds: string;
  
  // Krok 8: Priorytety
  problem1: string;
  problem2: string;
  problem3: string;
  goals: string;
  successCriteria: string;
}

const STEPS = [
  { id: 1, title: 'Start', shortTitle: 'Start' },
  { id: 2, title: 'Dane podstawowe i profil firmy', shortTitle: 'Dane podstawowe' },
  { id: 3, title: 'Klienci i oferta', shortTitle: 'Klienci i oferta' },
  { id: 4, title: 'Marketing online i sprzedaż', shortTitle: 'Marketing online' },
  { id: 5, title: 'Procesy, narzędzia i organizacja', shortTitle: 'Procesy i narzędzia' },
  { id: 6, title: 'Dane i analityka', shortTitle: 'Dane i analityka' },
  { id: 7, title: 'Sztuczna inteligencja i automatyzacja', shortTitle: 'AI i automatyzacja' },
  { id: 8, title: 'Priorytety i podsumowanie', shortTitle: 'Priorytety' },
];

export const DoradztwoZef: React.FC = () => {
  useSEO({
    title: 'Doradztwo Biznesowe oraz Doboru Narzędzi AI - Diagnoza firmy Zef',
    description: 'Narzędzie do diagnozy biznesu dla firm z usługami komunalnymi rozwijających catering. Przeanalizuj sytuację firmy, marketing oraz potencjał wykorzystania nowych technologii (w tym AI).',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    location: '',
    mainActivities: '',
    cateringStage: '',
    scale: '',
    changes: '',
    currentClientGroups: [],
    currentClientGroupsOther: '',
    cateringClientGroups: [],
    cateringClientGroupsOther: '',
    advantage: '',
    cateringOffer: '',
    clientChallenges: '',
    marketingChannels: [],
    marketingChannelsOther: '',
    marketingPerson: '',
    marketingRegularity: 5,
    clientSources: '',
    marketingProblems: '',
    mainProcess: '',
    cateringProcess: '',
    tools: '',
    timeConsumingTasks: '',
    chaoticAreas: '',
    collectedData: [],
    collectedDataOther: '',
    analyticsTools: '',
    dataVsIntuition: 5,
    missingAnalytics: '',
    aiUsage: '',
    aiPotential: [],
    aiPotentialOther: '',
    aiConcerns: '',
    automationNeeds: '',
    problem1: '',
    problem2: '',
    problem3: '',
    goals: '',
    successCriteria: '',
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('doradztwo-zef-data');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('doradztwo-zef-data', JSON.stringify(formData));
  }, [formData]);

  // Check if form has any data
  const hasFormData = (): boolean => {
    // Check if any field has data (excluding default values)
    const defaultValues: FormData = {
      companyName: '',
      location: '',
      mainActivities: '',
      cateringStage: '',
      scale: '',
      changes: '',
      currentClientGroups: [],
      currentClientGroupsOther: '',
      cateringClientGroups: [],
      cateringClientGroupsOther: '',
      advantage: '',
      cateringOffer: '',
      clientChallenges: '',
      marketingChannels: [],
      marketingChannelsOther: '',
      marketingPerson: '',
      marketingRegularity: 5,
      clientSources: '',
      marketingProblems: '',
      mainProcess: '',
      cateringProcess: '',
      tools: '',
      timeConsumingTasks: '',
      chaoticAreas: '',
      collectedData: [],
      collectedDataOther: '',
      analyticsTools: '',
      dataVsIntuition: 5,
      missingAnalytics: '',
      aiUsage: '',
      aiPotential: [],
      aiPotentialOther: '',
      aiConcerns: '',
      automationNeeds: '',
      problem1: '',
      problem2: '',
      problem3: '',
      goals: '',
      successCriteria: '',
    };

    // Check if any field differs from default
    return (
      formData.companyName !== defaultValues.companyName ||
      formData.location !== defaultValues.location ||
      formData.mainActivities !== defaultValues.mainActivities ||
      formData.cateringStage !== defaultValues.cateringStage ||
      formData.scale !== defaultValues.scale ||
      formData.changes !== defaultValues.changes ||
      formData.currentClientGroups.length > 0 ||
      formData.currentClientGroupsOther !== defaultValues.currentClientGroupsOther ||
      formData.cateringClientGroups.length > 0 ||
      formData.cateringClientGroupsOther !== defaultValues.cateringClientGroupsOther ||
      formData.advantage !== defaultValues.advantage ||
      formData.cateringOffer !== defaultValues.cateringOffer ||
      formData.clientChallenges !== defaultValues.clientChallenges ||
      formData.marketingChannels.length > 0 ||
      formData.marketingChannelsOther !== defaultValues.marketingChannelsOther ||
      formData.marketingPerson !== defaultValues.marketingPerson ||
      formData.marketingRegularity !== defaultValues.marketingRegularity ||
      formData.clientSources !== defaultValues.clientSources ||
      formData.marketingProblems !== defaultValues.marketingProblems ||
      formData.mainProcess !== defaultValues.mainProcess ||
      formData.cateringProcess !== defaultValues.cateringProcess ||
      formData.tools !== defaultValues.tools ||
      formData.timeConsumingTasks !== defaultValues.timeConsumingTasks ||
      formData.chaoticAreas !== defaultValues.chaoticAreas ||
      formData.collectedData.length > 0 ||
      formData.collectedDataOther !== defaultValues.collectedDataOther ||
      formData.analyticsTools !== defaultValues.analyticsTools ||
      formData.dataVsIntuition !== defaultValues.dataVsIntuition ||
      formData.missingAnalytics !== defaultValues.missingAnalytics ||
      formData.aiUsage !== defaultValues.aiUsage ||
      formData.aiPotential.length > 0 ||
      formData.aiPotentialOther !== defaultValues.aiPotentialOther ||
      formData.aiConcerns !== defaultValues.aiConcerns ||
      formData.automationNeeds !== defaultValues.automationNeeds ||
      formData.problem1 !== defaultValues.problem1 ||
      formData.problem2 !== defaultValues.problem2 ||
      formData.problem3 !== defaultValues.problem3 ||
      formData.goals !== defaultValues.goals ||
      formData.successCriteria !== defaultValues.successCriteria
    );
  };

  // Handle beforeunload (refresh/close browser)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasFormData()) {
        e.preventDefault();
        e.returnValue = ''; // Chrome requires returnValue to be set
        return ''; // Some browsers require return value
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Intercept navigation attempts (clicking links, using browser back/forward)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && hasFormData()) {
        const href = link.getAttribute('href');
        // Check if it's an internal link (not external) and not the same page
        if (href && (href.startsWith('/') || href.startsWith(window.location.origin))) {
          const targetPath = href.startsWith('/') ? href : new URL(href).pathname;
          if (targetPath !== location.pathname) {
            e.preventDefault();
            e.stopPropagation();
            setShowLeaveModal(true);
            setPendingNavigation(() => () => {
              if (href.startsWith('/')) {
                navigate(href);
              } else {
                window.location.href = href;
              }
              setShowLeaveModal(false);
              setPendingNavigation(null);
            });
          }
        }
      }
    };

    // Intercept popstate (browser back/forward)
    const handlePopState = (e: PopStateEvent) => {
      if (hasFormData()) {
        window.history.pushState(null, '', location.pathname);
        setShowLeaveModal(true);
        setPendingNavigation(() => () => {
          window.history.back();
          setShowLeaveModal(false);
          setPendingNavigation(null);
        });
      }
    };

    window.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [formData, navigate, location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConfirmLeave = () => {
    if (pendingNavigation) {
      pendingNavigation();
    }
  };

  const handleCancelLeave = () => {
    setShowLeaveModal(false);
    setPendingNavigation(null);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep || step === 1) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleArrayItem = (field: keyof FormData, value: string) => {
    const current = formData[field] as string[];
    if (current.includes(value)) {
      updateFormData(field, current.filter(item => item !== value));
    } else {
      updateFormData(field, [...current, value]);
    }
  };

  const copySummary = () => {
    const summary = generateSummary();
    navigator.clipboard.writeText(summary).then(() => {
      setModalState({
        isOpen: true,
        title: 'Sukces',
        message: 'Odpowiedzi zostały skopiowane do schowka!',
        type: 'success',
      });
    }).catch(() => {
      setModalState({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się skopiować. Spróbuj zaznaczyć tekst ręcznie.',
        type: 'error',
      });
    });
  };

  const sendEmail = async () => {
    setIsSendingEmail(true);
    const summary = generateSummary();

    try {
      const response = await fetch('/api/doradztwo-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: summary,
        }),
      });

      if (!response.ok) {
        // Try to parse error response as JSON, but handle cases where it's not JSON
        let errorMessage = `Błąd ${response.status}: ${response.statusText}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            const text = await response.text();
            if (text) {
              errorMessage = text;
            }
          }
        } catch (parseError) {
          // If parsing fails, use the default error message
          console.error('Error parsing error response:', parseError);
        }
        throw new Error(errorMessage);
      }

      // Try to parse success response, but don't fail if it's empty
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          await response.json();
        }
      } catch (parseError) {
        // Ignore parsing errors for success responses
        console.warn('Could not parse success response:', parseError);
      }

      setModalState({
        isOpen: true,
        title: 'Sukces',
        message: 'Podsumowanie zostało wysłane mailem!',
        type: 'success',
      });
    } catch (error) {
      console.error('Email sending error:', error);
      setModalState({
        isOpen: true,
        title: 'Błąd',
        message: error instanceof Error ? error.message : 'Nie udało się wysłać emaila. Spróbuj ponownie.',
        type: 'error',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const generateSummary = (): string => {
    let summary = 'PODSUMOWANIE ODPOWIEDZI - DIAGNOZA BIZNESOWA\n';
    summary += '='.repeat(60) + '\n\n';

    // Krok 2
    summary += 'KROK 2: DANE PODSTAWOWE I PROFIL FIRMY\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Nazwa firmy: ${formData.companyName || 'Brak odpowiedzi'}\n`;
    summary += `Lokalizacja: ${formData.location || 'Brak odpowiedzi'}\n`;
    summary += `Główne obszary działalności: ${formData.mainActivities || 'Brak odpowiedzi'}\n`;
    summary += `Etap usług cateringowych: ${formData.cateringStage || 'Brak odpowiedzi'}\n`;
    summary += `Skala działalności: ${formData.scale || 'Brak odpowiedzi'}\n`;
    summary += `Zmiany w ostatnich latach: ${formData.changes || 'Brak odpowiedzi'}\n\n`;

    // Krok 3
    summary += 'KROK 3: KLIENCI I OFERTA\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Obecni klienci - usługi komunalne: ${formData.currentClientGroups.length > 0 ? formData.currentClientGroups.join(', ') : 'Brak odpowiedzi'}\n`;
    if (formData.currentClientGroupsOther) {
      summary += `Inne grupy klientów (komunalne): ${formData.currentClientGroupsOther}\n`;
    }
    summary += `Planowani klienci dla cateringu: ${formData.cateringClientGroups.length > 0 ? formData.cateringClientGroups.join(', ') : 'Brak odpowiedzi'}\n`;
    if (formData.cateringClientGroupsOther) {
      summary += `Inne grupy klientów (catering): ${formData.cateringClientGroupsOther}\n`;
    }
    summary += `Główna przewaga firmy: ${formData.advantage || 'Brak odpowiedzi'}\n`;
    summary += `Oferta cateringowa: ${formData.cateringOffer || 'Brak odpowiedzi'}\n`;
    summary += `Wyzwania związane z uruchomieniem/rozwijaniem cateringu: ${formData.clientChallenges || 'Brak odpowiedzi'}\n\n`;

    // Krok 4
    summary += 'KROK 4: MARKETING ONLINE I SPRZEDAŻ\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Kanały marketingu i komunikacji: ${formData.marketingChannels.length > 0 ? formData.marketingChannels.join(', ') : 'Brak odpowiedzi'}\n`;
    if (formData.marketingChannelsOther) {
      summary += `Inne kanały: ${formData.marketingChannelsOther}\n`;
    }
    summary += `Osoba zajmująca się marketingiem: ${formData.marketingPerson || 'Brak odpowiedzi'}\n`;
    summary += `Regularność działań (1-10): ${formData.marketingRegularity}\n`;
    summary += `Źródła zapytań/nowych klientów: ${formData.clientSources || 'Brak odpowiedzi'}\n`;
    summary += `Problemy w marketingu online: ${formData.marketingProblems || 'Brak odpowiedzi'}\n\n`;

    // Krok 5
    summary += 'KROK 5: PROCESY, NARZĘDZIA I ORGANIZACJA\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Proces obsługi zleceń (usługi komunalne): ${formData.mainProcess || 'Brak odpowiedzi'}\n`;
    summary += `Proces obsługi zamówień na catering: ${formData.cateringProcess || 'Brak odpowiedzi'}\n`;
    summary += `Narzędzia/systemy: ${formData.tools || 'Brak odpowiedzi'}\n`;
    summary += `Czynności zajmujące najwięcej czasu: ${formData.timeConsumingTasks || 'Brak odpowiedzi'}\n`;
    summary += `Obszary chaotyczne: ${formData.chaoticAreas || 'Brak odpowiedzi'}\n\n`;

    // Krok 6
    summary += 'KROK 6: DANE I ANALITYKA\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Zbierane dane: ${formData.collectedData.length > 0 ? formData.collectedData.join(', ') : 'Brak odpowiedzi'}\n`;
    if (formData.collectedDataOther) {
      summary += `Inne dane: ${formData.collectedDataOther}\n`;
    }
    summary += `Sposób przeglądania wyników: ${formData.analyticsTools || 'Brak odpowiedzi'}\n`;
    summary += `Dane vs intuicja (1-10): ${formData.dataVsIntuition}\n`;
    summary += `Brakujące informacje analityczne: ${formData.missingAnalytics || 'Brak odpowiedzi'}\n\n`;

    // Krok 7
    summary += 'KROK 7: SZTUCZNA INTELIGENCJA I AUTOMATYZACJA\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Korzystanie z AI: ${formData.aiUsage || 'Brak odpowiedzi'}\n`;
    summary += `Potencjał wykorzystania AI: ${formData.aiPotential.length > 0 ? formData.aiPotential.join(', ') : 'Brak odpowiedzi'}\n`;
    if (formData.aiPotentialOther) {
      summary += `Inne obszary AI: ${formData.aiPotentialOther}\n`;
    }
    summary += `Obawy związane z AI: ${formData.aiConcerns || 'Brak odpowiedzi'}\n`;
    summary += `Procesy do automatyzacji: ${formData.automationNeeds || 'Brak odpowiedzi'}\n\n`;

    // Krok 8
    summary += 'KROK 8: PRIORYTETY I PODSUMOWANIE\n';
    summary += '-'.repeat(60) + '\n';
    summary += `Problem 1 (najważniejszy): ${formData.problem1 || 'Brak odpowiedzi'}\n`;
    summary += `Problem 2: ${formData.problem2 || 'Brak odpowiedzi'}\n`;
    summary += `Problem 3: ${formData.problem3 || 'Brak odpowiedzi'}\n`;
    summary += `Cele na 12 miesięcy (catering): ${formData.goals || 'Brak odpowiedzi'}\n`;
    summary += `Kryteria sukcesu projektu: ${formData.successCriteria || 'Brak odpowiedzi'}\n\n`;

    summary += '='.repeat(60) + '\n';
    summary += 'Te odpowiedzi będą stanowiły podstawę do przygotowania raportu doradczego i rekomendacji.\n';

    return summary;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-12">
            <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold text-white mb-6">
              Usługa: Doradztwo biznesowe oraz dobór narzędzi AI – rozwój usług cateringowych
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Narzędzie przygotowane na potrzeby usługi doradczej, aby przeanalizować obecną działalność firmy (usługi komunalne) oraz planowane / rozwijane usługi cateringowe. Odpowiedzi pomogą przygotować raport doradczy i konkretne rekomendacje dotyczące oferty, procesów, marketingu oraz wykorzystania nowych technologii (w tym AI).
            </p>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-4 px-8 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/20 transition-all duration-300 text-lg"
            >
              Rozpocznij diagnozę
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Dane podstawowe i profil firmy
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nazwa firmy
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                placeholder="Wpisz pełną nazwę firmy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lokalizacja głównej działalności (miasto / region)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                placeholder="Np. Rybnik, woj. śląskie"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakie są główne obszary działalności firmy obecnie?
              </label>
              <textarea
                value={formData.mainActivities}
                onChange={(e) => updateFormData('mainActivities', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. wywóz odpadów, asenizacja, inne usługi komunalne"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Na jakim etapie są usługi cateringowe?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'pomysł', label: 'pomysł / etap planowania' },
                  { value: 'przygotowania', label: 'przygotowania (sprzęt, zaplecze, pierwsze testy)' },
                  { value: 'pilotaż', label: 'pierwsze zlecenia / pilotaż' },
                  { value: 'regularna', label: 'regularna sprzedaż, chcemy to rozwinąć dalej' },
                ].map((option) => (
                  <CustomRadio
                    key={option.value}
                    name="cateringStage"
                    value={option.value}
                    checked={formData.cateringStage === option.value}
                    onChange={() => updateFormData('cateringStage', option.value)}
                    label={option.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jaka jest przybliżona skala działalności (łącznie dla firmy)?
              </label>
              <CustomSelect
                value={formData.scale}
                onChange={(value) => updateFormData('scale', value)}
                options={[
                  { value: '1-5', label: '1–5 osób / mikro firma' },
                  { value: '6-20', label: '6–20 osób' },
                  { value: '21-50', label: '21–50 osób' },
                  { value: '50+', label: 'powyżej 50 osób' },
                  { value: 'trudno', label: 'trudno powiedzieć / zmienne' },
                ]}
                placeholder="Wybierz opcję"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Czy w ostatnich 2–3 latach profil działalności się zmieniał lub planują Państwo większe zmiany (poza cateringiem)?
              </label>
              <textarea
                value={formData.changes}
                onChange={(e) => updateFormData('changes', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Krótko opisz najważniejsze zmiany lub plany"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Klienci i oferta
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Obecni klienci – usługi komunalne
              </label>
              <p className="text-xs text-gray-400 mb-3">Jakie są główne grupy klientów w obecnej działalności?</p>
              <div className="space-y-2">
                {[
                  'gminy / jednostki samorządu',
                  'instytucje publiczne (np. szkoły, urzędy)',
                  'firmy prywatne',
                  'klienci indywidualni (gospodarstwa domowe)',
                ].map((option) => (
                  <CustomCheckbox
                    key={option}
                    checked={formData.currentClientGroups.includes(option)}
                    onChange={() => toggleArrayItem('currentClientGroups', option)}
                    label={option}
                  />
                ))}
                <CustomCheckbox
                  checked={formData.currentClientGroups.includes('inne')}
                  onChange={() => toggleArrayItem('currentClientGroups', 'inne')}
                  label="Inne"
                />
              </div>
              {formData.currentClientGroups.includes('inne') && (
                <input
                  type="text"
                  value={formData.currentClientGroupsOther}
                  onChange={(e) => updateFormData('currentClientGroupsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Doprecyzuj inne grupy klientów"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Planowani / docelowi klienci dla cateringu
              </label>
              <div className="space-y-2">
                {[
                  'firmy (np. posiłki dla pracowników, spotkania)',
                  'instytucje (szkoły, przedszkola, inne)',
                  'imprezy okolicznościowe (wesela, komunie itp.)',
                  'klienci indywidualni (zamówienia do domu, małe imprezy)',
                  'diety pudełkowe / stałe dostawy posiłków',
                ].map((option) => (
                  <CustomCheckbox
                    key={option}
                    checked={formData.cateringClientGroups.includes(option)}
                    onChange={() => toggleArrayItem('cateringClientGroups', option)}
                    label={option}
                  />
                ))}
                <CustomCheckbox
                  checked={formData.cateringClientGroups.includes('inne')}
                  onChange={() => toggleArrayItem('cateringClientGroups', 'inne')}
                  label="inne"
                />
              </div>
              {formData.cateringClientGroups.includes('inne') && (
                <input
                  type="text"
                  value={formData.cateringClientGroupsOther}
                  onChange={(e) => updateFormData('cateringClientGroupsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Doprecyzuj inne grupy"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jak w skrócie ma wyglądać oferta cateringowa?
              </label>
              <textarea
                value={formData.cateringOffer}
                onChange={(e) => updateFormData('cateringOffer', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. rodzaj kuchni, typy menu, dla kogo głównie"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Co uważają Państwo za największą przewagę firmy, którą można wykorzystać w cateringu?
              </label>
              <textarea
                value={formData.advantage}
                onChange={(e) => updateFormData('advantage', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. logistyka, niezawodność, doświadczenie z instytucjami"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakie są obecnie największe wyzwania związane z uruchomieniem / rozwijaniem cateringu?
              </label>
              <textarea
                value={formData.clientChallenges}
                onChange={(e) => updateFormData('clientChallenges', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Opisz główne wyzwania"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Marketing online i sprzedaż
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Z jakich kanałów marketingu i komunikacji korzystają Państwo obecnie (łącznie: usługi komunalne + catering)?
              </label>
              <div className="space-y-2">
                {[
                  'strona internetowa',
                  'Facebook',
                  'Instagram',
                  'Google Wizytówka / opinie w Google',
                  'ogłoszenia / portale lokalne',
                  'e-mail / newsletter',
                  'reklamy płatne (Facebook Ads / Google Ads itp.)',
                ].map((option) => (
                  <CustomCheckbox
                    key={option}
                    checked={formData.marketingChannels.includes(option)}
                    onChange={() => toggleArrayItem('marketingChannels', option)}
                    label={option}
                  />
                ))}
                <CustomCheckbox
                  checked={formData.marketingChannels.includes('inne')}
                  onChange={() => toggleArrayItem('marketingChannels', 'inne')}
                  label="Inne"
                />
              </div>
              {formData.marketingChannels.includes('inne') && (
                <input
                  type="text"
                  value={formData.marketingChannelsOther}
                  onChange={(e) => updateFormData('marketingChannelsOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Doprecyzuj inne kanały"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kto obecnie zajmuje się działaniami marketingowymi i komunikacją z klientami?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'właściciel', label: 'właściciel / wspólnicy' },
                  { value: 'pracownik', label: 'pracownik biurowy / administracja' },
                  { value: 'zewnętrzna', label: 'zewnętrzna firma / freelancer' },
                  { value: 'nikt', label: 'nikt na stałe, działamy doraźnie' },
                ].map((option) => (
                  <CustomRadio
                    key={option.value}
                    name="marketingPerson"
                    value={option.value}
                    checked={formData.marketingPerson === option.value}
                    onChange={() => updateFormData('marketingPerson', option.value)}
                    label={option.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Regularność działań marketingowych (skala 1–10)
              </label>
              <CustomRange
                value={formData.marketingRegularity}
                onChange={(value) => updateFormData('marketingRegularity', value)}
                min={1}
                max={10}
                leftLabel="1 = działania sporadyczne / nieregularne"
                rightLabel="10 = zaplanowany, stały marketing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skąd obecnie pochodzi najwięcej zapytań / nowych klientów (dla firmy jako całości)?
              </label>
              <textarea
                value={formData.clientSources}
                onChange={(e) => updateFormData('clientSources', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. polecenia, przetargi, strona www, Facebook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakie są największe problemy lub ograniczenia w marketingu online z Państwa perspektywy?
              </label>
              <textarea
                value={formData.marketingProblems}
                onChange={(e) => updateFormData('marketingProblems', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Opisz główne problemy"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Procesy, narzędzia i organizacja
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jak w tej chwili wygląda proces obsługi zleceń w głównej działalności (usługi komunalne)?
              </label>
              <textarea
                value={formData.mainProcess}
                onChange={(e) => updateFormData('mainProcess', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. zapytanie / zlecenie → ustalenie szczegółów → realizacja → rozliczenie"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jak wyobrażają sobie Państwo proces obsługi zamówień na catering (w idealnej wersji)?
              </label>
              <textarea
                value={formData.cateringProcess}
                onChange={(e) => updateFormData('cateringProcess', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. jak klient składa zamówienie, kto je obsługuje, jak wygląda potwierdzenie"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Z jakich narzędzi / systemów korzystają Państwo w codziennej pracy biurowej?
              </label>
              <textarea
                value={formData.tools}
                onChange={(e) => updateFormData('tools', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. program do faktur, Excel, kalendarz, system do obsługi zleceń, inne"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Które czynności w biurze zajmują obecnie najwięcej czasu w tygodniu?
              </label>
              <textarea
                value={formData.timeConsumingTasks}
                onChange={(e) => updateFormData('timeConsumingTasks', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Opisz, co najbardziej zjada czas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Czy są obszary, które z Pana/Pani perspektywy są &quot;chaotyczne&quot; lub łatwo o pomyłki?
              </label>
              <textarea
                value={formData.chaoticAreas}
                onChange={(e) => updateFormData('chaoticAreas', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Krótko opisz obszary wymagające uporządkowania"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Dane i analityka
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakie dane o działalności są obecnie regularnie zbierane i analizowane?
              </label>
              <div className="space-y-2">
                {[
                  'liczba zleceń miesięcznie',
                  'przychody wg miesięcy / typów usług',
                  'koszty podstawowe (paliwo, serwis, inne)',
                  'źródła zapytań / klientów',
                  'opinie / skargi / pochwały klientów',
                ].map((option) => (
                  <CustomCheckbox
                    key={option}
                    checked={formData.collectedData.includes(option)}
                    onChange={() => toggleArrayItem('collectedData', option)}
                    label={option}
                  />
                ))}
                <CustomCheckbox
                  checked={formData.collectedData.includes('inne')}
                  onChange={() => toggleArrayItem('collectedData', 'inne')}
                  label="Inne"
                />
              </div>
              {formData.collectedData.includes('inne') && (
                <input
                  type="text"
                  value={formData.collectedDataOther}
                  onChange={(e) => updateFormData('collectedDataOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Doprecyzuj inne dane"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                W jaki sposób najczęściej przeglądają Państwo wyniki firmy?
              </label>
              <textarea
                value={formData.analyticsTools}
                onChange={(e) => updateFormData('analyticsTools', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. raport z programu księgowego, Excel, proste zestawienia"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Na jakiej podstawie określane są obecnie działania w firmie? (np. w marketingu, planowaniu)
              </label>
              <p className="text-xs text-gray-400 mb-3">Na ile działania są podejmowane na podstawie danych, a na ile na podstawie intuicji?</p>
              <CustomRange
                value={formData.dataVsIntuition}
                onChange={(value) => updateFormData('dataVsIntuition', value)}
                min={1}
                max={10}
                leftLabel="1 = głównie intuicja"
                rightLabel="10 = głównie twarde dane"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakich informacji analitycznych najbardziej Państwu brakuje przy podejmowaniu decyzji (szczególnie w kontekście cateringu)?
              </label>
              <textarea
                value={formData.missingAnalytics}
                onChange={(e) => updateFormData('missingAnalytics', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Opisz, jakich danych brakuje"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Sztuczna inteligencja i automatyzacja
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Czy ktoś w firmie korzysta już z narzędzi AI (np. do pisania tekstów, podsumowań, analiz)?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'regularnie', label: 'Tak, regularnie' },
                  { value: 'sporadycznie', label: 'Tak, sporadycznie' },
                  { value: 'nie', label: 'Nie, jeszcze nie' },
                ].map((option) => (
                  <CustomRadio
                    key={option.value}
                    name="aiUsage"
                    value={option.value}
                    checked={formData.aiUsage === option.value}
                    onChange={() => updateFormData('aiUsage', option.value)}
                    label={option.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                W jakich obszarach widzą Państwo największy potencjał wykorzystania AI w firmie?
              </label>
              <div className="space-y-2">
                {[
                  'tworzenie i redagowanie tekstów (oferty, maile, opisy usług)',
                  'przygotowanie materiałów promocyjnych (np. pomysły na posty, grafiki)',
                  'analiza danych i prostych raportów',
                  'automatyczne odpowiedzi na podstawowe zapytania klientów',
                  'porządkowanie informacji / dokumentów',
                ].map((option) => (
                  <CustomCheckbox
                    key={option}
                    checked={formData.aiPotential.includes(option)}
                    onChange={() => toggleArrayItem('aiPotential', option)}
                    label={option}
                  />
                ))}
                <CustomCheckbox
                  checked={formData.aiPotential.includes('inne')}
                  onChange={() => toggleArrayItem('aiPotential', 'inne')}
                  label="Inne"
                />
              </div>
              {formData.aiPotential.includes('inne') && (
                <input
                  type="text"
                  value={formData.aiPotentialOther}
                  onChange={(e) => updateFormData('aiPotentialOther', e.target.value)}
                  className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Doprecyzuj inne obszary"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Jakie mają Państwo główne obawy lub wątpliwości związane z AI?
              </label>
              <textarea
                value={formData.aiConcerns}
                onChange={(e) => updateFormData('aiConcerns', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Krótko opisz obawy lub pytania"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Czy są konkretne procesy, które w przyszłości chcieliby Państwo zautomatyzować lub uprościć?
              </label>
              <textarea
                value={formData.automationNeeds}
                onChange={(e) => updateFormData('automationNeeds', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                placeholder="Np. obsługa zapytań, przygotowywanie ofert, raporty, inne"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="font-[Montserrat] text-2xl md:text-3xl font-bold text-white mb-6">
              Priorytety i podsumowanie odpowiedzi
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Problem 1 (najważniejszy, który chcieliby Państwo rozwiązać w pierwszej kolejności)
                </label>
                <input
                  type="text"
                  value={formData.problem1}
                  onChange={(e) => updateFormData('problem1', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Opisz najważniejszy problem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Problem 2
                </label>
                <input
                  type="text"
                  value={formData.problem2}
                  onChange={(e) => updateFormData('problem2', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Opisz drugi problem"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Problem 3
                </label>
                <input
                  type="text"
                  value={formData.problem3}
                  onChange={(e) => updateFormData('problem3', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300"
                  placeholder="Opisz trzeci problem (opcjonalnie)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jakie są główne cele firmy na najbliższe 12 miesięcy w kontekście usług cateringowych?
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                  placeholder="Np. liczba klientów, rodzaj zleceń, rozpoznawalność"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jakie rezultaty uznają Państwo za sukces po zakończeniu tego projektu doradczego?
                </label>
                <textarea
                  value={formData.successCriteria}
                  onChange={(e) => updateFormData('successCriteria', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fee715]/50 focus:border-[#fee715] transition-all duration-300 resize-none min-h-[100px]"
                  placeholder="Opisz, po czym poznamy, że projekt się udał"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="font-[Montserrat] text-2xl font-bold text-white mb-6">
                Podsumowanie odpowiedzi
              </h3>
              
              {/* Professional Summary Cards */}
              <div className="space-y-4 mb-6">
                {/* Krok 2 */}
                {(formData.companyName || formData.location || formData.mainActivities || formData.cateringStage || formData.scale || formData.changes) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        2
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Dane podstawowe i profil firmy</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.companyName && (
                        <div>
                          <span className="text-[#fee715] font-medium">Nazwa firmy:</span> {formData.companyName}
                        </div>
                      )}
                      {formData.location && (
                        <div>
                          <span className="text-[#fee715] font-medium">Lokalizacja:</span> {formData.location}
                        </div>
                      )}
                      {formData.mainActivities && (
                        <div>
                          <span className="text-[#fee715] font-medium">Główne obszary działalności:</span> {formData.mainActivities}
                        </div>
                      )}
                      {formData.cateringStage && (
                        <div>
                          <span className="text-[#fee715] font-medium">Etap usług cateringowych:</span> {formData.cateringStage}
                        </div>
                      )}
                      {formData.scale && (
                        <div>
                          <span className="text-[#fee715] font-medium">Skala działalności:</span> {formData.scale}
                        </div>
                      )}
                      {formData.changes && (
                        <div>
                          <span className="text-[#fee715] font-medium">Zmiany:</span> {formData.changes}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 3 */}
                {(formData.currentClientGroups.length > 0 || formData.cateringClientGroups.length > 0 || formData.advantage || formData.cateringOffer || formData.clientChallenges) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        3
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Klienci i oferta</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.currentClientGroups.length > 0 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Obecni klienci (komunalne):</span> {formData.currentClientGroups.join(', ')}
                          {formData.currentClientGroupsOther && ` (${formData.currentClientGroupsOther})`}
                        </div>
                      )}
                      {formData.cateringClientGroups.length > 0 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Planowani klienci (catering):</span> {formData.cateringClientGroups.join(', ')}
                          {formData.cateringClientGroupsOther && ` (${formData.cateringClientGroupsOther})`}
                        </div>
                      )}
                      {formData.advantage && (
                        <div>
                          <span className="text-[#fee715] font-medium">Główna przewaga:</span> {formData.advantage}
                        </div>
                      )}
                      {formData.cateringOffer && (
                        <div>
                          <span className="text-[#fee715] font-medium">Oferta cateringowa:</span> {formData.cateringOffer}
                        </div>
                      )}
                      {formData.clientChallenges && (
                        <div>
                          <span className="text-[#fee715] font-medium">Wyzwania:</span> {formData.clientChallenges}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 4 */}
                {(formData.marketingChannels.length > 0 || formData.marketingPerson || formData.clientSources || formData.marketingProblems) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        4
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Marketing online i sprzedaż</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.marketingChannels.length > 0 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Kanały:</span> {formData.marketingChannels.join(', ')}
                          {formData.marketingChannelsOther && ` (${formData.marketingChannelsOther})`}
                        </div>
                      )}
                      {formData.marketingPerson && (
                        <div>
                          <span className="text-[#fee715] font-medium">Osoba zajmująca się marketingiem:</span> {formData.marketingPerson}
                        </div>
                      )}
                      <div>
                        <span className="text-[#fee715] font-medium">Regularność działań:</span> {formData.marketingRegularity}/10
                      </div>
                      {formData.clientSources && (
                        <div>
                          <span className="text-[#fee715] font-medium">Źródła zapytań/klientów:</span> {formData.clientSources}
                        </div>
                      )}
                      {formData.marketingProblems && (
                        <div>
                          <span className="text-[#fee715] font-medium">Problemy:</span> {formData.marketingProblems}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 5 */}
                {(formData.mainProcess || formData.cateringProcess || formData.tools || formData.timeConsumingTasks || formData.chaoticAreas) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        5
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Procesy, narzędzia i organizacja</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.mainProcess && (
                        <div>
                          <span className="text-[#fee715] font-medium">Proces obsługi zleceń (komunalne):</span> {formData.mainProcess}
                        </div>
                      )}
                      {formData.cateringProcess && (
                        <div>
                          <span className="text-[#fee715] font-medium">Proces obsługi zamówień (catering):</span> {formData.cateringProcess}
                        </div>
                      )}
                      {formData.tools && (
                        <div>
                          <span className="text-[#fee715] font-medium">Narzędzia:</span> {formData.tools}
                        </div>
                      )}
                      {formData.timeConsumingTasks && (
                        <div>
                          <span className="text-[#fee715] font-medium">Czynności czasochłonne:</span> {formData.timeConsumingTasks}
                        </div>
                      )}
                      {formData.chaoticAreas && (
                        <div>
                          <span className="text-[#fee715] font-medium">Obszary chaotyczne:</span> {formData.chaoticAreas}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 6 */}
                {(formData.collectedData.length > 0 || formData.analyticsTools || formData.missingAnalytics) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        6
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Dane i analityka</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.collectedData.length > 0 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Zbierane dane:</span> {formData.collectedData.join(', ')}
                          {formData.collectedDataOther && ` (${formData.collectedDataOther})`}
                        </div>
                      )}
                      {formData.analyticsTools && (
                        <div>
                          <span className="text-[#fee715] font-medium">Sposób przeglądania wyników:</span> {formData.analyticsTools}
                        </div>
                      )}
                      <div>
                        <span className="text-[#fee715] font-medium">Dane vs intuicja:</span> {formData.dataVsIntuition}/10
                      </div>
                      {formData.missingAnalytics && (
                        <div>
                          <span className="text-[#fee715] font-medium">Brakujące dane:</span> {formData.missingAnalytics}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 7 */}
                {(formData.aiUsage || formData.aiPotential.length > 0 || formData.aiConcerns || formData.automationNeeds) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        7
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Sztuczna inteligencja i automatyzacja</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.aiUsage && (
                        <div>
                          <span className="text-[#fee715] font-medium">Korzystanie z AI:</span> {formData.aiUsage}
                        </div>
                      )}
                      {formData.aiPotential.length > 0 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Potencjał AI:</span> {formData.aiPotential.join(', ')}
                          {formData.aiPotentialOther && ` (${formData.aiPotentialOther})`}
                        </div>
                      )}
                      {formData.aiConcerns && (
                        <div>
                          <span className="text-[#fee715] font-medium">Obawy:</span> {formData.aiConcerns}
                        </div>
                      )}
                      {formData.automationNeeds && (
                        <div>
                          <span className="text-[#fee715] font-medium">Automatyzacja:</span> {formData.automationNeeds}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Krok 8 */}
                {(formData.problem1 || formData.problem2 || formData.problem3 || formData.goals || formData.successCriteria) && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#fee715] to-[#00C9A7] rounded-full flex items-center justify-center text-[#101820] font-bold mr-3">
                        8
                      </div>
                      <h4 className="font-[Montserrat] text-lg font-bold text-white">Priorytety</h4>
                    </div>
                    <div className="space-y-3 text-gray-300">
                      {formData.problem1 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Problem 1:</span> {formData.problem1}
                        </div>
                      )}
                      {formData.problem2 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Problem 2:</span> {formData.problem2}
                        </div>
                      )}
                      {formData.problem3 && (
                        <div>
                          <span className="text-[#fee715] font-medium">Problem 3:</span> {formData.problem3}
                        </div>
                      )}
                      {formData.goals && (
                        <div>
                          <span className="text-[#fee715] font-medium">Cele na 12 miesięcy:</span> {formData.goals}
                        </div>
                      )}
                      {formData.successCriteria && (
                        <div>
                          <span className="text-[#fee715] font-medium">Kryteria sukcesu:</span> {formData.successCriteria}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={copySummary}
                  className="flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#fee715]/20 transition-all duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Skopiuj odpowiedzi
                </button>
                <button
                  onClick={sendEmail}
                  disabled={isSendingEmail}
                  className="flex-1 border-2 border-[#fee715] text-[#fee715] font-bold py-3 px-6 rounded-lg hover:bg-[#fee715] hover:text-[#101820] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSendingEmail ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Wyślij mailem
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Te odpowiedzi będą stanowiły podstawę do przygotowania raportu doradczego i rekomendacji.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar - Stepper */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="space-y-4">
                {STEPS.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const isClickable = step.id <= currentStep || step.id === 1;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isClickable}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/50'
                          : isCompleted
                          ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                          : 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                      } ${isClickable && !isActive ? 'hover:bg-white/10' : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820]'
                              : isCompleted
                              ? 'bg-[#00C9A7] text-white'
                              : 'bg-white/10 text-gray-400'
                          }`}
                        >
                          {isCompleted ? '✓' : step.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium ${
                              isActive ? 'text-[#fee715]' : isCompleted ? 'text-white' : 'text-gray-400'
                            }`}
                          >
                            {step.shortTitle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
              {/* Progress Counter */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <h1 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white">
                  {STEPS[currentStep - 1].title}
                </h1>
                <div className="text-sm text-gray-400">
                  Krok {currentStep} z {STEPS.length}
                </div>
              </div>

              {/* Step Content */}
              <div className="mb-8">{renderStepContent()}</div>

              {/* Navigation Buttons */}
              {currentStep > 1 && (
                <div className="flex justify-between items-center pt-6 border-t border-white/10">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Wstecz
                  </button>
                  {currentStep < 8 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-bold rounded-lg hover:shadow-lg hover:shadow-[#fee715]/20 transition-all duration-300"
                    >
                      Dalej
                    </button>
                  ) : (
                    <div className="text-sm text-gray-400">
                      Diagnoza zakończona
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      <CustomModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      {/* Confirm Leave Modal */}
      <ConfirmLeaveModal
        isOpen={showLeaveModal}
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />
    </main>
  );
};

