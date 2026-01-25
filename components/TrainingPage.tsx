import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCourse } from '../hooks/useCourse';
import { useCourseById } from '../hooks/useCourseById';
import { supabase } from '../lib/supabase';
import { trainingModules } from '../config/trainingModules';
import type { QuizQuestion, Module } from '../config/trainingModules';
import { loadCourseModules } from '../utils/courseLoader';
import { CustomRadio } from './CustomRadio';
import { UserMenu } from './UserMenu';
import { CourseCompletionScreen } from './CourseCompletionScreen';
import { LoadingState } from './LoadingState';

// Ikony jako proste komponenty SVG
const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const MegaphoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const AnalyticsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const getIcon = (iconName: string) => {
  const iconClass = "w-5 h-5";
  switch (iconName) {
    case 'chart':
      return <ChartIcon className={iconClass} />;
    case 'pen':
      return <PenIcon className={iconClass} />;
    case 'megaphone':
      return <MegaphoneIcon className={iconClass} />;
    case 'users':
      return <UsersIcon className={iconClass} />;
    case 'mail':
      return <MailIcon className={iconClass} />;
    case 'analytics':
      return <AnalyticsIcon className={iconClass} />;
    default:
      return <ChartIcon className={iconClass} />;
  }
};

interface TrainingProgress {
  [lessonId: string]: {
    completed: boolean;
    quizCompleted: boolean;
  };
}

