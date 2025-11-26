import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { trainingModules, findLesson, getTotalLessons, getNextLesson, getPreviousLesson } from '../config/trainingModules';
import type { QuizQuestion } from '../config/trainingModules';
import { CustomRadio } from './CustomRadio';
import { UserMenu } from './UserMenu';

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

export const TrainingPage: React.FC = () => {
  const { user, loading: authLoading, signOut, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [currentLessonId, setCurrentLessonId] = useState<string>('1.1');
  const [progress, setProgress] = useState<TrainingProgress>({});
  const [loading, setLoading] = useState(true);
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
  const contentRef = useRef<HTMLDivElement>(null);

  const currentLesson = findLesson(currentLessonId);
  const currentModule = currentLesson ? trainingModules.find(m => m.id === currentLesson.moduleId) : undefined;

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
    if (user) {
      loadProgress();
      loadUnlockedModules();
      
      // Subskrybuj zmiany w odpowiedziach (dla pytań otwartych)
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
            // Odśwież postęp gdy odpowiedź zostanie zweryfikowana
            if (payload.new.status === 'approved' || payload.new.status === 'rejected') {
              loadProgress();
              loadUnlockedModules();
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  // Załaduj postęp gdy zmienia się lekcja
  useEffect(() => {
    if (user && currentLessonId) {
      loadProgress();
    }
  }, [currentLessonId, user]);

  const loadUnlockedModules = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('module_unlocks')
        .select('module_id')
        .eq('user_id', user.id);

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
      const allQuizCompleted = currentLesson.quiz.every(q => {
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
          // Dla pytań otwartych - można przejść dalej tylko jeśli są zatwierdzone
          return result === 'approved';
        }
      });
      setCanProceed(allQuizCompleted && currentLesson.quiz.length > 0);
    }
  }, [currentLesson, quizResults, quizSubTaskResults]);

  const loadProgress = async () => {
    if (!user) return;

    try {
      // Załaduj postęp modułów
      const { data: trainingData, error: trainingError } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', user.id);

      if (trainingError) throw trainingError;

      // Załaduj odpowiedzi quizów
      const { data: responsesData, error: responsesError } = await supabase
        .from('training_responses')
        .select('*')
        .eq('user_id', user.id);

      if (responsesError) throw responsesError;

      // Przetwórz dane do lokalnego stanu
      const progressData: TrainingProgress = {};
      
      trainingModules.forEach(module => {
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

          // Sprawdź czy wszystkie pytania mają odpowiedzi i czy są poprawne/zatwierdzone
          const allQuizCompleted = lesson.quiz.length > 0 && lesson.quiz.every(q => {
            if (q.type === 'multi-task' && q.subTasks) {
              // Dla zadań z podzadaniami sprawdź czy wszystkie podzadania są zatwierdzone
              return q.subTasks.every(subTask => {
                const subTaskResponse = responsesData?.find(r => 
                  r.module_code === `modul_${module.id}` &&
                  r.step_code === lesson.id &&
                  r.question_code === subTask.id
                );
                return subTaskResponse && (subTaskResponse as any).status === 'approved';
              });
            } else {
              const response = responsesData?.find(r => 
                r.module_code === `modul_${module.id}` &&
                r.step_code === lesson.id &&
                r.question_code === q.id
              );
              if (!response) return false;
              
              // Dla pytań zamkniętych sprawdź czy odpowiedź jest poprawna
              if (q.type === 'choice') {
                // Konwertuj odpowiedź na number dla pytań zamkniętych
                const answerValue = Number(response.answer_text);
                const isCorrect = checkQuizAnswer(q, answerValue);
                return isCorrect;
              } else {
                // Dla pytań otwartych sprawdź czy są zatwierdzone
                return (response as any).status === 'approved';
              }
            }
          });

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
        const lessonResponses: { [questionId: string]: string | number } = {};
        const lessonStatuses: { [questionId: string]: 'pending' | 'approved' | 'rejected' } = {};
        const lessonResults: { [questionId: string]: 'correct' | 'incorrect' | 'pending' | 'approved' | 'rejected' | null } = {};
        
        currentLesson.quiz.forEach(q => {
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
            
            // Dla pytań otwartych sprawdź status
            if (q.type === 'open') {
              const status = (response as any).status || 'pending';
              lessonStatuses[q.id] = status;
              lessonResults[q.id] = status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending';
              
              if ((response as any).admin_feedback) {
                setQuizFeedback(prev => ({
                  ...prev,
                  [q.id]: (response as any).admin_feedback
                }));
              }
            } else if (q.type === 'multi-task' && q.subTasks) {
              // Dla zadań z podzadaniami - ładowanie odpowiedzi dla każdego podzadania
              // Sprawdź najpierw, czy istnieje stara odpowiedź z question_code = q.id (dla kompatybilności wstecznej)
              const oldResponse = responsesData?.find(r => 
                r.module_code === `modul_${currentLesson.moduleId}` &&
                r.step_code === currentLesson.id &&
                r.question_code === q.id
              );
              
              // Jeśli istnieje stara odpowiedź, logujemy to (ale nie używamy jej, bo teraz mamy podzadania)
              if (oldResponse) {
                console.log('⚠️ Znaleziono starą odpowiedź dla pytania', q.id, '- ignorujemy, bo teraz mamy podzadania');
              }
              
              q.subTasks.forEach(subTask => {
                console.log('🔍 Szukam odpowiedzi dla podzadania:', {
                  subTaskId: subTask.id,
                  moduleCode: `modul_${currentLesson.moduleId}`,
                  stepCode: currentLesson.id,
                  allResponses: responsesData?.filter(r => 
                    r.module_code === `modul_${currentLesson.moduleId}` &&
                    r.step_code === currentLesson.id
                  )
                });
                
                const subTaskResponse = responsesData?.find(r => 
                  r.module_code === `modul_${currentLesson.moduleId}` &&
                  r.step_code === currentLesson.id &&
                  r.question_code === subTask.id
                );
                
                if (subTaskResponse) {
                  console.log('✅ Znaleziono odpowiedź dla podzadania:', subTask.id, subTaskResponse);
                  const subTaskAnswer = String(subTaskResponse.answer_text || '');
                  setQuizSubTaskAnswers(prev => {
                    const updated = { ...prev, [subTask.id]: subTaskAnswer };
                    console.log('📝 Zaktualizowano quizSubTaskAnswers:', updated);
                    return updated;
                  });
                  
                  const subTaskStatus = (subTaskResponse as any).status || 'pending';
                  setQuizSubTaskResults(prev => {
                    const updated = { 
                      ...prev, 
                      [subTask.id]: subTaskStatus === 'approved' ? 'approved' : subTaskStatus === 'rejected' ? 'rejected' : 'pending' 
                    };
                    console.log('📊 Zaktualizowano quizSubTaskResults:', updated);
                    return updated;
                  });
                  
                  if ((subTaskResponse as any).admin_feedback) {
                    setQuizSubTaskFeedback(prev => ({
                      ...prev,
                      [subTask.id]: (subTaskResponse as any).admin_feedback
                    }));
                  }
                } else {
                  console.log('❌ Brak odpowiedzi dla podzadania:', subTask.id, 'w lekcji', currentLesson.id);
                }
              });
            } else {
              // Dla pytań zamkniętych sprawdź czy odpowiedź jest poprawna
              const isCorrect = checkQuizAnswer(q, answerValue);
              if (isCorrect) {
                lessonResults[q.id] = 'correct';
                // Ustaw feedback dla poprawnej odpowiedzi
                setQuizFeedback(prev => ({
                  ...prev,
                  [q.id]: q.feedback || 'Odpowiedź poprawna!'
                }));
              } else {
                lessonResults[q.id] = 'incorrect';
                // Ustaw hint dla niepoprawnej odpowiedzi
                setQuizFeedback(prev => ({
                  ...prev,
                  [q.id]: q.hint || 'Spróbuj ująć to inaczej.'
                }));
              }
            }
          }
        });
        setQuizAnswers(lessonResponses);
        setResponseStatuses(lessonStatuses);
        setQuizResults(lessonResults);
      }

      setLoading(false);
    } catch (error) {
      console.error('Błąd ładowania postępu:', error);
      setLoading(false);
    }
  };

  const saveProgress = async (lessonId: string, completed: boolean) => {
    if (!user || !currentLesson) return;

    try {
      const moduleCode = `modul_${currentLesson.moduleId}`;
      
      // Oblicz procent ukończenia modułu
      const moduleLessons = trainingModules.find(m => m.id === currentLesson.moduleId)?.lessons || [];
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
          module_code: moduleCode,
          status: completed && percentage === 100 ? 'completed' : 'in_progress',
          last_step_code: lessonId,
          percentage: percentage,
          completed_at: completed && percentage === 100 ? new Date().toISOString() : null,
          module_completed: completed && percentage === 100,
        }, {
          onConflict: 'user_id,module_code'
        });

      if (progressError) {
        console.error('Błąd zapisywania postępu:', progressError);
        throw progressError;
      }

      // Sprawdź czy quiz jest ukończony
      const lesson = trainingModules
        .find(m => m.id === currentLesson.moduleId)
        ?.lessons.find(l => l.id === lessonId);
      
      let quizCompleted = false;
      if (lesson && lesson.quiz.length > 0) {
        // Sprawdź czy wszystkie odpowiedzi są zapisane i poprawne/zatwierdzone
        const { data: lessonResponses, error: responsesError } = await supabase
          .from('training_responses')
          .select('*')
          .eq('user_id', user.id)
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
    if (!user || !currentLesson) return;

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
          module_code: moduleCode,
          step_code: currentLesson.id,
          question_code: questionCode,
          answer_text: String(answer),
          status: finalStatus,
        }, {
          onConflict: 'user_id,module_code,step_code,question_code'
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

  const handleSubmitSubTaskAnswer = async (questionId: string, subTaskId: string) => {
    const answer = quizSubTaskAnswers[subTaskId];
    if (!answer || answer === '') return;

    console.log('💾 Zapisuję odpowiedź na podzadanie:', { questionId, subTaskId, answer, currentLesson: currentLesson?.id });
    
    // Zapisz odpowiedź jako odpowiedź na pytanie z identyfikatorem podzadania
    await saveQuizResponse(questionId, answer, 'pending', subTaskId);
    
    // Odśwież dane z bazy, żeby upewnić się, że wszystko jest zsynchronizowane
    await loadProgress();
    
    setQuizSubTaskResults(prev => ({ ...prev, [subTaskId]: 'pending' }));
    setQuizSubTaskFeedback(prev => ({ ...prev, [subTaskId]: 'Odpowiedź została przesłana i oczekuje na weryfikację.' }));
    
    console.log('✅ Odpowiedź na podzadanie zapisana:', subTaskId);
  };

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

    const nextLesson = getNextLesson(currentLesson.id);
    if (nextLesson) {
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
    const prevLesson = getPreviousLesson(currentLesson.id);
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

  const handleRefreshQuiz = async () => {
    if (!currentLesson || !user) return;
    
    setRefreshingQuiz(true);
    try {
      // Pobierz aktualne odpowiedzi z bazy dla bieżącej lekcji
      const { data: responsesData, error: responsesError } = await supabase
        .from('training_responses')
        .select('*')
        .eq('user_id', user.id)
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

  const handleLessonClick = (lessonId: string) => {
    // Sprawdź czy lekcja jest dostępna przed przejściem
    const lesson = findLesson(lessonId);
    if (!lesson) return;
    
    // Sprawdź czy moduł jest odblokowany
    if (!unlockedModules.has(lesson.moduleId)) {
      // Moduł jest zablokowany - nie pozwól na przejście
      return;
    }
    
    // Sprawdź czy poprzednia lekcja jest ukończona (jeśli istnieje)
    const prevLesson = getPreviousLesson(lessonId);
    if (prevLesson && !isLessonCompleted(prevLesson.id)) {
      // Poprzednia lekcja nie jest ukończona - nie pozwól na przejście
      return;
    }
    
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-white text-lg">Ładowanie...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalLessons = getTotalLessons();
  const completedLessons = getCompletedLessonsCount();

  // Sprawdź które lekcje są dostępne (można kliknąć)
  const isLessonAvailable = (lessonId: string): boolean => {
    if (lessonId === currentLessonId) return true;
    
    // Sprawdź czy moduł jest odblokowany
    const lesson = findLesson(lessonId);
    if (!lesson) return false;
    
    // Jeśli moduł nie jest odblokowany, lekcja nie jest dostępna
    if (!unlockedModules.has(lesson.moduleId)) {
      return false;
    }
    
    // Sprawdź czy poprzednia lekcja jest ukończona
    const prevLesson = getPreviousLesson(lessonId);
    
    // Jeśli nie ma poprzedniej lekcji, to jest pierwsza lekcja w całym kursie (1.1)
    // Ta lekcja jest zawsze dostępna, jeśli moduł jest odblokowany (co już sprawdziliśmy)
    if (!prevLesson) {
      return lesson.moduleId === '1'; // Tylko pierwsza lekcja w module 1 jest zawsze dostępna
    }
    
    // Sprawdź czy poprzednia lekcja jest ukończona
    // Jeśli poprzednia lekcja jest w innym module, sprawdź czy poprzedni moduł jest ukończony
    if (prevLesson.moduleId !== lesson.moduleId) {
      // Przechodzimy do nowego modułu - sprawdź czy poprzedni moduł jest w pełni ukończony
      const prevModule = trainingModules.find(m => m.id === prevLesson.moduleId);
      if (prevModule) {
        const allPrevModuleLessonsCompleted = prevModule.lessons.every(l => isLessonCompleted(l.id));
        if (!allPrevModuleLessonsCompleted) {
          return false; // Poprzedni moduł nie jest w pełni ukończony
        }
      }
    }
    
    // Sprawdź czy poprzednia lekcja jest ukończona
    return isLessonCompleted(prevLesson.id);
  };

  // Sprawdź czy moduł jest odblokowany
  const isModuleUnlocked = (moduleId: string): boolean => {
    return unlockedModules.has(moduleId);
  };

  return (
    <div className="min-h-screen bg-[#101820] text-white">

      {/* Header z postępem - przeprojektowany */}
      {!isPanelHidden && (
        <div className="sticky top-0 z-40 bg-gradient-to-b from-[#101820] via-[#101820]/98 to-[#101820]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-6 md:px-8 py-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="font-[Montserrat] text-2xl md:text-3xl font-bold mb-2">
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
                      {completedLessons} <span className="text-gray-400 font-normal">/ {totalLessons} lekcji</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 max-w-md">
                  <div className="relative bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#fee715] via-[#fee715] to-[#00C9A7] rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 text-right">
                    {Math.round((completedLessons / totalLessons) * 100)}% ukończone
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-6 flex items-center gap-3">
              <button
                onClick={() => setIsPanelHidden(true)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-sm font-[Montserrat] font-semibold text-gray-300 hover:text-white flex items-center gap-2"
                title="Tryb pełnego ekranu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Tryb pełnego ekranu
              </button>
              <UserMenu 
                onPasswordChange={() => setShowPasswordModal(true)}
                onProfileClick={() => navigate('/profile')}
              />
            </div>
          </div>
        </div>
      </div>
      )}

      <div className={`flex ${isPanelHidden ? 'h-screen' : 'h-[calc(100vh-180px)]'}`}>
        {/* Sidebar - przeprojektowany */}
        <div className={`w-72 md:w-80 bg-gradient-to-b from-[#18232F] to-[#101820] border-r border-white/10 overflow-y-auto ${isPanelHidden ? 'h-screen' : ''}`}>
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
          <div className="p-6 space-y-6">
            {trainingModules.map((module, moduleIndex) => {
              const moduleLessons = module.lessons;
              const completedModuleLessons = moduleLessons.filter(l => isLessonCompleted(l.id)).length;
              const moduleProgress = (completedModuleLessons / moduleLessons.length) * 100;
              const isModuleUnlocked = unlockedModules.has(module.id);
              
              return (
                <div key={module.id} className="mb-8">
                  {/* Nagłówek modułu */}
                  <div className={`flex items-center gap-3 mb-4 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    isModuleUnlocked
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/5 border-gray-700/50 opacity-60'
                  }`}>
                    {!isModuleUnlocked && (
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
                      isModuleUnlocked
                        ? 'bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border-[#fee715]/30'
                        : 'bg-gray-700/30 border-gray-600/50'
                    }`}>
                      <div className={isModuleUnlocked ? 'text-[#fee715]' : 'text-gray-500'}>
                        {getIcon(module.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-[Montserrat] font-bold text-sm truncate ${
                        isModuleUnlocked ? 'text-white' : 'text-gray-500'
                      }`}>
                        Moduł {module.id}
                      </h3>
                      <p className={`text-xs truncate ${
                        isModuleUnlocked ? 'text-gray-400' : 'text-gray-600'
                      }`}>{module.title}</p>
                    </div>
                    <div className={`text-xs ${
                      isModuleUnlocked ? 'text-gray-500' : 'text-gray-600'
                    }`}>
                      {completedModuleLessons}/{moduleLessons.length}
                    </div>
                  </div>
                  
                  {/* Lista lekcji */}
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isActive = lesson.id === currentLessonId;
                      const isCompleted = isLessonCompleted(lesson.id);
                      const isAvailable = isModuleUnlocked && isLessonAvailable(lesson.id);
                      const isLocked = !isAvailable && !isActive;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson.id)}
                          disabled={isLocked}
                          className={`
                            w-full text-left px-5 py-3 rounded-xl transition-all duration-300 relative
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
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                            ) : (
                              <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-400"></div>
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
          </div>
        </div>

        {/* Główny obszar treści - przeprojektowany */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-gradient-to-b from-[#101820] to-[#0B1218]">
          {currentLesson && currentModule ? (
            <div className="container mx-auto px-6 md:px-12 py-10 max-w-5xl">
              {/* Karta lekcji z lepszym designem */}
              <div className="bg-gradient-to-br from-white/5 via-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Nagłówek lekcji z gradientem */}
                <div className="bg-gradient-to-r from-[#fee715]/10 via-[#00C9A7]/10 to-[#fee715]/10 border-b border-white/10 px-8 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30">
                      <span className="text-xs font-[Montserrat] font-bold text-[#fee715] uppercase tracking-wide">
                        Moduł {currentModule.id}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{currentModule.title}</span>
                  </div>
                  <h2 className="font-[Montserrat] text-3xl md:text-4xl font-bold text-white leading-tight">
                    <span className="text-[#fee715]">{currentLesson.id}</span> {currentLesson.title}
                  </h2>
                </div>

                {/* Treść lekcji z lepszymi odstępami */}
                <div className="px-8 py-10 space-y-10">
                  {/* Wprowadzenie */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                      <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                      <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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

                  {/* Opis roli */}
                  {currentLesson.roleDescription && (
                    <>
                      <div className="border-t border-white/10"></div>
                      <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                          <h3 className="font-[Montserrat] text-2xl font-bold text-white">
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
                    <div className="px-8 py-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-10 bg-gradient-to-b from-[#fee715] to-[#00C9A7] rounded-full"></div>
                        <h3 className="font-[Montserrat] text-3xl font-bold text-white">
                          Mini-quiz
                        </h3>
                      </div>
                      <div className="space-y-8">
                        {currentLesson.quiz.map((question, qIndex) => (
                          <div key={question.id} className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-8 border border-white/10 shadow-lg">
                            <div className="flex items-start gap-4 mb-6">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#fee715]/20 to-[#00C9A7]/20 border border-[#fee715]/30 flex items-center justify-center">
                                <span className="font-[Montserrat] font-bold text-[#fee715]">{qIndex + 1}</span>
                              </div>
                              <h4 className="font-[Montserrat] text-xl font-bold text-white leading-relaxed flex-1 whitespace-pre-line">
                                {question.question}
                              </h4>
                            </div>

                            {question.type === 'choice' && question.options ? (
                              <div className="pl-14 space-y-4">
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
                                
                                {/* Przycisk sprawdzenia odpowiedzi dla pytań zamkniętych */}
                                {!quizResults[question.id] && (
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
                              <div className="pl-14 space-y-6">
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
                                    <textarea
                                      value={quizSubTaskAnswers[subTask.id] || ''}
                                      onChange={(e) => setQuizSubTaskAnswers(prev => ({ ...prev, [subTask.id]: e.target.value }))}
                                      placeholder="Napisz swoją odpowiedź tutaj..."
                                      disabled={quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'}
                                      className={`w-full bg-white/5 border-2 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] min-h-[100px] text-lg leading-relaxed transition-all duration-300 ${
                                        quizSubTaskResults[subTask.id] === 'pending' || quizSubTaskResults[subTask.id] === 'approved'
                                          ? 'border-white/20 opacity-70 cursor-not-allowed'
                                          : 'border-white/10'
                                      }`}
                                    />
                                    
                                    {/* Status dla podzadania */}
                                    {quizSubTaskResults[subTask.id] === 'pending' && (
                                      <div className="mt-4 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-4 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div className="flex-1">
                                          <p className="text-yellow-200 font-semibold text-sm">Oczekiwanie na sprawdzenie</p>
                                        </div>
                                        <button
                                          onClick={() => handleChangeSubTaskAnswer(subTask.id)}
                                          className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-200 text-xs font-semibold transition-all duration-300"
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
                                            <p className="text-green-300/80 text-xs">{quizSubTaskFeedback[subTask.id]}</p>
                                          )}
                                        </div>
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
                                    
                                    {/* Przycisk zapisu dla podzadania */}
                                    {!quizSubTaskResults[subTask.id] && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => handleSubmitSubTaskAnswer(question.id, subTask.id)}
                                          disabled={!quizSubTaskAnswers[subTask.id] || quizSubTaskAnswers[subTask.id] === ''}
                                          className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-2 px-4 rounded-lg hover:shadow-xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                                        >
                                          Zapisz odpowiedź
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="pl-14 space-y-4">
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
                                
                                {/* Status dla pytań otwartych */}
                                {quizResults[question.id] === 'pending' && (
                                  <div className="bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl p-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                      <p className="text-yellow-200 font-semibold mb-1">Oczekiwanie na sprawdzenie</p>
                                      <p className="text-yellow-300/80 text-sm">Twoja odpowiedź została przesłana i oczekuje na weryfikację przez administratora.</p>
                                    </div>
                                    <button
                                      onClick={() => handleChangeOpenAnswer(question.id)}
                                      className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm font-semibold transition-all duration-300"
                                    >
                                      Zmień odpowiedź
                                    </button>
                                  </div>
                                )}
                                
                                {quizResults[question.id] === 'approved' && (
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
                                  </div>
                                )}
                                
                                {quizResults[question.id] === 'rejected' && (
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

                        <div className="pl-14 pt-4">
                          {(() => {
                            const hasOpenQuestions = currentLesson.quiz.some(q => q.type === 'open');
                            const hasChoiceQuestions = currentLesson.quiz.some(q => q.type === 'choice');
                            const allOpenSubmitted = currentLesson.quiz
                              .filter(q => q.type === 'open')
                              .every(q => quizResults[q.id] === 'pending' || quizResults[q.id] === 'approved' || quizResults[q.id] === 'rejected');
                            const allChoiceCorrect = currentLesson.quiz
                              .filter(q => q.type === 'choice')
                              .every(q => quizResults[q.id] === 'correct');
                            const hasUncheckedChoices = currentLesson.quiz
                              .filter(q => q.type === 'choice')
                              .some(q => !quizResults[q.id]);
                            const hasIncorrectChoices = currentLesson.quiz
                              .filter(q => q.type === 'choice')
                              .some(q => quizResults[q.id] === 'incorrect');
                            
                            // Jeśli są pytania otwarte i nie wszystkie są przesłane
                            if (hasOpenQuestions && !allOpenSubmitted) {
                              const openQuestion = currentLesson.quiz.find(q => q.type === 'open' && !quizResults[q.id]);
                              if (openQuestion) {
                                return (
                                  <button
                                    onClick={() => handleSubmitOpenAnswer(openQuestion.id)}
                                    disabled={!quizAnswers[openQuestion.id] || quizAnswers[openQuestion.id] === ''}
                                    className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                  >
                                    Prześlij odpowiedź
                                  </button>
                                );
                              }
                            }
                            
                            // Jeśli są pytania zamknięte i nie wszystkie są poprawne (lub nie sprawdzone)
                            if (hasChoiceQuestions && (!allChoiceCorrect || hasUncheckedChoices)) {
                              return (
                                <button
                                  onClick={handleCheckQuiz}
                                  disabled={hasIncorrectChoices && !hasUncheckedChoices}
                                  className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                  Sprawdź odpowiedź
                                </button>
                              );
                            }
                            
                            // Jeśli są oba typy pytań
                            if (hasOpenQuestions && hasChoiceQuestions) {
                              if (!allChoiceCorrect || hasUncheckedChoices) {
                                return (
                                  <button
                                    onClick={handleCheckQuiz}
                                    disabled={hasIncorrectChoices && !hasUncheckedChoices}
                                    className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                  >
                                    Sprawdź odpowiedź
                                  </button>
                                );
                              }
                            }
                            
                            return null;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Przyciski nawigacji - przeprojektowane */}
                <div className="border-t-2 border-white/10 bg-white/5 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={!getPreviousLesson(currentLesson.id)}
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
                        >
                          <svg 
                            className={`w-4 h-4 ${refreshingQuiz ? 'animate-spin' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {refreshingQuiz ? 'Odświeżanie...' : 'Odśwież'}
                        </button>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={!getNextLesson(currentLesson.id) || (currentLesson.quiz.length > 0 && !canProceed)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                      >
                        Dalej
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
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

      {/* Modal zmiany hasła */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#18232F] border border-white/10 rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-[Montserrat] text-2xl font-bold text-white">
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