interface TrainingPageProps {
  embedded?: boolean;
  courseId?: string | null;
  standalone?: boolean;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ embedded = false, courseId = null, standalone = false }) => {
  const { user, loading: authLoading, signOut, updatePassword } = useAuth();
  const byId = useCourseById(courseId || null);
  const byList = useCourse();
  const course = courseId ? byId.course : byList.course;
  const courseLoading = courseId ? byId.loading : byList.loading;
  const navigate = useNavigate();
  const [currentLessonId, setCurrentLessonId] = useState<string>('1.1');
  const [progress, setProgress] = useState<TrainingProgress>({});
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<{ [questionId: string]: string | number }>({});
  const [quizSubTaskAnswers, setQuizSubTaskAnswers] = useState<{ [subTaskId: string]: string }>({});
  const [quizResults, setQuizResults] = useState<{ [questionId: string]: 'correct' | 'incorrect' | 'pending' | 'approved' | 'rejected' | null }>({});
  const [quizSubTaskResults, setQuizSubTaskResults] = useState<{ [subTaskId: string]: 'pending' | 'approved' | 'rejected' | null }>({});
  const [quizFeedback, setQuizFeedback] = useState<{ [questionId: string]: string }>({});
  const [quizSubTaskFeedback, setQuizSubTaskFeedback] = useState<{ [subTaskId: string]: string }>({});
  const [canProceed, setCanProceed] = useState(false);
  const [responseStatuses, setResponseStatuses] = useState<{ [questionId: string]: 'pending' | 'approved' | 'rejected' }>({});
  const [unlockedModules, setUnlockedModules] = useState<Set<string>>(new Set(['1'])); // Moduł 1 zawsze odblokowany
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [refreshingQuiz, setRefreshingQuiz] = useState(false);
  const [isPanelHidden, setIsPanelHidden] = useState(false);
  const [checklistChecked, setChecklistChecked] = useState<{ [itemId: string]: boolean }>({});
  const [openDatePickers, setOpenDatePickers] = useState<{ [subTaskId: string]: boolean }>({});
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [courseReadyToComplete, setCourseReadyToComplete] = useState(false);
  const [canCompleteCourse, setCanCompleteCourse] = useState(false);
  const [notification, setNotification] = useState<{ message: string; lessonId: string; questionId: string } | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoSaveTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  
  // Zamknij kalendarze po kliknięciu poza nimi
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.date-picker-container')) {
        setOpenDatePickers({});
      }
    };
    
    if (Object.keys(openDatePickers).length > 0) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDatePickers]);

  // Mobile: blokuj przewijanie tła, gdy otwarty jest "Spis"
  useEffect(() => {
    // Guard: only lock scroll on mobile widths
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop) {
      if (isMobileNavOpen) setIsMobileNavOpen(false);
      return;
    }

    if (!isMobileNavOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;

    // Lock scroll without jumping (works well on iOS too)
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      const y = body.style.top ? Math.abs(parseInt(body.style.top, 10)) : scrollY;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      window.scrollTo(0, y);
    };
  }, [isMobileNavOpen]);

  // Jeśli użytkownik zmieni rozmiar na desktop, zamknij "Spis" i odblokuj scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (media.matches) setIsMobileNavOpen(false);
    };
    onChange();
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  // Załaduj moduły kursu gdy kurs jest dostępny
  useEffect(() => {
    if (course) {
      const loadedModules = loadCourseModules(course.config_path);
      setModules(loadedModules);
    } else if (!courseLoading) {
      // Jeśli nie ma kursu, użyj domyślnych modułów (fallback)
      setModules(trainingModules);
    }
  }, [course, courseLoading]);

  // Funkcje pomocnicze do pracy z modułami
  const findLessonInModules = (lessonId: string) => {
    for (const module of modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  };

  const getNextLessonInModules = (currentLessonId: string) => {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      
      if (lessonIndex !== -1) {
        if (lessonIndex < module.lessons.length - 1) {
          return module.lessons[lessonIndex + 1];
        }
        if (i < modules.length - 1) {
          return modules[i + 1].lessons[0];
        }
      }
    }
    return null;
  };

  const getPreviousLessonInModules = (currentLessonId: string) => {
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const lessonIndex = module.lessons.findIndex(l => l.id === currentLessonId);
      
      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          return module.lessons[lessonIndex - 1];
        }
        if (i > 0) {
          const prevModule = modules[i - 1];
          return prevModule.lessons[prevModule.lessons.length - 1];
        }
      }
    }
    return null;
  };

  const getTotalLessonsInModules = () => {
    return modules.reduce((sum, module) => sum + module.lessons.length, 0);
  };

  const currentLesson = currentLessonId === 'completion' ? null : findLessonInModules(currentLessonId);
  const currentModule = currentLesson ? modules.find(m => m.id === currentLesson.moduleId) : undefined;
  
  // AUTO-SAVE WYŁĄCZONY - zapis tylko po kliknięciu "Zapisz odpowiedź"
  
  // AUTO-SAVE WYŁĄCZONY - zapis tylko po kliknięciu "Zapisz odpowiedź"
  
  // AUTO-SAVE WYŁĄCZONY - zapis tylko po kliknięciu "Prześlij odpowiedź" dla pytań otwartych

  // Automatyczne przewijanie do góry przy zmianie lekcji i resetowanie checklisty
  useEffect(() => {
    if (currentLessonId && contentRef.current) {
      // Reset checklisty przy zmianie lekcji
      setChecklistChecked({});
      // Użyj requestAnimationFrame dla lepszej synchronizacji z renderem
      requestAnimationFrame(() => {
        // Przewiń główny kontener treści do góry
        if (contentRef.current) {
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Również przewiń całą stronę do góry (na wypadek gdyby kontener nie był scrollowany)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [currentLessonId]);

  // Sprawdź autentykację
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Załaduj postęp z Supabase
  useEffect(() => {
    if (user && course) {
      loadProgress();
      loadUnlockedModules();
      
      // Subskrybuj zmiany w odpowiedziach (dla pytań otwartych i feedbacku)
      const channel = supabase
        .channel('training_responses_changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'training_responses',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            // Odśwież postęp gdy odpowiedź zostanie zweryfikowana LUB gdy dodano feedback
            if (payload.new.status === 'approved' || payload.new.status === 'rejected' || payload.new.admin_feedback) {
              loadProgress();
              loadUnlockedModules();
              
              // Jeśli dodano feedback, pokaż powiadomienie
              if (payload.new.admin_feedback && payload.old?.admin_feedback !== payload.new.admin_feedback) {
                // Sprawdź czy jesteśmy w odpowiedniej lekcji
                const response = payload.new;
                const currentModuleCode = currentLesson ? `modul_${currentLesson.moduleId}` : null;
                if (currentModuleCode === response.module_code && currentLessonId === response.step_code) {
                  // Jesteśmy w tej lekcji - odśwież odpowiedzi
                  handleRefreshQuiz();
                } else {
                  // Nie jesteśmy w tej lekcji - pokaż powiadomienie i przekieruj
                  setNotification({
                    message: `Masz nowy feedback od administratora w lekcji ${response.step_code}.`,
                    lessonId: response.step_code,
                    questionId: response.question_code
                  });
                }
              }
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, course]);

  // Załaduj postęp gdy zmienia się lekcja
  useEffect(() => {
    if (user && course && currentLessonId) {
      loadProgress();
    }
  }, [currentLessonId, user, course]);

  // Sprawdź czy kurs jest gotowy do zakończenia (tylko dla lekcji 6.3 - sprawdź czy summary-q1 i summary-q2 są zatwierdzone)
  useEffect(() => {
    const checkCourseCompletion = async () => {
      if (!user || !course || loading) return;

      try {
        // Sprawdź status kursu
        const { data: certificateData } = await supabase
          .from('course_certificates')
          .select('course_ready_to_complete, course_completed')
          .eq('user_id', user.id)
          .eq('course_id', course.id)
          .maybeSingle();

        const isReadyToComplete = certificateData?.course_ready_to_complete || false;
        const isAlreadyCompleted = certificateData?.course_completed || false;

        // Jeśli kurs jest gotowy do zakończenia lub już zakończony, ustaw flagi
        if (isReadyToComplete || isAlreadyCompleted) {
          setCourseReadyToComplete(true);
          // Jeśli użytkownik już wypełnił formularz, upewnij się, że ekran jest dostępny w menu
          // Nie ustawiaj automatycznie currentLessonId - pozwól użytkownikowi kliknąć w menu
        }

        // Sprawdź, czy jesteśmy w lekcji 6.3 i czy dwa ostatnie pytania są zatwierdzone
        if (currentLessonId === '6.3' && !isAlreadyCompleted && !isReadyToComplete) {
          const { data: finalResponses } = await supabase
            .from('training_responses')
            .select('status, question_code')
            .eq('user_id', user.id)
            .eq('course_id', course.id)
            .eq('step_code', '6.3')
            .in('question_code', ['summary-q1', 'summary-q2']);

          const bothFinalQuestionsApproved = finalResponses?.length === 2 && 
            finalResponses.every(r => r.status === 'approved');

          setCanCompleteCourse(bothFinalQuestionsApproved);
          
          // Zaktualizuj też quizResults i responseStatuses dla tych pytań
          if (finalResponses) {
            finalResponses.forEach(response => {
              if (response.status === 'approved') {
                setQuizResults(prev => ({ ...prev, [response.question_code]: 'approved' }));
                setResponseStatuses(prev => ({ ...prev, [response.question_code]: 'approved' }));
              }
            });
          }
        } else if (currentLessonId !== 'completion') {
          setCanCompleteCourse(false);
        }
      } catch (error) {
        console.error('Błąd sprawdzania ukończenia szkolenia:', error);
      }
    };

    checkCourseCompletion();
  }, [user, course, loading, currentLessonId, responseStatuses]);

  const loadUnlockedModules = async () => {
    if (!user || !course) return;

    try {
      const { data, error } = await supabase
        .from('module_unlocks')
        .select('module_id')
        .eq('user_id', user.id)
        .eq('course_id', course.id);

      if (error) throw error;

      const unlocked = new Set<string>(['1']); // Moduł 1 zawsze odblokowany
      data?.forEach(item => {
        unlocked.add(item.module_id);
      });
      setUnlockedModules(unlocked);
    } catch (error) {
      console.error('Błąd ładowania odblokowanych modułów:', error);
    }
  };

  // Sprawdź czy można przejść dalej
  useEffect(() => {
    if (currentLesson) {
      // Dla lekcji 6.3 - tylko dwa ostatnie pytania (summary-q1, summary-q2) muszą być zatwierdzone
      if (currentLesson.id === '6.3') {
        const finalQuestionsApproved = ['summary-q1', 'summary-q2'].every(questionId => {
          const result = quizResults[questionId];
          return result === 'approved';
        });
        setCanProceed(finalQuestionsApproved);
      } else {
        // Dla innych lekcji - można przejść dalej jeśli:
        // 1. Pytania zamknięte są poprawne LUB przesłane (pending/approved)
        // 2. Pytania otwarte są przesłane (pending/approved) - nie wymagamy zatwierdzenia
        // 3. Podzadania są przesłane (pending/approved) - nie wymagamy zatwierdzenia
        const allQuizSubmitted = currentLesson.quiz.every(q => {
          if (q.type === 'choice') {
            const result = quizResults[q.id];
            // Można przejść dalej jeśli odpowiedź jest poprawna LUB przesłana
            return result === 'correct' || result === 'pending' || result === 'approved';
          } else if (q.type === 'multi-task' && q.subTasks) {
            // Dla zadań z podzadaniami - sprawdź czy wszystkie podzadania są przesłane
            return q.subTasks.every(subTask => {
              const subTaskResult = quizSubTaskResults[subTask.id];
              // Można przejść dalej jeśli podzadanie jest przesłane (pending/approved)
              return subTaskResult === 'pending' || subTaskResult === 'approved';
            });
          } else {
            const result = quizResults[q.id];
            // Dla pytań otwartych - można przejść dalej jeśli są przesłane (pending/approved)
            return result === 'pending' || result === 'approved';
          }
        });
        // Można przejść dalej jeśli wszystkie pytania są przesłane LUB nie ma pytań
        setCanProceed((allQuizSubmitted && currentLesson.quiz.length > 0) || currentLesson.quiz.length === 0);
      }
    }
  }, [currentLesson, quizResults, quizSubTaskResults]);

  const loadProgress = async () => {
    if (!user || !course) return;

    try {
      // Załaduj postęp modułów
      const { data: trainingData, error: trainingError } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id);

      if (trainingError) throw trainingError;

      // Załaduj odpowiedzi quizów
      const { data: responsesData, error: responsesError } = await supabase
        .from('training_responses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id);

      if (responsesError) throw responsesError;
      
      console.log('📥 ŁADOWANIE PROGRESU - Wszystkie odpowiedzi użytkownika:', {
        totalResponses: responsesData?.length || 0,
        responsesFor63: responsesData?.filter(r => r.step_code === '6.3').length || 0,
        responsesFor63Details: responsesData?.filter(r => r.step_code === '6.3') || []
      });

      // Przetwórz dane do lokalnego stanu
      const progressData: TrainingProgress = {};
      
      modules.forEach(module => {
        module.lessons.forEach(lesson => {
          const moduleProgress = trainingData?.find(
            p => p.module_code === `modul_${module.id}` && p.last_step_code === lesson.id
          );
          
          const hasResponses = lesson.quiz.some(q => {
            return responsesData?.some(r => 
              r.module_code === `modul_${module.id}` &&
              r.step_code === lesson.id &&
              r.question_code === q.id
            );
          });

          // Sprawdź czy wszystkie pytania mają odpowiedzi (dla postępu na bieżąco)
          // Postęp jest liczony nawet jeśli odpowiedź jest pending - admin widzi to na bieżąco
          const allQuizSubmitted = lesson.quiz.length > 0 && lesson.quiz.every(q => {
            if (q.type === 'multi-task' && q.subTasks) {
              // Dla zadań z podzadaniami sprawdź czy wszystkie podzadania są przesłane
              return q.subTasks.every(subTask => {
                const subTaskResponse = responsesData?.find(r => 
                  r.module_code === `modul_${module.id}` &&
                  r.step_code === lesson.id &&
                  r.question_code === subTask.id
                );
                // Uznaj za przesłane jeśli jest odpowiedź (pending/approved/rejected)
                return subTaskResponse && subTaskResponse.answer_text;
              });
            } else {
              const response = responsesData?.find(r => 
                r.module_code === `modul_${module.id}` &&
                r.step_code === lesson.id &&
                r.question_code === q.id
              );
              if (!response) return false;
              
              // Dla pytań zamkniętych sprawdź czy odpowiedź jest poprawna LUB przesłana
              if (q.type === 'choice') {
                // Konwertuj odpowiedź na number dla pytań zamkniętych
                const answerValue = Number(response.answer_text);
                const isCorrect = checkQuizAnswer(q, answerValue);
                // Uznaj za przesłane jeśli odpowiedź jest poprawna LUB jest odpowiedź (dla postępu)
                return isCorrect || response.answer_text;
              } else {
                // Dla pytań otwartych - uznaj za przesłane jeśli jest odpowiedź (pending/approved/rejected)
                return response.answer_text && ((response as any).status === 'pending' || (response as any).status === 'approved' || (response as any).status === 'rejected');
              }
            }
          });
          
          // Dla wyświetlania postępu - lekcja jest "ukończona" jeśli wszystkie odpowiedzi są przesłane
          // (nie wymagamy zatwierdzenia dla postępu - admin widzi na bieżąco)
          const allQuizCompleted = allQuizSubmitted;

          // Lekcja jest ukończona jeśli wszystkie quizy są ukończone
          const isCompleted = allQuizCompleted;

          progressData[lesson.id] = {
            completed: isCompleted,
            quizCompleted: allQuizCompleted
          };
        });
      });

      setProgress(progressData);

      // Załaduj odpowiedzi quizów dla aktualnej lekcji
      if (currentLesson) {
        console.log('🔄 Ładowanie odpowiedzi dla lekcji:', currentLesson.id, {
          totalResponses: responsesData?.length || 0,
          responsesForLesson: responsesData?.filter(r => 
            r.module_code === `modul_${currentLesson.moduleId}` &&
            r.step_code === currentLesson.id
          ).length || 0
        });
        
        const lessonResponses: { [questionId: string]: string | number } = {};
        const lessonStatuses: { [questionId: string]: 'pending' | 'approved' | 'rejected' } = {};
        const lessonResults: { [questionId: string]: 'correct' | 'incorrect' | 'pending' | 'approved' | 'rejected' | null } = {};
        
        // Najpierw załaduj wszystkie odpowiedzi dla subTasks
        currentLesson.quiz.forEach(q => {
          if (q.type === 'multi-task' && q.subTasks) {
            q.subTasks.forEach(subTask => {
              const subTaskResponse = responsesData?.find(r => 
                r.module_code === `modul_${currentLesson.moduleId}` &&
                r.step_code === currentLesson.id &&
                r.question_code === subTask.id
              );
              
              if (subTaskResponse && subTaskResponse.answer_text) {
                const subTaskAnswer = String(subTaskResponse.answer_text);
                console.log('✅ ŁADUJĘ odpowiedź dla subTask:', { 
                  subTaskId: subTask.id, 
                  answer: subTaskAnswer,
                  status: (subTaskResponse as any).status
                });
                lessonResponses[subTask.id] = subTaskAnswer;
                
                const subTaskStatus = (subTaskResponse as any).status || 'pending';
                lessonStatuses[subTask.id] = subTaskStatus;
                lessonResults[subTask.id] = subTaskStatus === 'approved' ? 'approved' : subTaskStatus === 'rejected' ? 'rejected' : 'pending';
              } else {
                console.log('❌ Brak odpowiedzi dla subTask:', subTask.id);
              }
            });
          } else {
            const response = responsesData?.find(r => 
              r.module_code === `modul_${currentLesson.moduleId}` &&
              r.step_code === currentLesson.id &&
              r.question_code === q.id
            );
            if (response) {
              // Konwertuj odpowiedź na właściwy typ (number dla choice, string dla open)
              const answerValue = q.type === 'choice' 
                ? Number(response.answer_text) 
                : String(response.answer_text || '');
              lessonResponses[q.id] = answerValue;
              
              // Dla pytań zamkniętych sprawdź czy odpowiedź jest poprawna
              if (q.type === 'choice') {
                const isCorrect = checkQuizAnswer(q, answerValue);
                lessonResults[q.id] = isCorrect ? 'correct' : 'incorrect';
                // Ustaw feedback dla pytań zamkniętych
                if (isCorrect) {
                  setQuizFeedback(prev => ({
                    ...prev,
                    [q.id]: q.feedback || 'Odpowiedź poprawna!'
                  }));
                } else {
                  setQuizFeedback(prev => ({
                    ...prev,
                    [q.id]: q.hint || 'Spróbuj ponownie.'
                  }));
                }
              } else if (q.type === 'open') {
                // Dla pytań otwartych sprawdź status
                const status = (response as any).status || 'pending';
                lessonStatuses[q.id] = status;
                lessonResults[q.id] = status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending';
                
                if ((response as any).admin_feedback) {
                  setQuizFeedback(prev => ({
                    ...prev,
                    [q.id]: (response as any).admin_feedback
                  }));
                }
              }
            }
          }
        });
        
        // Ustaw wszystkie odpowiedzi naraz
        console.log('📦 Ustawiam wszystkie odpowiedzi:', lessonResponses);
        setQuizAnswers(lessonResponses);
        
        // Dla subTasks ustaw w quizSubTaskAnswers
        const subTaskAnswers: { [subTaskId: string]: string } = {};
        const subTaskResults: { [subTaskId: string]: 'pending' | 'approved' | 'rejected' | null } = {};
        const subTaskStatuses: { [subTaskId: string]: 'pending' | 'approved' | 'rejected' } = {};
        
        currentLesson.quiz.forEach(q => {
          if (q.type === 'multi-task' && q.subTasks) {
            q.subTasks.forEach(subTask => {
              const answer = lessonResponses[subTask.id];
              const status = lessonStatuses[subTask.id];
              if (answer !== undefined) {
                subTaskAnswers[subTask.id] = String(answer);
                subTaskResults[subTask.id] = lessonResults[subTask.id] || null;
                if (status) {
                  subTaskStatuses[subTask.id] = status;
                }
              }
            });
          }
        });
        
        if (Object.keys(subTaskAnswers).length > 0) {
          console.log('📦 Ustawiam odpowiedzi subTasks:', subTaskAnswers);
          console.log('📦 Ustawiam wyniki subTasks:', subTaskResults);
          setQuizSubTaskAnswers(subTaskAnswers);
          setQuizSubTaskResults(subTaskResults);
        } else {
          console.warn('⚠️ Brak odpowiedzi subTasks do załadowania - wszystkie pola są puste');
        }
        
        setResponseStatuses(lessonStatuses);
        setQuizResults(lessonResults);
        
        console.log('✅ Zakończono ładowanie odpowiedzi dla lekcji:', currentLesson.id);
      }

      setLoading(false);
    } catch (error) {
      console.error('Błąd ładowania postępu:', error);
      setLoading(false);
    }
  };

  const saveProgress = async (lessonId: string, completed: boolean) => {
    if (!user || !currentLesson || !course) return;

    try {
      const moduleCode = `modul_${currentLesson.moduleId}`;
      
      // Oblicz procent ukończenia modułu
      const moduleLessons = modules.find(m => m.id === currentLesson.moduleId)?.lessons || [];
      const completedLessonsInModule = moduleLessons.filter(l => {
        const prev = progress[l.id];
        return prev?.completed || l.id === lessonId;
      }).length;
      const percentage = Math.round((completedLessonsInModule / moduleLessons.length) * 100);
      
      // Zapisz postęp modułu
      const { error: progressError } = await supabase
        .from('training_progress')
        .upsert({
          user_id: user.id,
          course_id: course.id,
          module_code: moduleCode,
          status: completed && percentage === 100 ? 'completed' : 'in_progress',
          last_step_code: lessonId,
          percentage: percentage,
          completed_at: completed && percentage === 100 ? new Date().toISOString() : null,
          module_completed: completed && percentage === 100,
        }, {
          onConflict: 'user_id,course_id,module_code'
        });

      if (progressError) {
        console.error('Błąd zapisywania postępu:', progressError);
        throw progressError;
      }

      // Sprawdź czy quiz jest ukończony
      const lesson = modules
        .find(m => m.id === currentLesson.moduleId)
        ?.lessons.find(l => l.id === lessonId);
      
      let quizCompleted = false;
      if (lesson && lesson.quiz.length > 0) {
        // Sprawdź czy wszystkie odpowiedzi są zapisane i poprawne/zatwierdzone
        const { data: lessonResponses, error: responsesError } = await supabase
          .from('training_responses')
          .select('*')
          .eq('user_id', user.id)
          .eq('course_id', course.id)
          .eq('module_code', moduleCode)
          .eq('step_code', lessonId);
        
        if (responsesError) {
          console.error('Błąd ładowania odpowiedzi:', responsesError);
        }
        
        quizCompleted = lesson.quiz.every(q => {
          if (q.type === 'multi-task' && q.subTasks) {
            // Dla zadań z podzadaniami sprawdź czy wszystkie podzadania są zatwierdzone
            return q.subTasks.every(subTask => {
              const subTaskResponse = lessonResponses?.find(r => r.question_code === subTask.id);
              return subTaskResponse && (subTaskResponse as any).status === 'approved';
            });
          } else {
            const response = lessonResponses?.find(r => r.question_code === q.id);
            if (!response) return false;
            
            if (q.type === 'choice') {
              // Konwertuj odpowiedź na number dla pytań zamkniętych
              const answerValue = Number(response.answer_text);
              const isCorrect = checkQuizAnswer(q, answerValue);
              return isCorrect;
            } else {
              return (response as any).status === 'approved';
            }
          }
        });
      } else {
        // Jeśli nie ma quizu, uznaj za ukończone
        quizCompleted = true;
      }

      // Jeśli wszystkie quizy są ukończone, lekcja jest ukończona
      const finalCompleted = completed && quizCompleted;

      // Zaktualizuj lokalny stan
      setProgress(prev => ({
        ...prev,
        [lessonId]: {
          ...prev[lessonId],
          completed: finalCompleted,
          quizCompleted,
        }
      }));
      
      // Log dla debugowania
      console.log('✅ Zapisano postęp:', { lessonId, completed: finalCompleted, quizCompleted, hasQuiz: lesson?.quiz.length > 0 });
      
      // Odśwież odblokowane moduły
      await loadUnlockedModules();
    } catch (error) {
      console.error('Błąd zapisywania postępu:', error);
    }
  };

  const saveQuizResponse = async (questionId: string, answer: string | number, status: 'pending' | 'approved' = 'pending', subTaskId?: string) => {
    if (!user || !currentLesson || !course) return;

    try {
      const moduleCode = `modul_${currentLesson.moduleId}`;
      const question = currentLesson.quiz.find(q => q.id === questionId);
      
      // Dla pytań zamkniętych automatycznie sprawdź odpowiedź
      let finalStatus = status;
      if (question?.type === 'choice') {
        const isCorrect = checkQuizAnswer(question, answer);
        finalStatus = isCorrect ? 'approved' : 'pending';
      }
      
      // Dla podzadań używamy subTaskId jako question_code
      const questionCode = subTaskId || questionId;
      
      console.log('💾 Próba zapisania odpowiedzi:', {
        questionId,
        subTaskId,
        questionCode,
        moduleCode,
        stepCode: currentLesson.id,
        answer,
        status: finalStatus,
        userId: user.id
      });
      
      const { data, error } = await supabase
        .from('training_responses')
        .upsert({
          user_id: user.id,
          course_id: course.id,
          module_code: moduleCode,
          step_code: currentLesson.id,
          question_code: questionCode,
          answer_text: String(answer),
          status: finalStatus,
        }, {
          onConflict: 'user_id,course_id,module_code,step_code,question_code'
        })
        .select();

      if (error) {
        console.error('❌ Błąd zapisywania odpowiedzi:', error);
        throw error;
      }

      // Log dla debugowania
      console.log('✅ Zapisano odpowiedź:', { questionId, subTaskId, questionCode, answer, finalStatus, data });

      // Zaktualizuj lokalny stan
      if (subTaskId) {
        // Dla podzadań
        setQuizSubTaskResults(prev => ({ ...prev, [subTaskId]: finalStatus === 'approved' ? 'approved' : finalStatus === 'rejected' ? 'rejected' : 'pending' }));
      } else if (question?.type === 'open') {
        // Dla zwykłych pytań otwartych
        setResponseStatuses(prev => ({ ...prev, [questionId]: finalStatus }));
        setQuizResults(prev => ({ ...prev, [questionId]: finalStatus === 'approved' ? 'approved' : finalStatus === 'rejected' ? 'rejected' : 'pending' }));
      }
    } catch (error) {
      console.error('Błąd zapisywania odpowiedzi:', error);
    }
  };

  const handleQuizAnswer = (questionId: string, answer: string | number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkQuizAnswer = (question: QuizQuestion, answer: string | number): boolean => {
    if (question.type === 'choice') {
      return answer === question.correctAnswer;
    } else if (question.type === 'open') {
      const answerStr = String(answer).toLowerCase();
      return question.keywords?.some(keyword => 
        answerStr.includes(keyword.toLowerCase())
      ) || false;
    }
    return false;
  };

  const handleCheckSingleAnswer = async (questionId: string) => {
    if (!currentLesson) return;

    const question = currentLesson.quiz.find(q => q.id === questionId);
    if (!question) return;

    const answer = quizAnswers[questionId];
    if (answer === undefined || answer === '') {
      return;
    }

    if (question.type === 'choice') {
      // Pytania zamknięte - sprawdź od razu
      const isCorrect = checkQuizAnswer(question, answer);
      const result = isCorrect ? 'correct' : 'incorrect';
      
      // Zapisuj odpowiedź (zarówno poprawną jak i niepoprawną)
      await saveQuizResponse(questionId, answer, isCorrect ? 'approved' : 'pending');
      
      // Ustaw wynik i feedback
      setQuizResults(prev => ({ ...prev, [questionId]: result }));
      if (isCorrect) {
        setQuizFeedback(prev => ({ ...prev, [questionId]: question.feedback || 'Odpowiedź poprawna!' }));
      } else {
        setQuizFeedback(prev => ({ ...prev, [questionId]: question.hint || 'Spróbuj ponownie.' }));
      }
    }
  };

  const handleCheckQuiz = async () => {
    if (!currentLesson) return;

    const newResults: { [questionId: string]: 'correct' | 'incorrect' | 'pending' | null } = {};
    const newFeedback: { [questionId: string]: string } = {};

    for (const question of currentLesson.quiz) {
      const answer = quizAnswers[question.id];
      if (answer === undefined || answer === '') {
        newResults[question.id] = null;
        continue;
      }

      if (question.type === 'choice') {
        // Pytania zamknięte - sprawdź od razu
        const isCorrect = checkQuizAnswer(question, answer);
        newResults[question.id] = isCorrect ? 'correct' : 'incorrect';
        
        // Zawsze zapisuj odpowiedź (zarówno poprawną jak i niepoprawną)
        await saveQuizResponse(question.id, answer, isCorrect ? 'approved' : 'pending');
        
        if (isCorrect) {
          newFeedback[question.id] = question.feedback || 'Odpowiedź poprawna!';
        } else {
          newFeedback[question.id] = question.hint || 'Spróbuj ująć to inaczej.';
        }
      } else if (question.type === 'open') {
        // Pytania otwarte - zapisz jako pending
        newResults[question.id] = 'pending';
        newFeedback[question.id] = 'Odpowiedź została przesłana i oczekuje na weryfikację.';
        await saveQuizResponse(question.id, answer, 'pending');
      }
    }

    setQuizResults(newResults);
    setQuizFeedback(newFeedback);

    // Sprawdź czy wszystkie odpowiedzi są poprawne/zatwierdzone
    const allCompleted = currentLesson.quiz.every(q => {
      if (q.type === 'choice') {
        const result = newResults[q.id];
        return result === 'correct';
      } else if (q.type === 'multi-task' && q.subTasks) {
        // Dla zadań z podzadaniami sprawdź czy wszystkie podzadania są zatwierdzone
        return q.subTasks.every(subTask => {
          const subTaskResult = quizSubTaskResults[subTask.id];
          return subTaskResult === 'approved';
        });
      } else {
        const result = newResults[q.id];
        return result === 'pending' || result === 'approved';
      }
    });
    
    // Jeśli wszystkie odpowiedzi są poprawne, automatycznie zapisz postęp lekcji jako ukończoną
    if (allCompleted) {
      // Zapisz postęp lekcji jako ukończoną
      await saveProgress(currentLesson.id, true);
      // Odśwież postęp i odblokowane moduły
      await loadProgress();
      await loadUnlockedModules();
    }
  };

  const handleSubmitOpenAnswer = async (questionId: string) => {
    const answer = quizAnswers[questionId];
    if (!answer || answer === '') return;

    await saveQuizResponse(questionId, answer, 'pending');
    setQuizResults(prev => ({ ...prev, [questionId]: 'pending' }));
    setQuizFeedback(prev => ({ ...prev, [questionId]: 'Odpowiedź została przesłana i oczekuje na weryfikację.' }));
  };

  // Funkcja do automatycznego zatwierdzania odpowiedzi w ćwiczeniach interaktywnych
  const shouldAutoApproveSubTask = (questionId: string, subTaskId: string, answer: string): boolean => {
    if (!currentLesson) return false;
    
    const question = currentLesson.quiz.find(q => q.id === questionId);
    if (!question || question.type !== 'multi-task' || !question.subTasks) return false;
    
    const subTask = question.subTasks.find(st => st.id === subTaskId);
    if (!subTask) return false;
    
    // Jeśli odpowiedź jest pusta, nie zatwierdzamy
    if (!answer || answer.trim() === '') return false;
    
    // Dla pól typu choice - zatwierdzamy automatycznie (użytkownik wybrał opcję)
    if (subTask.fieldType === 'choice') return true;
    
    // Dla pól typu multichoice - zatwierdzamy jeśli wybrano przynajmniej jedną opcję
    if (subTask.fieldType === 'multichoice') {
      const selectedChoices = answer.split(',').filter(c => c);
      return selectedChoices.length > 0;
    }
    
    // Dla pól typu text-multiple - zatwierdzamy jeśli wszystkie pola są wypełnione
    if (subTask.fieldType === 'text-multiple') {
      const answers = answer.split('|||');
      const allFilled = answers.every(a => a && a.trim() !== '');
      return allFilled;
    }
    
    // Dla pozostałych pól (text, textarea, number, url, date) - zatwierdzamy jeśli jest wypełnione
    if (['text', 'textarea', 'number', 'url', 'date'].includes(subTask.fieldType || '')) {
      return answer.trim() !== '';
    }
    
    return false;
  };

  const handleSubmitSubTaskAnswer = async (questionId: string, subTaskId: string) => {
    const answer = quizSubTaskAnswers[subTaskId];
    if (!answer || answer === '') {
      console.warn('⚠️ Próba zapisania pustej odpowiedzi:', { questionId, subTaskId });
      return;
    }

    console.log('💾 Zapisuję odpowiedź na podzadanie:', { 
      questionId, 
      subTaskId, 
      answer, 
      currentLesson: currentLesson?.id,
      userId: user?.id,
      moduleCode: currentLesson ? `modul_${currentLesson.moduleId}` : null,
      stepCode: currentLesson?.id
    });
    
    try {
      // WSZYSTKIE subTasks są automatycznie zatwierdzane (approved) - tylko dwa ostatnie pytania otwarte (summary-q1, summary-q2) wymagają zatwierdzenia
      // Dla wszystkich subTasks ustawiamy status 'approved'
      const status = 'approved';
      
      // Zapisz odpowiedź jako odpowiedź na pytanie z identyfikatorem podzadania
      await saveQuizResponse(questionId, answer, status, subTaskId);
      
      // Wszystkie subTasks są automatycznie zatwierdzane
      setQuizSubTaskResults(prev => ({ ...prev, [subTaskId]: 'approved' }));
      setQuizSubTaskFeedback(prev => ({ ...prev, [subTaskId]: 'Odpowiedź została zapisana i zatwierdzona.' }));
      
      console.log('✅ Odpowiedź na podzadanie zapisana i zatwierdzona:', subTaskId);
      
      // Odśwież dane z bazy natychmiast, żeby upewnić się, że wszystko jest zsynchronizowane
      await loadProgress();
    } catch (error) {
      console.error('❌ BŁĄD zapisywania odpowiedzi subTask:', error);
      alert('Wystąpił błąd podczas zapisywania odpowiedzi. Sprawdź konsolę przeglądarki.');
    }
  };
  
  // BLUR ZAPIS WYŁĄCZONY - zapis tylko po kliknięciu "Zapisz odpowiedź"
  // Funkcja handleSubTaskBlur została usunięta - nie jest już potrzebna

  const handleChangeOpenAnswer = (questionId: string) => {
    // Resetuj status, żeby użytkownik mógł zmienić odpowiedź
    setQuizResults(prev => ({ ...prev, [questionId]: null }));
    setResponseStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[questionId];
      return newStatuses;
    });
    setQuizFeedback(prev => {
      const newFeedback = { ...prev };
      delete newFeedback[questionId];
      return newFeedback;
    });
  };

  const handleChangeSubTaskAnswer = (subTaskId: string) => {
    // Resetuj status podzadania, żeby użytkownik mógł zmienić odpowiedź
    setQuizSubTaskResults(prev => ({ ...prev, [subTaskId]: null }));
    setQuizSubTaskFeedback(prev => {
      const newFeedback = { ...prev };
      delete newFeedback[subTaskId];
      return newFeedback;
    });
  };

  const handleRetryAnswer = (questionId: string) => {
    // Resetuj status odpowiedzi, żeby użytkownik mógł spróbować ponownie
    setQuizResults(prev => ({ ...prev, [questionId]: null }));
    setQuizFeedback(prev => {
      const newFeedback = { ...prev };
      delete newFeedback[questionId];
      return newFeedback;
    });
    // Opcjonalnie: zresetuj też wybraną odpowiedź
    // setQuizAnswers(prev => ({ ...prev, [questionId]: undefined }));
  };

  const handleNext = async () => {
    if (!currentLesson) return;

    // Upewnij się, że wszystkie odpowiedzi są zapisane
    // Sprawdź czy wszystkie odpowiedzi są poprawne/zatwierdzone
    const allCompleted = currentLesson.quiz.every(q => {
      if (q.type === 'choice') {
        const result = quizResults[q.id];
        return result === 'correct';
      } else if (q.type === 'multi-task' && q.subTasks) {
        // Dla zadań z podzadaniami sprawdź czy wszystkie podzadania są zatwierdzone
        return q.subTasks.every(subTask => {
          const subTaskResult = quizSubTaskResults[subTask.id];
          return subTaskResult === 'approved';
        });
      } else {
        const result = quizResults[q.id];
        return result === 'pending' || result === 'approved';
      }
    });

    if (!allCompleted && currentLesson.quiz.length > 0) {
      // Jeśli nie wszystkie odpowiedzi są ukończone, nie pozwól przejść dalej
      return;
    }

    // Zapisz jako ukończoną
    await saveProgress(currentLesson.id, true);
    // Odśwież postęp
    await loadProgress();
    await loadUnlockedModules();

    const nextLesson = getNextLessonInModules(currentLesson.id);
    if (nextLesson) {
      await ensureModuleUnlocked(nextLesson.moduleId);
      setCurrentLessonId(nextLesson.id);
      setQuizAnswers({});
      setQuizSubTaskAnswers({});
      setQuizResults({});
      setQuizSubTaskResults({});
      setQuizFeedback({});
      setQuizSubTaskFeedback({});
      setCanProceed(false);
      // Załaduj postęp dla nowej lekcji
      await loadProgress();
      // Przewijanie do góry jest obsługiwane przez useEffect przy zmianie currentLessonId
    }
  };

  const handlePrevious = async () => {
    if (!currentLesson) return;
    const prevLesson = getPreviousLessonInModules(currentLesson.id);
    if (prevLesson) {
      setCurrentLessonId(prevLesson.id);
      setQuizAnswers({});
      setQuizSubTaskAnswers({});
      setQuizResults({});
      setQuizSubTaskResults({});
      setQuizFeedback({});
      setQuizSubTaskFeedback({});
      setCanProceed(false);
      await loadProgress();
      // Przewijanie do góry jest obsługiwane przez useEffect przy zmianie currentLessonId
    }
  };

  const handleCompleteCourse = async () => {
    if (!user || !currentLesson || !course) return;

    try {
      // Oznacz kurs jako gotowy do zakończenia
      const { error: updateError } = await supabase
        .from('course_certificates')
        .upsert({
          user_id: user.id,
          course_id: course.id,
          course_ready_to_complete: true,
          email: user.email || ''
        }, {
          onConflict: 'user_id,course_id'
        });

      if (updateError) {
        console.error('Błąd oznaczania kursu jako gotowy:', updateError);
        alert('Wystąpił błąd podczas zakończenia szkolenia. Spróbuj ponownie.');
        return;
      }

      // Ustaw postęp na 100% - oznacz wszystkie lekcje jako ukończone
      for (const module of modules) {
        for (const lesson of module.lessons) {
          if (!progress[lesson.id]?.completed) {
            await saveProgress(lesson.id, true);
          }
        }
      }
      
      // Pokaż ekran końcowy - ustaw currentLessonId na 'completion' i flagi
      setCurrentLessonId('completion');
      setCourseReadyToComplete(true);
      setShowCompletionScreen(true);
      
      // Odśwież postęp po ustawieniu flag (ale nie resetuj currentLessonId)
      await loadProgress();
    } catch (error) {
      console.error('Błąd zakończenia kursu:', error);
      alert('Wystąpił błąd podczas zakończenia kursu. Spróbuj ponownie.');
    }
  };

  const handleRefreshQuiz = async () => {
    if (!currentLesson || !user || !course) return;
    
    setRefreshingQuiz(true);
    try {
      // Pobierz aktualne odpowiedzi z bazy dla bieżącej lekcji
      const { data: responsesData, error: responsesError } = await supabase
        .from('training_responses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', course.id)
        .eq('module_code', `modul_${currentLesson.moduleId}`)
        .eq('step_code', currentLesson.id);

      if (responsesError) throw responsesError;

      // Zaktualizuj stan odpowiedzi
      const updatedAnswers: { [questionId: string]: string | number } = {};
      const updatedSubTaskAnswers: { [subTaskId: string]: string } = {};
      const updatedResults: { [questionId: string]: 'correct' | 'incorrect' | 'pending' | 'approved' | 'rejected' | null } = {};
      const updatedSubTaskResults: { [subTaskId: string]: 'pending' | 'approved' | 'rejected' | null } = {};
      const updatedStatuses: { [questionId: string]: 'pending' | 'approved' | 'rejected' } = {};
      const updatedFeedback: { [questionId: string]: string } = {};
      const updatedSubTaskFeedback: { [subTaskId: string]: string } = {};

      currentLesson.quiz.forEach(q => {
        if (q.type === 'multi-task' && q.subTasks) {
          // Dla zadań z podzadaniami - załaduj odpowiedzi dla każdego podzadania
          q.subTasks.forEach(subTask => {
            const subTaskResponse = responsesData?.find(r => r.question_code === subTask.id);
            if (subTaskResponse) {
              const subTaskAnswer = String(subTaskResponse.answer_text || '');
              updatedSubTaskAnswers[subTask.id] = subTaskAnswer;
              
              const subTaskStatus = subTaskResponse.status || 'pending';
              updatedSubTaskResults[subTask.id] = subTaskStatus === 'approved' ? 'approved' : subTaskStatus === 'rejected' ? 'rejected' : 'pending';
              
              if (subTaskResponse.admin_feedback) {
                updatedSubTaskFeedback[subTask.id] = subTaskResponse.admin_feedback;
              }
            }
          });
        } else {
          const response = responsesData?.find(r => r.question_code === q.id);
          if (response) {
            // Konwertuj odpowiedź na właściwy typ
            const answerValue = q.type === 'choice' 
              ? Number(response.answer_text) 
              : String(response.answer_text || '');
            updatedAnswers[q.id] = answerValue;

            // Dla pytań zamkniętych sprawdź czy odpowiedź jest poprawna
            if (q.type === 'choice') {
              const isCorrect = checkQuizAnswer(q, answerValue);
              updatedResults[q.id] = isCorrect ? 'correct' : 'incorrect';
              if (isCorrect) {
                updatedFeedback[q.id] = q.feedback || 'Odpowiedź poprawna!';
              } else {
                updatedFeedback[q.id] = q.hint || 'Spróbuj ponownie.';
              }
            } else {
              // Dla pytań otwartych sprawdź status
              const status = response.status || 'pending';
              updatedStatuses[q.id] = status;
              updatedResults[q.id] = status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending';
              
              if (response.admin_feedback) {
                updatedFeedback[q.id] = response.admin_feedback;
              }
            }
          }
        }
      });

      // Zaktualizuj stan
      setQuizAnswers(prev => ({ ...prev, ...updatedAnswers }));
      setQuizSubTaskAnswers(prev => ({ ...prev, ...updatedSubTaskAnswers }));
      setQuizResults(prev => ({ ...prev, ...updatedResults }));
      setQuizSubTaskResults(prev => ({ ...prev, ...updatedSubTaskResults }));
      setResponseStatuses(prev => ({ ...prev, ...updatedStatuses }));
      setQuizFeedback(prev => ({ ...prev, ...updatedFeedback }));
      setQuizSubTaskFeedback(prev => ({ ...prev, ...updatedSubTaskFeedback }));

      // Sprawdź czy wszystkie odpowiedzi są poprawne/zatwierdzone
      const allCompleted = currentLesson.quiz.every(q => {
        const result = updatedResults[q.id];
        if (q.type === 'choice') {
          return result === 'correct';
        } else {
          return result === 'approved';
        }
      });

      // Jeśli wszystkie odpowiedzi są poprawne, zaktualizuj postęp
      if (allCompleted) {
        await saveProgress(currentLesson.id, true);
        await loadProgress();
        await loadUnlockedModules();
      }

      console.log('Quiz odświeżony - zaktualizowano statusy odpowiedzi');
    } catch (error) {
      console.error('Błąd odświeżania quizu:', error);
    } finally {
      setRefreshingQuiz(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    setPasswordLoading(true);

    // Walidacja
    if (newPassword.length < 6) {
      setPasswordError('Hasło musi mieć co najmniej 6 znaków.');
      setPasswordLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('Hasła nie są identyczne.');
      setPasswordLoading(false);
      return;
    }

    // Zmiana hasła
    const { error } = await updatePassword(newPassword);

    if (error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('same') || errorMessage.includes('identical')) {
        setPasswordError('Nowe hasło musi być inne niż obecne.');
      } else if (errorMessage.includes('weak')) {
        setPasswordError('Hasło jest zbyt słabe. Użyj silniejszego hasła.');
      } else {
        setPasswordError(`Wystąpił błąd: ${error.message}. Spróbuj ponownie.`);
      }
      setPasswordLoading(false);
    } else {
      setPasswordSuccess('Hasło zostało zmienione pomyślnie!');
      setNewPassword('');
      setConfirmNewPassword('');
      setPasswordLoading(false);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(null);
      }, 2000);
    }
  };

  const handleLessonClick = async (lessonId: string) => {
    // Sprawdź czy lekcja jest dostępna przed przejściem
    const lesson = findLessonInModules(lessonId);
    if (!lesson) return;
    
    if (!isLessonAvailable(lessonId)) {
      return;
    }

    await ensureModuleUnlocked(lesson.moduleId);
    
    // Jeśli lekcja jest dostępna, przejdź do niej
    setCurrentLessonId(lessonId);
    setQuizAnswers({});
    setQuizResults({});
    setQuizFeedback({});
    setCanProceed(false);
    loadProgress();
  };

  const getCompletedLessonsCount = (): number => {
    return Object.values(progress).filter(p => p.completed).length;
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress[lessonId]?.completed || false;
  };

  if (authLoading || loading || courseLoading) {
    return <LoadingState variant="fullscreen" label="Ładowanie kursu…" />;
  }

  if (!user) {
    return null;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-white text-sm">Brak przypisanego kursu. Skontaktuj się z administratorem.</div>
      </div>
    );
  }

  const totalLessons = getTotalLessonsInModules();
  const completedLessons = getCompletedLessonsCount();
  const isCourseEffectivelyComplete = courseReadyToComplete || showCompletionScreen || currentLessonId === 'completion' || canCompleteCourse;
  const displayCompletedLessons = isCourseEffectivelyComplete ? totalLessons : completedLessons;
  const displayCompletionPercent = totalLessons > 0 ? Math.round((displayCompletedLessons / totalLessons) * 100) : 0;

  // Sprawdź które lekcje są dostępne (można kliknąć)
  const isLessonAvailable = (lessonId: string): boolean => {
    if (lessonId === currentLessonId) return true;

    const lesson = findLessonInModules(lessonId);
    if (!lesson) return false;

    // Jeśli moduł jest odblokowany, wszystkie jego lekcje są dostępne
    return isModuleAccessible(lesson.moduleId);
  };

  // Sprawdź czy moduł jest odblokowany
  const isModuleAccessible = (moduleId: string): boolean => {
    if (unlockedModules.has(moduleId)) return true;

    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return false;

    const module = modules[moduleIndex];
    if (module.lessons.some(lesson => progress[lesson.id]?.completed)) {
      return true;
    }

    // Jeśli wszystkie poprzednie moduły są ukończone, odblokuj ten moduł
    for (let i = 0; i < moduleIndex; i++) {
      const prevModule = modules[i];
      const prevCompleted = prevModule.lessons.every(lesson => progress[lesson.id]?.completed);
      if (!prevCompleted) return false;
    }

    return true;
  };

  const ensureModuleUnlocked = async (moduleId: string) => {
    if (!user || !course) return;
    if (unlockedModules.has(moduleId)) return;

    // Od razu odblokuj lokalnie, żeby UI było responsywne
    setUnlockedModules(prev => new Set(prev).add(moduleId));

    const { error } = await supabase.from('module_unlocks').insert({
      user_id: user.id,
      course_id: course.id,
      module_id: moduleId,
      unlocked_by: 'system'
    });

    if (error && error.code !== '23505') {
      console.error('Błąd odblokowania modułu:', error);
    }
  };


  // Obsługa powiadomienia o feedbacku
  const handleNotificationClick = () => {
    if (notification) {
      setCurrentLessonId(notification.lessonId);
      setNotification(null);
      // Przewiń do pytania z feedbackiem (opcjonalnie)
      setTimeout(() => {
        const questionElement = document.getElementById(`question-${notification.questionId}`);
        if (questionElement) {
          questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  };

  const sidebarBody = (
    <div className="p-4 md:p-6 space-y-5 md:space-y-6">
      {modules.map((module) => {
        const moduleLessons = module.lessons;
        const completedModuleLessons = moduleLessons.filter(l => isLessonCompleted(l.id)).length;
        const moduleProgress = (completedModuleLessons / moduleLessons.length) * 100;
        const isModuleUnlocked = isModuleAccessible(module.id);

        return (
          <div key={module.id} className="mb-8">
            {/* Nagłówek modułu */}
            <div
              className={`flex items-center gap-3 mb-3 md:mb-4 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border transition-all duration-300 ${
                isModuleUnlocked ? 'bg-white/5 border-white/10' : 'bg-white/5 border-gray-700/50 opacity-60'
              }`}
            >
              {!isModuleUnlocked && (
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg border ${
                  isModuleUnlocked
                    ? 'bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border-[#fee715]/30'
                    : 'bg-gray-700/30 border-gray-600/50'
                }`}
              >
                <div className={isModuleUnlocked ? 'text-[#fee715]' : 'text-gray-500'}>{getIcon(module.icon)}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-[Montserrat] font-bold text-xs md:text-sm truncate ${isModuleUnlocked ? 'text-white' : 'text-gray-500'}`}>
                  Moduł {module.id}
                </h3>
                <p className={`text-[11px] md:text-xs leading-tight truncate ${isModuleUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                  {module.title}
                </p>
              </div>
              <div className={`text-[11px] md:text-xs ${isModuleUnlocked ? 'text-gray-500' : 'text-gray-600'}`}>
                {completedModuleLessons}/{moduleLessons.length}
              </div>
            </div>

            {/* Pasek postępu modułu (mobile-first, bez zmiany desktop) */}
            <div className="mb-3 px-4">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] transition-all duration-500"
                  style={{ width: `${isModuleUnlocked ? moduleProgress : 0}%` }}
                />
              </div>
            </div>

            {/* Lista lekcji */}
            <div className="space-y-2">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === currentLessonId;
                const isCompleted =
                  isLessonCompleted(lesson.id) ||
                  courseReadyToComplete ||
                  showCompletionScreen ||
                  currentLessonId === 'completion' ||
                  canCompleteCourse;
                const isAvailable = isModuleUnlocked && isLessonAvailable(lesson.id);
                const isLocked = !isAvailable && !isActive;

                return (
                  <button
                    key={lesson.id}
                    onClick={async () => {
                      await handleLessonClick(lesson.id);
                      setIsMobileNavOpen(false);
                    }}
                    disabled={isLocked}
                    className={`
                      w-full text-left px-4 md:px-5 py-2.5 md:py-3 rounded-xl transition-all duration-300 relative
                      ${isActive
                        ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-semibold shadow-lg shadow-[#fee715]/30 transform scale-[1.02]'
                        : isCompleted
                        ? 'bg-[#00C9A7]/10 border-2 border-[#00C9A7]/30 text-[#00C9A7] hover:bg-[#00C9A7]/20 hover:border-[#00C9A7]/50'
                        : isAvailable
                        ? 'bg-white/5 border-2 border-transparent text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20'
                        : 'bg-white/5 border-2 border-transparent text-gray-500 opacity-60 cursor-not-allowed'
                      }
                      ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#00C9A7] flex items-center justify-center">
                          <svg className="w-3 h-3 text-[#101820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : isLocked ? (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-400" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {lesson.id} {lesson.title}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Ekran końcowy kursu */}
      {courseReadyToComplete && (
        <div className="mt-8 pt-8 border-t border-white/10">
          <button
            onClick={() => {
              setCurrentLessonId('completion');
              setShowCompletionScreen(true);
              setCourseReadyToComplete(true);
              setIsMobileNavOpen(false);
            }}
            className={`
              w-full text-left px-5 py-3 rounded-xl transition-all duration-300 relative
              ${currentLessonId === 'completion'
                ? 'bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-semibold shadow-lg shadow-[#fee715]/30 transform scale-[1.02]'
                : 'bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border-2 border-[#fee715]/30 text-[#fee715] hover:bg-gradient-to-r hover:from-[#fee715]/30 hover:to-[#00C9A7]/30'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fee715] flex items-center justify-center">
                <svg className="w-3 h-3 text-[#101820]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Zakończenie szkolenia</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={embedded ? "bg-[#101820] text-white" : "min-h-screen bg-[#101820] text-white"}>
      
      {/* Powiadomienie o feedbacku */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] rounded-xl p-4 shadow-2xl max-w-md animate-slide-in">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="flex-1">
              <p className="font-bold mb-1">Nowy feedback!</p>
              <p className="text-sm">{notification.message}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNotificationClick}
                className="px-4 py-2 bg-[#101820] hover:bg-[#101820]/90 rounded-lg font-semibold text-sm transition-colors"
              >
                Przejdź
              </button>
              <button
                onClick={() => setNotification(null)}
                className="px-2 py-2 hover:bg-[#101820]/20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header z postępem - przeprojektowany (tylko gdy nie embedded) */}
      {!embedded && !isPanelHidden && (
        <div className="sticky top-0 z-40 bg-gradient-to-b from-[#101820] via-[#101820]/98 to-[#101820]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
          <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
            {/* Mobile header */}
            <div className="md:hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Kurs</div>
                  <div className="font-[Montserrat] font-bold text-base leading-snug truncate">
                    <span className="bg-gradient-to-r from-[#fee715] via-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                      Social Boost
                    </span>
                  </div>
                  {currentLesson && (
                    <div className="mt-1 text-sm text-gray-300 truncate">
                      Lekcja <span className="text-[#fee715] font-semibold">{currentLesson.id}</span> - {currentLesson.title}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {standalone && (
                    <button
                      onClick={() => navigate('/panel/courses')}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-gray-300"
                      title="Zamknij i wróć do listy kursów"
                      aria-label="Zamknij"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileNavOpen(true)}
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-sm font-[Montserrat] font-semibold text-gray-200"
                    aria-label="Otwórz spis treści"
                  >
                    Spis
                  </button>
                  <UserMenu onPasswordChange={() => setShowPasswordModal(true)} onProfileClick={() => navigate('/profile')} />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Postęp</span>
                  <span className="text-gray-300 font-semibold">
                    {displayCompletedLessons}/{totalLessons} • {displayCompletionPercent}%
                  </span>
                </div>
                <div className="relative bg-white/10 rounded-full h-2 overflow-hidden shadow-inner">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fee715] via-[#fee715] to-[#00C9A7] rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${displayCompletionPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop header (bez zmian w układzie) */}
            <div className="hidden md:block">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="font-[Montserrat] text-lg md:text-xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-[#fee715] via-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                      Social Boost: Sztuka Marketingu Online
                    </span>
                  </h1>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30">
                        <svg className="w-5 h-5 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Postęp kursu</div>
                        <div className="text-lg font-[Montserrat] font-bold text-white">
                          {displayCompletedLessons} <span className="text-gray-400 font-normal">/ {totalLessons} lekcji</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 max-w-md">
                      <div className="relative bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fee715] via-[#fee715] to-[#00C9A7] rounded-full transition-all duration-500 shadow-lg"
                          style={{ width: `${displayCompletionPercent}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2 text-right">
                        {displayCompletionPercent}% ukończone
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex items-center gap-3">
                  {standalone ? (
                    <button
                      onClick={() => navigate('/panel/courses')}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-sm font-[Montserrat] font-semibold text-gray-300 hover:text-white flex items-center gap-2"
                      title="Zamknij i wróć do listy kursów"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Zamknij
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsPanelHidden(true)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-sm font-[Montserrat] font-semibold text-gray-300 hover:text-white flex items-center gap-2"
                      title="Tryb pełnego ekranu"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l-5 5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      Tryb pełnego ekranu
                    </button>
                  )}
                  <UserMenu onPasswordChange={() => setShowPasswordModal(true)} onProfileClick={() => navigate('/profile')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: drawer ze spisem treści (tylko gdy nie embedded) */}
      {!embedded && isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Zamknij spis treści"
          />
          <div className="absolute inset-x-0 bottom-0 h-[92vh] bg-gradient-to-b from-[#18232F] to-[#101820] border-t border-white/10 rounded-t-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Spis treści</div>
                <div className="font-[Montserrat] font-bold text-white">Moduły i lekcje</div>
              </div>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300"
                aria-label="Zamknij"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] touch-pan-y">
              {sidebarBody}
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-col md:flex-row ${embedded ? '' : isPanelHidden ? 'md:h-screen' : 'md:h-[calc(100vh-180px)]'}`}>
        {/* Sidebar - desktop (tylko gdy nie embedded), mobile ukryty */}
        {!embedded && (
        <div
          className={`hidden md:block w-72 md:w-80 bg-gradient-to-b from-[#18232F] to-[#101820] border-r border-white/10 overflow-y-auto ${
            isPanelHidden ? 'h-screen' : ''
          }`}
        >
          {/* Button to show header when hidden - in sidebar */}
          {isPanelHidden && (
            <div className="p-4 border-b border-white/10">
              <button
                onClick={() => setIsPanelHidden(false)}
                className="w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Pokaż pasek górny
              </button>
            </div>
          )}
          {sidebarBody}
        </div>
        )}

        {/* Główny obszar treści - przeprojektowany */}
        <div ref={contentRef} className="flex-1 md:overflow-y-auto bg-gradient-to-b from-[#101820] to-[#0B1218]">
          {currentLessonId === 'completion' ? (
            <CourseCompletionScreen 
              onComplete={async () => {
                // Po zakończeniu odśwież postęp - ekran pozostaje widoczny
                await loadProgress();
              }}
            />
          ) : currentLesson && currentModule ? (
            <div className={`container mx-auto px-4 md:px-12 py-6 md:py-10 max-w-5xl ${
              // Większy dolny padding, gdy mamy przyklejony pasek nawigacji (mobile zawsze, desktop w trybie standalone),
              // żeby przyciski „Wstecz/Dalej” nie zasłaniały treści lekcji.
              standalone ? 'pb-40 md:pb-40' : 'pb-32 md:pb-10'
            }`}>
              {/* Karta lekcji z lepszym designem */}
              <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Nagłówek lekcji z gradientem */}
                <div className="bg-gradient-to-r from-[#fee715]/10 via-[#00C9A7]/10 to-[#fee715]/10 border-b border-white/10 px-4 md:px-8 py-5 md:py-6">
                  <div className="flex items-center gap-3 mb-3 min-w-0">
                    <div className="flex-shrink-0 px-3 py-1 rounded-lg bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30">
                      <span className="text-xs font-[Montserrat] font-bold text-[#fee715] uppercase tracking-wide whitespace-nowrap">
                        Moduł {currentModule.id}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 min-w-0 truncate">{currentModule.title}</span>
                  </div>
                  <h2 className="font-[Montserrat] text-xl md:text-2xl font-bold text-white leading-tight">
                    <span className="text-[#fee715]">{currentLesson.id}</span> {currentLesson.title}
                  </h2>
                </div>

                {/* Treść lekcji z lepszymi odstępami */}
                <div className="px-4 md:px-8 py-8 md:py-10 space-y-10">
                  {/* Wprowadzenie */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                      <h3 className="font-[Montserrat] text-base font-bold text-white">
                        Wprowadzenie
                      </h3>
                    </div>
                    <div className="pl-4">
                      <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                        {currentLesson.intro}
                      </div>
                    </div>
                  </section>

                  <div className="border-t border-white/10"></div>

                  {/* Dlaczego to ważne */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                      <h3 className="font-[Montserrat] text-base font-bold text-white">
                        Dlaczego to ważne dla Twojej firmy
                      </h3>
                    </div>
                    <div className="pl-4">
                      {Array.isArray(currentLesson.whyImportant) ? (
                        <div className="relative">
                          {/* Linia progresu */}
                          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#fee715] via-[#00C9A7] to-[#fee715] opacity-30"></div>
                          
                          <div className="space-y-6">
                            {currentLesson.whyImportant.map((element, index) => {
                              // Ikony SVG dla whyImportant
                              const getWhyImportantIcon = (iconName: string) => {
                                switch (iconName) {
                                  case 'trust':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                    );
                                  case 'remind':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    );
                                  case 'info-fast':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                      </svg>
                                    );
                                  case 'life':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                      </svg>
                                    );
                                  case 'target':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                      </svg>
                                    );
                                  case 'understand':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                      </svg>
                                    );
                                  case 'time':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    );
                                  case 'data':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                      </svg>
                                    );
                                  case 'organize':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                                      </svg>
                                    );
                                  case 'experience':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    );
                                  case 'trust-story':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                      </svg>
                                    );
                                  case 'decision':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                      </svg>
                                    );
                                  case 'visibility-seo':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    );
                                  case 'target-seo':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                    );
                                  case 'cost-seo':
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    );
                                  default:
                                    return (
                                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                    );
                                }
                              };

                              return (
                                <div key={index} className="relative flex gap-6 group">
                                  {/* Punkt na linii progresu */}
                                  <div className="relative z-10 flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fee715] to-[#00C9A7] flex items-center justify-center shadow-lg shadow-[#fee715]/30 group-hover:scale-110 transition-transform duration-300">
                                      <div className="w-12 h-12 rounded-full bg-[#101820] flex items-center justify-center text-[#fee715]">
                                        {getWhyImportantIcon(element.icon)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Karta z treścią */}
                                  <div className="flex-1 bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border border-white/10 hover:border-[#fee715]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10">
                                    <h4 className="font-[Montserrat] text-xl font-bold text-[#fee715] mb-2">
                                      {element.title}
                                    </h4>
                                    <p className="text-gray-300 text-base leading-relaxed">
                                      {element.description}
                                    </p>
                                    {element.points && element.points.length > 0 && (
                                      <ul className="mt-4 space-y-2">
                                        {element.points.map((point, pointIndex) => (
                                          <li key={pointIndex} className="flex items-start gap-3 text-gray-200 text-base">
                                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00C9A7] mt-2"></div>
                                            <span className="leading-relaxed">{point}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Tekst końcowy */}
                          {currentLesson.whyImportantFooter && (
                            <div className="mt-8 ml-24 bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
                              <p className="text-gray-200 text-base leading-relaxed">
                                {currentLesson.whyImportantFooter}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                          {currentLesson.whyImportant}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Ścieżka klienta */}
                  {currentLesson.customerPath && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Jak wygląda ścieżka klienta w internecie (prosty schemat)
                          </h3>
                        </div>
                        <div className="pl-4">
                          <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
                            <div className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
                              {currentLesson.customerPath}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {/* Scenariusze automatyzacji */}
                  {currentLesson.automationScenarios && currentLesson.automationScenarios.length > 0 && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Automatyzacja – przykładowe scenariusze
                          </h3>
                        </div>
                        {currentLesson.automationScenariosIntro && (
                          <div className="pl-4 mb-6">
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {currentLesson.automationScenariosIntro}
                            </p>
                          </div>
                        )}
                        <div className="pl-4 grid gap-6 md:grid-cols-2">
                          {currentLesson.automationScenarios.map((scenario, index) => {
                            const IconComponent = getIcon(scenario.icon);
                            return (
                              <div
                                key={scenario.id}
                                className="bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#fee715]/10"
                              >
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center">
                                    <div className="text-[#fee715]">
                                      {IconComponent}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h4 className="font-[Montserrat] text-xl font-bold text-white">
                                        {scenario.title}
                                      </h4>
                                    </div>
                                    {scenario.timeline && (
                                      <div className="mb-2">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fee715]/10 border border-[#fee715]/30 rounded-lg text-[#fee715] text-sm font-semibold">
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                          {scenario.timeline}
                                        </span>
                                      </div>
                                    )}
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                      {scenario.description}
                                    </p>
                                  </div>
                                </div>
                                {scenario.points && scenario.points.length > 0 && (
                                  <div className="space-y-2 pl-16">
                                    {scenario.points.map((point, pointIndex) => (
                                      <div key={pointIndex} className="flex items-start gap-2">
                                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#fee715] mt-2"></div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                          {point}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </>
                  )}

                  {/* Analiza problemów - Jak dedukować, co jest nie tak */}
                  {currentLesson.problemAnalyses && currentLesson.problemAnalyses.length > 0 && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Jak „dedukować", co jest nie tak – proste schematy
                          </h3>
                        </div>
                        <div className="pl-4 space-y-6">
                          {currentLesson.problemAnalyses.map((problem, index) => {
                            const IconComponent = getIcon(problem.icon);
                            return (
                              <div
                                key={problem.id}
                                className="bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300"
                              >
                                <div className="flex items-start gap-4 mb-6">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center">
                                    <div className="text-[#fee715]">
                                      {IconComponent}
                                    </div>
                                  </div>
                                  <h4 className="font-[Montserrat] text-xl font-bold text-white flex-1">
                                    {problem.title}
                                  </h4>
                                </div>
                                
                                <div className="space-y-4 pl-16">
                                  {/* Dane */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                      <h5 className="font-[Montserrat] font-semibold text-blue-300 text-sm uppercase tracking-wide">
                                        Dane z kampanii / analityki
                                      </h5>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
                                      {problem.data.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start gap-2">
                                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                                          <p className="text-gray-200 text-sm leading-relaxed">
                                            {item}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Interpretacja */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                      <h5 className="font-[Montserrat] font-semibold text-yellow-300 text-sm uppercase tracking-wide">
                                        Co to może oznaczać
                                      </h5>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 space-y-2">
                                      {problem.interpretation.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start gap-2">
                                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2"></div>
                                          <p className="text-gray-200 text-sm leading-relaxed">
                                            {item}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Rozwiązania */}
                                  <div>
                                    <div className="flex items-center gap-2 mb-3">
                                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                      <h5 className="font-[Montserrat] font-semibold text-green-300 text-sm uppercase tracking-wide">
                                        Co możesz przetestować
                                      </h5>
                                    </div>
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
                                      {problem.solutions.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start gap-2">
                                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></div>
                                          <p className="text-gray-200 text-sm leading-relaxed">
                                            {item}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </>
                  )}

                  {/* Schemat decyzyjny */}
                  {currentLesson.decisionSteps && currentLesson.decisionSteps.length > 0 && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Prosty schemat decyzyjny – jak pracować z danymi
                          </h3>
                        </div>
                        <div className="pl-4">
                          <div className="relative">
                            {/* Linia łącząca kroki */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#fee715] via-[#00C9A7] to-[#fee715] opacity-30"></div>
                            
                            <div className="space-y-6">
                              {currentLesson.decisionSteps.map((step, index) => {
                                const IconComponent = getIcon(step.icon);
                                const isLast = index === currentLesson.decisionSteps!.length - 1;
                                return (
                                  <div key={step.id} className="relative flex items-start gap-4">
                                    {/* Punkt na linii */}
                                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#fee715] to-[#00C9A7] border-4 border-[#101820] flex items-center justify-center shadow-lg">
                                      <span className="font-[Montserrat] font-bold text-[#101820] text-lg">
                                        {step.step}
                                      </span>
                                    </div>
                                    
                                    <div className="flex-1 pt-2">
                                      <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-xl p-6 hover:border-[#fee715]/30 transition-all duration-300">
                                        <div className="flex items-start gap-4 mb-3">
                                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center">
                                            <div className="text-[#fee715]">
                                              {IconComponent}
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="font-[Montserrat] text-xl font-bold text-white mb-2">
                                              {step.title}
                                            </h4>
                                            <p className="text-gray-300 leading-relaxed">
                                              {step.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {/* Opis roli */}
                  {currentLesson.roleDescription && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            {currentLesson.roleDescriptionTitle || 'Jaką rolę pełnią media społecznościowe w strategii marketingowej'}
                          </h3>
                        </div>
                        <div className="pl-4">
                          <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
                            <div className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
                              {currentLesson.roleDescription}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {/* Najważniejsze elementy */}
                  {currentLesson.keyElements && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            {currentLesson.id === '1.1' 
                              ? 'Najważniejsze elementy marketingu online – w pigułce'
                              : currentLesson.id === '1.3'
                              ? 'Podstawowe grupy narzędzi marketingowych'
                              : currentLesson.id === '2.1'
                              ? 'Co sprawia, że treść jest angażująca'
                              : currentLesson.id === '2.2'
                              ? 'Z czego składa się dobra historia marketingowa'
                              : currentLesson.id === '2.3'
                              ? 'Podstawowe elementy SEO w treści'
                              : 'Najważniejsze elementy'}
                          </h3>
                        </div>
                        <div className="pl-4">
                          {Array.isArray(currentLesson.keyElements) ? (
                            <div className="relative">
                              {/* Linia progresu */}
                              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#fee715] via-[#00C9A7] to-[#fee715] opacity-30"></div>
                              
                              <div className="space-y-8">
                                {currentLesson.keyElements.map((element, index) => {
                                  // Ikony SVG
                                  const getIcon = (iconName: string) => {
                                    switch (iconName) {
                                      case 'website':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                          </svg>
                                        );
                                      case 'social':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                          </svg>
                                        );
                                      case 'google':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                          </svg>
                                        );
                                      case 'email':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                          </svg>
                                        );
                                      case 'platforms':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                          </svg>
                                        );
                                      case 'info':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        );
                                      case 'kulisy':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                          </svg>
                                        );
                                      case 'sales':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        );
                                      case 'relacje':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                          </svg>
                                        );
                                      case 'visibility':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                          </svg>
                                        );
                                      case 'campaigns':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                          </svg>
                                        );
                                      case 'analytics':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                          </svg>
                                        );
                                      case 'relationships':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                          </svg>
                                        );
                                      case 'content':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        );
                                      case 'audience':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                          </svg>
                                        );
                                      case 'goal':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        );
                                      case 'benefits':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                          </svg>
                                        );
                                      case 'language':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                          </svg>
                                        );
                                      case 'cta':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                          </svg>
                                        );
                                      case 'hero':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                          </svg>
                                        );
                                      case 'starting-point':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                          </svg>
                                        );
                                      case 'challenge':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                          </svg>
                                        );
                                      case 'solution-story':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        );
                                      case 'result':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                          </svg>
                                        );
                                      case 'cta-story':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                          </svg>
                                        );
                                      case 'keywords':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                          </svg>
                                        );
                                      case 'headings':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                          </svg>
                                        );
                                      case 'meta':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                          </svg>
                                        );
                                      case 'content-seo':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                        );
                                      case 'links':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                          </svg>
                                        );
                                      case 'images-seo':
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                          </svg>
                                        );
                                      default:
                                        return (
                                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                          </svg>
                                        );
                                    }
                                  };

                                  return (
                                    <div key={index} className="relative flex gap-6 group">
                                      {/* Punkt na linii progresu */}
                                      <div className="relative z-10 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fee715] to-[#00C9A7] flex items-center justify-center shadow-lg shadow-[#fee715]/30 group-hover:scale-110 transition-transform duration-300">
                                          <div className="w-12 h-12 rounded-full bg-[#101820] flex items-center justify-center text-[#fee715]">
                                            {getIcon(element.icon)}
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Karta z treścią */}
                                      <div className="flex-1 bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border border-white/10 hover:border-[#fee715]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#fee715]/10">
                                        <h4 className="font-[Montserrat] text-xl font-bold text-[#fee715] mb-2">
                                          {element.title}
                                        </h4>
                                        <p className="text-gray-300 text-base mb-4 leading-relaxed">
                                          {element.description}
                                        </p>
                                        <ul className="space-y-2">
                                          {element.points.map((point, pointIndex) => (
                                            <li key={pointIndex} className="flex items-start gap-3 text-gray-200 text-base">
                                              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00C9A7] mt-2"></div>
                                              <span className="leading-relaxed">{point}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {/* Dodatkowa informacja na końcu - tylko dla lekcji 1.1 */}
                              {currentLesson.id === '1.1' && (
                                <div className="mt-8 ml-24 bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
                                  <p className="text-gray-200 text-base leading-relaxed">
                                    <span className="font-semibold text-[#fee715]">Dlatego warto łączyć je z własnymi kanałami</span> (strona www, social media, e-mail).
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                              {currentLesson.keyElements}
                            </div>
                          )}
                        </div>
                      </section>
                    </>
                  )}

                  {/* Przykłady praktyczne */}
                  {(currentLesson.practicalExamples && currentLesson.practicalExamples.length > 0) || currentLesson.practicalExample ? (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Przykłady praktyczne
                          </h3>
                        </div>
                        <div className="pl-4 space-y-6">
                          {currentLesson.practicalExamples && currentLesson.practicalExamples.length > 0 ? (
                            currentLesson.practicalExamples.map((example, index) => (
                              <div key={index} className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 space-y-4">
                                <h4 className="font-[Montserrat] text-xl font-bold text-[#fee715] mb-3">
                                  {example.title}
                                </h4>
                                <div className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
                                  {example.description}
                                </div>
                                <div className="pt-3 border-t border-[#fee715]/20">
                                  <p className="text-[#00C9A7] font-semibold text-lg">
                                    {example.effect}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : currentLesson.practicalExample ? (
                            <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6">
                              <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
                                {currentLesson.practicalExample}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </section>
                    </>
                  ) : null}

                  {/* Dodatkowe informacje */}
                  {currentLesson.additionalInfo && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            {currentLesson.additionalInfoTitle || 'Czego media społecznościowe NIE robią same z siebie'}
                          </h3>
                        </div>
                        <div className="pl-4">
                          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
                            <div className="text-gray-200 leading-relaxed text-lg whitespace-pre-line">
                              {currentLesson.additionalInfo}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}

                  {/* Checklista */}
                  {currentLesson.checklist && currentLesson.checklist.length > 0 && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-base font-bold text-white">
                            Prosta checklista przed startem kampanii
                          </h3>
                        </div>
                        <div className="pl-4">
                          <div className="bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-xl p-6 space-y-4">
                            <p className="text-gray-300 text-lg mb-6">
                              Przed uruchomieniem reklamy odpowiedz na pytania:
                            </p>
                            <div className="space-y-3">
                              {currentLesson.checklist.map((item, index) => (
                                <div
                                  key={item.id}
                                  onClick={() => setChecklistChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                  className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                                    checklistChecked[item.id]
                                      ? 'bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border-[#fee715]/50 shadow-lg shadow-[#fee715]/20'
                                      : 'bg-white/5 border-white/10 hover:border-[#fee715]/30'
                                  }`}
                                >
                                  <div className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                                    checklistChecked[item.id]
                                      ? 'bg-gradient-to-br from-[#fee715] to-[#00C9A7] border-[#fee715]'
                                      : 'bg-white/5 border-white/30'
                                  }`}>
                                    {checklistChecked[item.id] && (
                                      <svg className="w-4 h-4 text-[#101820] font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className={`font-[Montserrat] text-lg leading-relaxed transition-all duration-300 ${
                                      checklistChecked[item.id]
                                        ? 'text-white font-semibold line-through decoration-[#fee715]/50'
                                        : 'text-gray-300'
                                    }`}>
                                      {index + 1}. {item.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </div>

                {/* Quiz - przeprojektowany */}
                {currentLesson.quiz.length > 0 && (
                <div className="border-t-2 border-white/10 bg-gradient-to-br from-white/5 to-white/3">
                    <div className="px-4 md:px-8 py-7 md:py-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-10 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                        <h3 className="font-[Montserrat] text-3xl font-bold text-white">
                          Mini-quiz
                        </h3>
                      </div>
                      <div className="space-y-8">
                        {currentLesson.quiz.map((question, qIndex) => (
                          <div key={question.id} className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-5 md:p-8 border border-white/10 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center">
                                <span className="font-[Montserrat] font-bold text-[#fee715]">{qIndex + 1}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-[Montserrat] text-xl font-bold text-white leading-relaxed mb-4 whitespace-pre-line">
                                  {question.question}
                                </h4>
                                
                                {/* Specjalne renderowanie dla pytań z obliczeniami */}
                                {question.type === 'open' && question.isCalculation && question.calculationData && question.formula && (
                                  <div className="bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border border-[#fee715]/20 rounded-xl p-6 mb-4">
                                    <div className="space-y-4">
                                      {/* Dane do obliczenia */}
                                      <div>
                                        <h5 className="font-[Montserrat] font-semibold text-[#fee715] mb-3 text-sm uppercase tracking-wide">
                                          Dane:
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          {question.calculationData.map((data, idx) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                                              <p className="text-gray-300 text-sm mb-1">{data.label}</p>
                                              <p className="text-white font-bold text-lg">{data.value.toLocaleString('pl-PL')}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* Wzór */}
                                      <div className="pt-4 border-t border-[#fee715]/20">
                                        <h5 className="font-[Montserrat] font-semibold text-[#00C9A7] mb-2 text-sm uppercase tracking-wide">
                                          Wzór:
                                        </h5>
                                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                          <p className="text-white font-mono text-lg font-semibold">
                                            {question.formula}
                                          </p>
                                        </div>
                                      </div>
                                      
                                      {/* Podpowiedź */}
                                      {question.hint && (
                                        <div className="pt-2">
                                          <p className="text-gray-300 text-sm italic">
                                            💡 {question.hint}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Specjalne renderowanie dla pytań z danymi kampanii Facebook */}
                                {question.campaignData && Array.isArray(question.campaignData) && (
                                  <div className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 mb-6 border border-white/10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {question.campaignData.map((campaign, idx: number) => {
                                        // Kampania B (idx 1) ma lepsze wyniki - używamy zielonego (#00C9A7)
                                        // Kampania A (idx 0) ma gorsze wyniki - używamy bardziej neutralnego koloru
                                        const isBetterCampaign = idx === 1;
                                        return (
                                          <div 
                                            key={idx}
                                            className={`bg-gradient-to-br rounded-xl p-6 border-2 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                                              isBetterCampaign
                                                ? 'from-[#00C9A7]/20 to-[#00C9A7]/10 border-[#00C9A7]/40' 
                                                : 'from-gray-500/20 to-gray-600/20 border-gray-400/30'
                                            }`}
                                          >
                                            <div className="flex items-center justify-between mb-5">
                                              <h5 className={`font-[Montserrat] text-xl font-bold ${
                                                isBetterCampaign ? 'text-[#00C9A7]' : 'text-gray-300'
                                              }`}>
                                                {campaign.name}
                                              </h5>
                                              <div className={`w-3 h-3 rounded-full shadow-lg ${
                                                isBetterCampaign ? 'bg-[#00C9A7]' : 'bg-gray-400'
                                              }`}></div>
                                            </div>
                                            
                                            <div className="space-y-4">
                                              {/* CTR */}
                                              <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                  <span className="text-gray-300 text-sm font-medium uppercase tracking-wide">CTR</span>
                                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                  </svg>
                                                </div>
                                                <p className={`text-3xl font-bold ${
                                                  isBetterCampaign ? 'text-[#00C9A7]' : 'text-gray-300'
                                                }`}>
                                                  {campaign.ctr}
                                                </p>
                                              </div>

                                              {/* Koszt kliknięcia */}
                                              <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                  <span className="text-gray-300 text-sm font-medium uppercase tracking-wide">Koszt kliknięcia</span>
                                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                  </svg>
                                                </div>
                                                <p className={`text-3xl font-bold ${
                                                  isBetterCampaign ? 'text-[#00C9A7]' : 'text-gray-300'
                                                }`}>
                                                  {campaign.costPerClick}
                                                </p>
                                              </div>

                                              {/* Zapytania */}
                                              <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                  <span className="text-gray-300 text-sm font-medium uppercase tracking-wide">Zapytania</span>
                                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                  </svg>
                                                </div>
                                                <p className={`text-2xl font-bold ${
                                                  isBetterCampaign ? 'text-[#00C9A7]' : 'text-gray-300'
                                                }`}>
                                                  {campaign.inquiries}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {question.type === 'choice' && question.options ? (
                              <div className="pl-0 md:pl-14 space-y-4">
                                <div className="space-y-3">
                                  {question.options.map((option, index) => (
                                    <CustomRadio
                                      key={index}
                                      id={`${question.id}-${index}`}
                                      name={question.id}
                                      value={index}
                                      checked={quizAnswers[question.id] === index}
                                      onChange={(value) => handleQuizAnswer(question.id, value)}
                                      label={option}
                                      disabled={quizResults[question.id] === 'correct'}
                                    />
                                  ))}
                                </div>
                                
                                {/* Przycisk sprawdzenia odpowiedzi dla pytań zamkniętych - tylko jeśli odpowiedź nie jest jeszcze sprawdzona */}
                                {!quizResults[question.id] && quizAnswers[question.id] !== undefined && (
                                  <div className="pt-4">
                                    <button
                                      onClick={() => handleCheckSingleAnswer(question.id)}
                                      disabled={quizAnswers[question.id] === undefined || quizAnswers[question.id] === ''}
                                      className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                      Sprawdź odpowiedź
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : question.type === 'multi-task' && question.subTasks ? (
                              <div className="pl-0 md:pl-14 space-y-6">
                                {question.subTasks.map((subTask, subTaskIndex) => {
                                  // Debug: sprawdź stan dla tego podzadania
                                  const currentAnswer = quizSubTaskAnswers[subTask.id];
                                  const currentResult = quizSubTaskResults[subTask.id];
                                  console.log('🎨 Renderowanie podzadania:', {
                                    subTaskId: subTask.id,
                                    currentAnswer,
                                    currentResult,
                                    allAnswers: quizSubTaskAnswers,
                                    allResults: quizSubTaskResults
                                  });
                                  
                                  // Warunek dla pola "Inne" - pokaż tylko jeśli w ex4-1 jest zaznaczona opcja "Inne" (index 4)
                                  if (subTask.id === 'ex4-1-other') {
                                    const ex4_1Answer = quizSubTaskAnswers['ex4-1'] || '';
                                    const selectedChoices = ex4_1Answer.split(',').filter(c => c);
                                    const isOtherSelected = selectedChoices.includes('4'); // "Inne" to ostatnia opcja (index 4)
                                    
                                    if (!isOtherSelected) {
                                      return null; // Nie renderuj pola jeśli "Inne" nie jest zaznaczone
                                    }
                                  }
                                  
                                  return (
                                  <div key={subTask.id} className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border border-white/10">
                                    <div className="mb-4">
                                      <h5 className="font-[Montserrat] text-lg font-bold text-white mb-2">
                                        {subTask.title}
                                      </h5>
                                      <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                                        {subTask.description}
                                      </p>
                                    </div>
                                    {/* Renderowanie różnych typów pól */}
                                    {subTask.fieldType === 'text' && (
                                      <input
                                        type="text"
                                        value={quizSubTaskAnswers[subTask.id] || ''}
                                        onChange={(e) => setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: e.target.value }))}
                                        placeholder={subTask.fieldOptions?.placeholder || "Wpisz odpowiedź..."}
                                        disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                        className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] text-lg transition-all duration-300 ${
                                          quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                            ? 'border-white/20 opacity-70 cursor-not-allowed'
                                            : 'border-white/10'
                                        }`}
                                      />
                                    )}
                                    
                                    {(!subTask.fieldType || subTask.fieldType === 'textarea') && (
                                      <textarea
                                        value={quizSubTaskAnswers[subTask.id] || ''}
                                        onChange={(e) => setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: e.target.value }))}
                                        placeholder={subTask.fieldOptions?.placeholder || "Napisz swoją odpowiedź tutaj..."}
                                        disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                        className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[100px] text-lg leading-relaxed transition-all duration-300 ${
                                          quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                            ? 'border-white/20 opacity-70 cursor-not-allowed'
                                            : 'border-white/10'
                                        }`}
                                      />
                                    )}
                                    
                                    {subTask.fieldType === 'number' && (
                                      <input
                                        type="number"
                                        value={quizSubTaskAnswers[subTask.id] || ''}
                                        onChange={(e) => setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: e.target.value }))}
                                        placeholder={subTask.fieldOptions?.placeholder || "Wpisz liczbę..."}
                                        min={subTask.fieldOptions?.min}
                                        max={subTask.fieldOptions?.max}
                                        step={subTask.fieldOptions?.step}
                                        disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                        className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] text-lg transition-all duration-300 ${
                                          quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                            ? 'border-white/20 opacity-70 cursor-not-allowed'
                                            : 'border-white/10'
                                        }`}
                                      />
                                    )}
                                    
                                    {subTask.fieldType === 'url' && (
                                      <input
                                        type="url"
                                        value={quizSubTaskAnswers[subTask.id] || ''}
                                        onChange={(e) => setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: e.target.value }))}
                                        placeholder={subTask.fieldOptions?.placeholder || "https://..."}
                                        disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                        className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] text-lg transition-all duration-300 ${
                                          quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                            ? 'border-white/20 opacity-70 cursor-not-allowed'
                                            : 'border-white/10'
                                        }`}
                                      />
                                    )}
                                    
                                    {subTask.fieldType === 'date' && (() => {
                                      const isOpen = openDatePickers[subTask.id] || false;
                                      const selectedDate = quizSubTaskAnswers[subTask.id] || '';
                                      
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
                                        const currentDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
                                        const year = currentDate.getFullYear();
                                        const month = currentDate.getMonth();
                                        
                                        const firstDay = new Date(year, month, 1);
                                        const lastDay = new Date(year, month + 1, 0);
                                        const daysInMonth = lastDay.getDate();
                                        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Poniedziałek = 0
                                        
                                        const days = [];
                                        
                                        // Dni z poprzedniego miesiąca
                                        const prevMonthLastDay = new Date(year, month, 0).getDate();
                                        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                                          days.push({
                                            day: prevMonthLastDay - i,
                                            isCurrentMonth: false,
                                            date: new Date(year, month - 1, prevMonthLastDay - i)
                                          });
                                        }
                                        
                                        // Dni z bieżącego miesiąca
                                        for (let day = 1; day <= daysInMonth; day++) {
                                          days.push({
                                            day,
                                            isCurrentMonth: true,
                                            date: new Date(year, month, day)
                                          });
                                        }
                                        
                                        // Dni z następnego miesiąca (do wypełnienia siatki)
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
                                        setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: dateStr }));
                                        setOpenDatePickers(prev => ({ ...prev, [subTask.id]: false }));
                                      };
                                      
                                      const navigateMonth = (direction: number) => {
                                        const currentDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
                                        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
                                        setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: formatDateForInput(newDate) }));
                                      };
                                      
                                      const selectToday = () => {
                                        handleDateSelect(new Date());
                                      };
                                      
                                      const clearDate = () => {
                                        setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: '' }));
                                        setOpenDatePickers(prev => ({ ...prev, [subTask.id]: false }));
                                      };
                                      
                                      return (
                                        <div className="relative date-picker-container">
                                          <button
                                            type="button"
                                            onClick={() => !quizSubTaskResults[subTask.id] && setOpenDatePickers(prev => ({ ...prev, [subTask.id]: !isOpen }))}
                                            disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                            className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-left flex items-center justify-between transition-all duration-300 ${
                                              quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                                ? 'border-white/20 opacity-70 cursor-not-allowed'
                                                : selectedDate
                                                ? 'border-[#fee715]/50 hover:border-[#fee715]'
                                                : 'border-white/10 hover:border-[#fee715]/50'
                                            }`}
                                          >
                                            <span className={`text-lg ${selectedDate ? 'text-white' : 'text-gray-400'}`}>
                                              {selectedDate ? formatDateForDisplay(selectedDate) : 'Kliknij, aby wybrać datę'}
                                            </span>
                                            <svg className={`w-6 h-6 transition-colors duration-300 ${selectedDate ? 'text-[#fee715]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                          </button>
                                          
                                          {isOpen && !quizSubTaskResults[subTask.id] && (
                                            <div className="absolute z-50 mt-2 bg-[#18232F] border-2 border-[#fee715]/30 rounded-xl shadow-2xl p-6 w-full max-w-sm">
                                              {/* Header kalendarza */}
                                              <div className="flex items-center justify-between mb-4">
                                                <button
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
                                                  const isSelected = selectedDate && formatDateForInput(dayObj.date) === selectedDate;
                                                  const isToday = formatDateForInput(dayObj.date) === formatDateForInput(new Date());
                                                  
                                                  return (
                                                    <button
                                                      key={idx}
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
                                                  onClick={clearDate}
                                                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium transition-colors"
                                                >
                                                  Wyczyść
                                                </button>
                                                <button
                                                  onClick={selectToday}
                                                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#fee715]/30"
                                                >
                                                  Dzisiaj
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                          
                                          {!quizSubTaskAnswers[subTask.id] && !quizSubTaskResults[subTask.id] && !isOpen && (
                                            <p className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                              </svg>
                                              Kliknij w pole, aby otworzyć kalendarz i wybrać datę
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })()}
                                    
                                    {subTask.fieldType === 'choice' && subTask.fieldOptions?.choices && (
                                      <div className="space-y-3">
                                        {subTask.fieldOptions.choices.map((choice, choiceIndex) => (
                                          <CustomRadio
                                            key={choiceIndex}
                                            id={`${subTask.id}-${choiceIndex}`}
                                            name={subTask.id}
                                            value={choiceIndex}
                                            checked={Number(quizSubTaskAnswers[subTask.id]) === choiceIndex}
                                            onChange={async (value) => {
                                              const newAnswer = String(value);
                                              setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: newAnswer }));
                                              // Automatyczne zapisanie i zatwierdzenie dla pól wyboru
                                              if (question.id && !quizSubTaskResults[subTask.id] && !user) return;
                                              // Użyj setTimeout aby upewnić się, że stan jest zaktualizowany
                                              setTimeout(async () => {
                                                if (question.id) {
                                                  const autoApprove = shouldAutoApproveSubTask(question.id, subTask.id, newAnswer);
                                                  const status = autoApprove ? 'approved' : 'pending';
                                                  await saveQuizResponse(question.id, newAnswer, status, subTask.id);
                                                  await loadProgress();
                                                  if (autoApprove) {
                                                    setQuizSubTaskResults(prev => ({ ...prev, [subTask.id]: 'approved' }));
                                                    setQuizSubTaskFeedback(prev => ({ ...prev, [subTask.id]: 'Odpowiedź została automatycznie zatwierdzona.' }));
                                                  }
                                                }
                                              }, 100);
                                            }}
                                            label={choice}
                                            disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                          />
                                        ))}
                                      </div>
                                    )}
                                    
                                    {subTask.fieldType === 'multichoice' && subTask.fieldOptions?.choices && (
                                      <div className="space-y-4">
                                        <div className="space-y-3">
                                          {subTask.fieldOptions.choices.map((choice, choiceIndex) => {
                                            const selectedChoices = (quizSubTaskAnswers[subTask.id] || '').split(',').filter(c => c);
                                            const isChecked = selectedChoices.includes(String(choiceIndex));
                                            
                                            return (
                                              <label
                                                key={choiceIndex}
                                                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                                                  isChecked
                                                    ? 'bg-gradient-to-r from-[#fee715]/15 to-[#00C9A7]/15 border-[#fee715]/60 shadow-lg shadow-[#fee715]/20'
                                                    : 'bg-white/5 border-white/10 hover:border-[#fee715]/30 hover:bg-white/10'
                                                } ${quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved' ? 'opacity-70 cursor-not-allowed' : ''}`}
                                              >
                                                {/* Custom checkbox */}
                                                <div className="relative flex-shrink-0">
                                                  <input
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={(e) => {
                                                      // Tylko aktualizuj lokalny stan, bez automatycznego zapisywania
                                                      const current = (quizSubTaskAnswers[subTask.id] || '').split(',').filter(c => c);
                                                      if (e.target.checked) {
                                                        current.push(String(choiceIndex));
                                                      } else {
                                                        const index = current.indexOf(String(choiceIndex));
                                                        if (index > -1) current.splice(index, 1);
                                                      }
                                                      const newAnswer = current.join(',');
                                                      setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: newAnswer }));
                                                    }}
                                                    disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                                    className="sr-only"
                                                  />
                                                  <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors duration-200 ${
                                                    isChecked
                                                      ? 'border-[#fee715]/50 bg-[#fee715]/12'
                                                      : 'border-white/20 bg-white/5 group-hover:border-[#fee715]/40'
                                                  }`}>
                                                    {isChecked && (
                                                      <svg className="w-3 h-3 text-[#fee715]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 13l4 4L19 7" />
                                                      </svg>
                                                    )}
                                                  </div>
                                                </div>
                                                <span className={`text-white font-medium flex-1 transition-colors duration-300 ${
                                                  isChecked ? 'text-[#fee715]' : ''
                                                }`}>{choice}</span>
                                              </label>
                                            );
                                          })}
                                        </div>
                                        
                                        {/* Przyciski akcji dla multichoice - tylko jeśli odpowiedź nie jest jeszcze zatwierdzona */}
                                        {!quizSubTaskResults[subTask.id] && (
                                          <div className="flex gap-3 pt-2">
                                            <button
                                              onClick={async () => {
                                                const answer = quizSubTaskAnswers[subTask.id];
                                                if (!answer || answer === '') {
                                                  alert('Proszę zaznaczyć przynajmniej jedną opcję.');
                                                  return;
                                                }
                                                if (question.id) {
                                                  const autoApprove = shouldAutoApproveSubTask(question.id, subTask.id, answer);
                                                  const status = autoApprove ? 'approved' : 'pending';
                                                  await saveQuizResponse(question.id, answer, status, subTask.id);
                                                  await loadProgress();
                                                  if (autoApprove) {
                                                    setQuizSubTaskResults(prev => ({ ...prev, [subTask.id]: 'approved' }));
                                                    setQuizSubTaskFeedback(prev => ({ ...prev, [subTask.id]: 'Odpowiedź została automatycznie zatwierdzona.' }));
                                                  } else {
                                                    setQuizSubTaskResults(prev => ({ ...prev, [subTask.id]: 'pending' }));
                                                    setQuizSubTaskFeedback(prev => ({ ...prev, [subTask.id]: 'Odpowiedź została przesłana i oczekuje na weryfikację.' }));
                                                  }
                                                }
                                              }}
                                              disabled={!quizSubTaskAnswers[subTask.id] || quizSubTaskAnswers[subTask.id] === ''}
                                              className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-2 px-6 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                                            >
                                              Zatwierdź
                                            </button>
                                            <button
                                              onClick={() => {
                                                setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: '' }));
                                              }}
                                              className="bg-white/10 text-white font-[Montserrat] font-semibold py-2 px-6 rounded-lg hover:bg-white/20 border border-white/20 transition-all duration-300 text-sm"
                                            >
                                              Restart
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {subTask.fieldType === 'text-multiple' && subTask.fieldOptions?.multipleFields && (
                                      <div className="space-y-4">
                                        {subTask.fieldOptions.multipleFields.map((field, fieldIndex) => {
                                          const fieldKey = `${subTask.id}_field_${fieldIndex}`;
                                          const answers = (quizSubTaskAnswers[subTask.id] || '').split('|||');
                                          
                                          return (
                                            <div key={fieldIndex}>
                                              <label className="block text-gray-300 text-sm font-medium mb-2">
                                                {field.label}
                                              </label>
                                              <input
                                                type="text"
                                                value={answers[fieldIndex] || ''}
                                                onChange={(e) => {
                                                  const newAnswers = [...answers];
                                                  newAnswers[fieldIndex] = e.target.value;
                                                  setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: newAnswers.join('|||') }));
                                                }}
                                                placeholder={field.placeholder || "Wpisz..."}
                                                disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                                className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] text-lg transition-all duration-300 ${
                                                  quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                                    ? 'border-white/20 opacity-70 cursor-not-allowed'
                                                    : 'border-white/10'
                                                }`}
                                              />
                                            </div>
                                          );
                                        })}
                                        
                                        {/* Automatyczne obliczenia dla ćwiczenia 2 (analiza kampanii) */}
                                        {subTask.id === 'ex2-1' && (() => {
                                          const answers = (quizSubTaskAnswers[subTask.id] || '').split('|||');
                                          const impressions = parseFloat(answers[0]?.replace(/[^\d,.-]/g, '').replace(',', '.') || '0');
                                          const clicks = parseFloat(answers[1]?.replace(/[^\d,.-]/g, '').replace(',', '.') || '0');
                                          const budget = parseFloat(answers[2]?.replace(/[^\d,.-]/g, '').replace(',', '.') || '0');
                                          const leads = parseFloat(answers[3]?.replace(/[^\d,.-]/g, '').replace(',', '.') || '0');
                                          
                                          const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : null;
                                          const cpc = clicks > 0 ? (budget / clicks).toFixed(2) : null;
                                          const cpl = leads > 0 ? (budget / leads).toFixed(2) : null;
                                          
                                          if (impressions > 0 && clicks > 0 && budget > 0) {
                                            return (
                                              <div className="mt-6 bg-gradient-to-br from-[#fee715]/10 to-[#00C9A7]/10 border-2 border-[#fee715]/30 rounded-xl p-6">
                                                <h6 className="font-[Montserrat] text-lg font-bold text-[#fee715] mb-4">
                                                  📊 Automatyczne obliczenia:
                                                </h6>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                    <p className="text-gray-300 text-sm mb-1">CTR</p>
                                                    <p className="text-2xl font-bold text-[#00C9A7]">{ctr}%</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                      CTR = (kliknięcia / wyświetlenia) × 100%
                                                    </p>
                                                  </div>
                                                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                    <p className="text-gray-300 text-sm mb-1">CPC</p>
                                                    <p className="text-2xl font-bold text-[#00C9A7]">{cpc} zł</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                      CPC = budżet / kliknięcia
                                                    </p>
                                                  </div>
                                                  {leads > 0 && (
                                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                      <p className="text-gray-300 text-sm mb-1">Koszt pozyskania leada</p>
                                                      <p className="text-2xl font-bold text-[#00C9A7]">{cpl} zł</p>
                                                      <p className="text-xs text-gray-400 mt-1">
                                                        CPL = budżet / liczba zapytań
                                                      </p>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                      </div>
                                    )}
                                    
                                    {/* Status dla podzadania - subTasks są auto-zatwierdzane, więc nie pokazujemy "Oczekiwanie na sprawdzenie" */}
                                    {quizSubTaskResults[subTask.id] === 'approved' && (
                                      <div className="mt-4 bg-green-500/20 border-2 border-green-500/50 rounded-xl p-4 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div className="flex-1">
                                          <p className="text-green-200 font-semibold text-sm">Odpowiedź zapisana</p>
                                        </div>
                                        <button
                                          onClick={() => handleChangeSubTaskAnswer(subTask.id)}
                                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-200 text-xs font-semibold transition-all duration-300"
                                        >
                                          Zmień
                                        </button>
                                      </div>
                                    )}
                                    
                                    {quizSubTaskResults[subTask.id] === 'approved' && (
                                      <div className="mt-4 bg-green-500/20 border-2 border-green-500/50 rounded-xl p-4 flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                          <p className="text-green-200 font-semibold text-sm mb-1">Zatwierdzone</p>
                                          {quizSubTaskFeedback[subTask.id] && (
                                            <p className="text-green-300/80 text-xs mb-2">{quizSubTaskFeedback[subTask.id]}</p>
                                          )}
                                        </div>
                                        <button
                                          onClick={() => handleChangeSubTaskAnswer(subTask.id)}
                                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-200 text-xs font-semibold transition-all duration-300"
                                        >
                                          Zmień
                                        </button>
                                      </div>
                                    )}
                                    
                                    {quizSubTaskResults[subTask.id] === 'rejected' && (
                                      <div className="mt-4 bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                          <p className="text-red-200 font-semibold text-sm mb-1">Wymaga poprawy</p>
                                          {quizSubTaskFeedback[subTask.id] && (
                                            <p className="text-red-300/80 text-xs mb-2">{quizSubTaskFeedback[subTask.id]}</p>
                                          )}
                                          <button
                                            onClick={() => handleChangeSubTaskAnswer(subTask.id)}
                                            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-200 text-xs font-semibold transition-all duration-300"
                                          >
                                            Zmień
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Przycisk zapisu dla podzadania - tylko dla pól które nie mają własnych przycisków (np. multichoice ma własne) */}
                                    {/* Przycisk jest zawsze widoczny - można zmienić odpowiedź nawet po zatwierdzeniu */}
                                    {subTask.fieldType !== 'multichoice' && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => handleSubmitSubTaskAnswer(question.id, subTask.id)}
                                          disabled={!quizSubTaskAnswers[subTask.id] || quizSubTaskAnswers[subTask.id] === ''}
                                          className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-2 px-4 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                                        >
                                          {quizSubTaskResults[subTask.id] === 'approved' ? 'Zapisz zmiany' : 'Zapisz odpowiedź'}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="pl-0 md:pl-14 space-y-4">
                                {/* Pytanie z obliczeniem - input numeryczny */}
                                {question.isCalculation && question.correctNumericAnswer !== undefined ? (
                                  <div className="space-y-4">
                                    <div className="bg-gradient-to-br from-[#fee715]/5 to-[#00C9A7]/5 border border-[#fee715]/20 rounded-xl p-6">
                                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <label className="font-[Montserrat] font-semibold text-white text-lg flex-shrink-0">
                                          Twoja odpowiedź:
                                        </label>
                                        <div className="flex-1 max-w-xs">
                                          <div className="relative">
                                            <input
                                              type="number"
                                              step="0.1"
                                              min="0"
                                              max="100"
                                              value={quizAnswers[question.id] || ''}
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                handleQuizAnswer(question.id, value);
                                                // Resetuj wynik jeśli użytkownik zmienia odpowiedź
                                                if (quizResults[question.id] === 'incorrect' || quizResults[question.id] === 'correct') {
                                                  setQuizResults(prev => ({ ...prev, [question.id]: null }));
                                                }
                                              }}
                                              onBlur={async (e) => {
                                                const value = e.target.value;
                                                // Automatyczne sprawdzanie odpowiedzi po opuszczeniu pola
                                                if (value && !isNaN(parseFloat(value))) {
                                                  const userAnswer = parseFloat(value);
                                                  const correctAnswer = question.correctNumericAnswer!;
                                                  const tolerance = 0.15; // Tolerancja dla zaokrągleń (0.1 + margines)
                                                  
                                                  if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                                                    // Odpowiedź poprawna
                                                    await saveQuizResponse(question.id, userAnswer, 'approved');
                                                    setQuizResults(prev => ({ ...prev, [question.id]: 'correct' }));
                                                    setQuizFeedback(prev => ({ ...prev, [question.id]: question.feedback || 'Dobrze!' }));
                                                  } else {
                                                    // Odpowiedź niepoprawna - nie zapisujemy, tylko pokazujemy że jest błędna
                                                    setQuizResults(prev => ({ ...prev, [question.id]: 'incorrect' }));
                                                  }
                                                }
                                              }}
                                              placeholder="0.0"
                                              disabled={quizResults[question.id] === 'correct' || quizResults[question.id] === 'approved'}
                                              className={`w-full bg-white/5 border-2 rounded-xl px-6 py-5 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] text-2xl font-bold text-center transition-all duration-300 ${
                                                quizResults[question.id] === 'correct' || quizResults[question.id] === 'approved'
                                                  ? 'border-green-500/50 bg-green-500/10'
                                                  : quizResults[question.id] === 'incorrect'
                                                  ? 'border-red-500/50 bg-red-500/10'
                                                  : 'border-white/10 hover:border-[#fee715]/30'
                                              }`}
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl">%</span>
                                          </div>
                                        </div>
                                        {/* Przycisk reset */}
                                        {(quizAnswers[question.id] || quizResults[question.id]) && (
                                          <button
                                            onClick={() => {
                                              setQuizAnswers(prev => ({ ...prev, [question.id]: '' }));
                                              setQuizResults(prev => ({ ...prev, [question.id]: null }));
                                              setQuizFeedback(prev => {
                                                const newFeedback = { ...prev };
                                                delete newFeedback[question.id];
                                                return newFeedback;
                                              });
                                            }}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-semibold transition-all duration-300 flex items-center gap-2 flex-shrink-0"
                                          >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Reset
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-gray-400 text-sm mt-3 text-center md:text-left">
                                        Wpisz wynik procentowy z dokładnością do jednego miejsca po przecinku (np. 3,5)
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <textarea
                                      value={quizAnswers[question.id] || ''}
                                      onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                                      placeholder="Napisz swoją odpowiedź tutaj..."
                                      disabled={quizResults[question.id] === 'pending' || quizResults[question.id] === 'approved'}
                                      className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[120px] text-lg leading-relaxed transition-all duration-300 ${
                                        quizResults[question.id] === 'pending' || quizResults[question.id] === 'approved'
                                          ? 'border-white/20 opacity-70 cursor-not-allowed'
                                          : 'border-white/10'
                                      }`}
                                    />
                                    
                                    {/* Przycisk zatwierdzania dla każdego pytania otwartego osobno */}
                                    {/* Nie pokazuj przycisku jeśli odpowiedź jest już zatwierdzona */}
                                    {question.type === 'open' && quizResults[question.id] !== 'approved' && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => handleSubmitOpenAnswer(question.id)}
                                          disabled={!quizAnswers[question.id] || quizAnswers[question.id] === '' || quizResults[question.id] === 'pending'}
                                          className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                          {quizResults[question.id] === 'pending' ? 'Oczekuje na weryfikację...' : 'Prześlij odpowiedź'}
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                                
                                {/* Status dla pytań z obliczeniami - komunikat o poprawnej odpowiedzi */}
                                {question.isCalculation && quizResults[question.id] === 'correct' && (
                                  <div className="bg-green-500/20 border-2 border-green-500/50 rounded-xl p-5 flex items-start gap-4">
                                    <svg className="w-7 h-7 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-green-200 font-semibold text-lg mb-2">✓ Poprawna odpowiedź!</p>
                                      {quizFeedback[question.id] && (
                                        <p className="text-green-300/90 text-base leading-relaxed">{quizFeedback[question.id]}</p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Status dla pytań z obliczeniami - komunikat o niepoprawnej odpowiedzi */}
                                {question.isCalculation && quizResults[question.id] === 'incorrect' && (
                                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-5 flex items-start gap-4">
                                    <svg className="w-7 h-7 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-red-200 font-semibold text-lg mb-2">Niepoprawna odpowiedź</p>
                                      <p className="text-red-300/90 text-base leading-relaxed mb-3">
                                        {question.hint && `💡 ${question.hint}`}
                                      </p>
                                      <button
                                        onClick={() => {
                                          setQuizResults(prev => ({ ...prev, [question.id]: null }));
                                          setQuizAnswers(prev => ({ ...prev, [question.id]: '' }));
                                        }}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-200 text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Spróbuj ponownie
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Status dla pytań otwartych - oczekiwanie na zatwierdzenie */}
                                {!question.isCalculation && question.type === 'open' && quizResults[question.id] === 'pending' && (
                                  <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-yellow-200 font-semibold mb-1">Oczekiwanie na zatwierdzenie</p>
                                      <p className="text-yellow-300/80 text-sm">Twoja odpowiedź została przesłana i oczekuje na weryfikację przez administratora. Możesz przejść dalej.</p>
                                    </div>
                                    <button
                                      onClick={() => handleChangeOpenAnswer(question.id)}
                                      className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm font-semibold transition-all duration-300"
                                    >
                                      Zmień odpowiedź
                                    </button>
                                  </div>
                                )}
                                
                                {/* Status dla pytań otwartych - odpowiedź zatwierdzona */}
                                {!question.isCalculation && question.type === 'open' && quizResults[question.id] === 'approved' && (
                                  <div className="bg-green-500/20 border-2 border-green-500/50 rounded-xl p-4 flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-green-200 font-semibold mb-1">Odpowiedź zatwierdzona</p>
                                      {quizFeedback[question.id] && (
                                        <p className="text-green-300/80 text-sm">{quizFeedback[question.id]}</p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => handleChangeOpenAnswer(question.id)}
                                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-200 text-sm font-semibold transition-all duration-300"
                                    >
                                      Zmień odpowiedź
                                    </button>
                                  </div>
                                )}
                                
                                {/* Status dla pytań otwartych - odpowiedź wymaga poprawy */}
                                {!question.isCalculation && question.type === 'open' && quizResults[question.id] === 'rejected' && (
                                  <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                                    <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-red-200 font-semibold mb-1">Odpowiedź wymaga poprawy</p>
                                      {quizFeedback[question.id] && (
                                        <p className="text-red-300/80 text-sm mb-3">{quizFeedback[question.id]}</p>
                                      )}
                                      <button
                                        onClick={() => handleChangeOpenAnswer(question.id)}
                                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-200 text-sm font-semibold transition-all duration-300"
                                      >
                                        Zmień odpowiedź
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Komunikaty dla pytań zamkniętych */}
                            {question.type === 'choice' && quizResults[question.id] && (
                              <div
                                className={`mt-6 ml-14 p-5 rounded-xl border-2 flex items-start gap-4 ${
                                  quizResults[question.id] === 'correct'
                                    ? 'bg-green-500/20 border-green-500/50 text-green-200'
                                    : 'bg-red-500/20 border-red-500/50 text-red-200'
                                }`}
                              >
                                <svg
                                  className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                                    quizResults[question.id] === 'correct' ? 'text-green-400' : 'text-red-400'
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  {quizResults[question.id] === 'correct' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  )}
                                </svg>
                                <div className="flex-1">
                                  <p className="text-base leading-relaxed mb-3">{quizFeedback[question.id]}</p>
                                  {quizResults[question.id] === 'incorrect' && (
                                    <button
                                      onClick={() => handleRetryAnswer(question.id)}
                                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-200 text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                      </svg>
                                      Spróbuj ponownie
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                )}

                {/* Przyciski nawigacji - przeprojektowane */}
                <div className="hidden md:block border-t-2 border-white/10 bg-white/5 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={!getPreviousLessonInModules(currentLesson.id)}
                      className="flex items-center gap-2 bg-white/10 text-white font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Wstecz
                    </button>

                    <div className="flex items-center gap-4">
                      {currentLesson.quiz.length > 0 && (
                        <button
                          onClick={handleRefreshQuiz}
                          disabled={refreshingQuiz}
                          className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Sprawdź czy są aktualizacje w odpowiedziach (feedback, zatwierdzenie)"
                        >
                          <svg 
                            className={`w-4 h-4 ${refreshingQuiz ? 'animate-spin' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {refreshingQuiz ? 'Sprawdzanie...' : 'Sprawdź status odpowiedzi'}
                        </button>
                      )}
                      {currentLesson.id === '6.3' && canCompleteCourse ? (
                        <button
                          onClick={handleCompleteCourse}
                          className="flex items-center gap-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Zakończ Szkolenie
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          disabled={!getNextLessonInModules(currentLesson.id) || (currentLesson.id === '6.3' && !canProceed)}
                          className="flex items-center gap-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                        >
                          Dalej
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 md:px-8 py-8">
              <div className="text-center text-gray-400">
                Wybierz moduł i lekcję, aby rozpocząć
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky pasek nawigacji Wstecz/Dalej: na mobile zawsze, na desktop gdy standalone (brak sidebara) */}
      {currentLessonId !== 'completion' && currentLesson && currentModule && (
        <div className={`${standalone ? '' : 'md:hidden '}fixed inset-x-0 bottom-0 z-40 bg-[#101820]/95 backdrop-blur-xl border-t border-white/10`}>
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevious}
              disabled={!getPreviousLessonInModules(currentLesson.id)}
              className="flex items-center gap-2 bg-white/10 text-white font-[Montserrat] font-bold py-3 px-4 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Wstecz
            </button>

            <div className="flex items-center gap-2">
              {currentLesson.quiz.length > 0 && (
                <button
                  onClick={handleRefreshQuiz}
                  disabled={refreshingQuiz}
                  className="px-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Sprawdź czy są aktualizacje w odpowiedziach (feedback, zatwierdzenie)"
                  aria-label={refreshingQuiz ? 'Sprawdzanie statusu odpowiedzi' : 'Sprawdź status odpowiedzi'}
                >
                  <svg className={`w-5 h-5 ${refreshingQuiz ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}

              {currentLesson.id === '6.3' && canCompleteCourse ? (
                <button
                  onClick={handleCompleteCourse}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl shadow-lg"
                >
                  Zakończ
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!getNextLessonInModules(currentLesson.id) || (currentLesson.id === '6.3' && !canProceed)}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Dalej
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal zmiany hasła */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#18232F] border border-white/10 rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[Montserrat] text-base font-bold text-white">
                Zmień hasło
              </h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError(null);
                  setPasswordSuccess(null);
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-5">
              {/* Komunikat sukcesu */}
              {passwordSuccess && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-200 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">{passwordSuccess}</div>
                </div>
              )}

              {/* Komunikat błędu */}
              {passwordError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">{passwordError}</div>
                </div>
              )}

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Nowe hasło
                  <span className="text-gray-500 text-xs ml-2">(min. 6 znaków)</span>
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Potwierdź nowe hasło
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError(null);
                    setPasswordSuccess(null);
                    setNewPassword('');
                    setConfirmNewPassword('');
                  }}
                  className="flex-1 bg-white/10 text-white font-[Montserrat] font-bold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {passwordLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Zmienianie...
                    </span>
                  ) : (
                    'Zmień hasło'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

