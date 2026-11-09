import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { trainingModules, findLesson } from '../config/trainingModules';
import { AlertModal } from './AlertModal';
// import { useNavigate } from 'react-router-dom'; // Not used in this component
import { LoadingState } from './LoadingState';
import { Phone, User } from 'phosphor-react';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
}

interface UserProgress {
  userId: string;
  userName: string;
  userEmail: string;
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  lastActivity: string;
  modules: {
    moduleId: string;
    moduleTitle: string;
    completed: boolean;
    percentage: number;
  }[];
}

interface TrainingResponse {
  id: string;
  user_id: string;
  module_code: string;
  step_code: string;
  question_code: string;
  answer_text: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_feedback: string | null;
  created_at: string;
}

export const AdminCoursesTab: React.FC = () => {
  const { user } = useAuth();
  // const navigate = useNavigate(); // Not used
  const [users, setUsers] = useState<User[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserResponses, setSelectedUserResponses] = useState<TrainingResponse[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<TrainingResponse | null>(null);
  const [feedback, setFeedback] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [quickApproving, setQuickApproving] = useState<string | null>(null);
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (user) {
      loadUsers();
    }
  }, [user]);

  useEffect(() => {
    if (selectedUser) {
      loadUserResponses(selectedUser);
    }
  }, [selectedUser]);

  const loadUsers = async () => {
    if (!user) return;

    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, company_name, first_name, last_name, phone, notes, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('AdminPanel - błąd pobierania profiles:', profilesError);
        throw profilesError;
      }

      const usersWithEmail = await Promise.all(
        (profiles || []).map(async (profile) => {
          try {
            const { data: emailData, error: emailError } = await supabase
              .rpc('get_user_email', { user_id: profile.id });
            
            return {
              ...profile,
              email: emailError ? null : (emailData || null),
            };
          } catch (err) {
            return {
              ...profile,
              email: null,
            };
          }
        })
      );

      setUsers(usersWithEmail);

      const progressDataArray: UserProgress[] = [];
      
      for (const profile of usersWithEmail) {
        const totalLessons = trainingModules.reduce((sum, m) => sum + m.lessons.length, 0);
        
        const { data: certificateData } = await supabase
          .from('course_certificates')
          .select('course_completed, course_ready_to_complete')
          .eq('user_id', profile.id)
          .maybeSingle();
        
        const isCourseCompleted = certificateData?.course_completed || false;
        const isReadyToComplete = certificateData?.course_ready_to_complete || false;
        const allLessonsCompleted = isCourseCompleted || isReadyToComplete;
        
        const { data: moduleProgressData } = await supabase
          .from('training_progress')
          .select('*')
          .eq('user_id', profile.id);

        const { data: responsesData } = await supabase
          .from('training_responses')
          .select('*')
          .eq('user_id', profile.id);

        let completedLessons = 0;
        const modules: UserProgress['modules'] = [];

        trainingModules.forEach(module => {
          const moduleProgress = moduleProgressData?.find(p => p.module_code === `modul_${module.id}`);
          const moduleResponses = responsesData?.filter(r => r.module_code === `modul_${module.id}`) || [];
          
          const completedInModule = module.lessons.filter(lesson => {
            if (allLessonsCompleted) {
              return true;
            }
            
            if (lesson.quiz.length === 0) {
              return moduleProgressData?.some(
                p => p.module_code === `modul_${module.id}` && p.last_step_code === lesson.id
              ) || false;
            }
            
            const allQuizCompleted = lesson.quiz.every(q => {
              const response = moduleResponses.find(r => 
                r.step_code === lesson.id && r.question_code === q.id
              );
              if (!response) return false;
              
              if (q.type === 'choice') {
                const answerValue = Number(response.answer_text);
                const isCorrect = answerValue === q.correctAnswer;
                return isCorrect;
              } else {
                return (response as any).status === 'approved';
              }
            });
            
            return allQuizCompleted;
          }).length;

          completedLessons += completedInModule;
          
          modules.push({
            moduleId: module.id,
            moduleTitle: module.title,
            completed: moduleProgress?.module_completed || false,
            percentage: module.lessons.length > 0 ? Math.round((completedInModule / module.lessons.length) * 100) : 0,
          });
        });

        const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        const lastResponse = responsesData?.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0];
        const lastActivity = lastResponse?.created_at || profile.created_at;

        progressDataArray.push({
          userId: profile.id,
          userName: profile.full_name || profile.email?.split('@')[0] || 'Użytkownik',
          userEmail: profile.email || '',
          totalLessons,
          completedLessons,
          percentage,
          lastActivity,
          modules,
        });
      }

      setUserProgress(progressDataArray);
      setLoading(false);
    } catch (error) {
      console.error('Błąd ładowania użytkowników:', error);
      setLoading(false);
    }
  };

  const loadUserResponses = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('training_responses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSelectedUserResponses(data || []);
    } catch (error) {
      console.error('Błąd ładowania odpowiedzi:', error);
    }
  };

  const handleRefreshResponses = async () => {
    if (!selectedUser) return;
    setRefreshing(true);
    try {
      await loadUserResponses(selectedUser);
      setAlertModal({
        isOpen: true,
        title: 'Odświeżono',
        message: 'Lista odpowiedzi została zaktualizowana.',
        type: 'success'
      });
    } catch (error) {
      console.error('Błąd odświeżania odpowiedzi:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się odświeżyć odpowiedzi.',
        type: 'error'
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleQuickApprove = async (responseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickApproving(responseId);
    try {
      const { error } = await supabase
        .from('training_responses')
        .update({
          status: 'approved',
          admin_feedback: null,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', responseId);

      if (error) throw error;

      setSelectedUserResponses(prev =>
        prev.map(r =>
          r.id === responseId
            ? { ...r, status: 'approved' as const, admin_feedback: null }
            : r
        )
      );

      if (selectedUser) {
        await loadUsers();
      }

      setAlertModal({
        isOpen: true,
        title: 'Zatwierdzono',
        message: 'Odpowiedź została szybko zatwierdzona.',
        type: 'success'
      });
    } catch (error) {
      console.error('Błąd szybkiego zatwierdzenia:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zatwierdzić odpowiedzi.',
        type: 'error'
      });
    } finally {
      setQuickApproving(null);
    }
  };

  const handleReview = async (responseId: string, status: 'approved' | 'rejected') => {
    if (!user) return;

    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('training_responses')
        .update({
          status,
          admin_feedback: feedback || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', responseId);

      if (error) throw error;

      await loadUserResponses(selectedUser!);
      await loadUsers();
      setSelectedResponse(null);
      setFeedback('');
      
      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: status === 'approved' ? 'Odpowiedź została zatwierdzona.' : 'Odpowiedź została odrzucona.',
        type: 'success',
      });
    } catch (error) {
      console.error('Błąd weryfikacji odpowiedzi:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Wystąpił błąd podczas weryfikacji odpowiedzi. Spróbuj ponownie.',
        type: 'error',
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState variant="block" skeleton="rows" label="Ładowanie kursantów…" />;
  }

  const currentUserProgress = userProgress.find(p => p.userId === selectedUser);
  const pendingResponses = selectedUserResponses.filter(r => r.status === 'pending');
  const selectedLesson = selectedResponse ? findLesson(selectedResponse.step_code) : null;
  const selectedQuestion = selectedLesson?.quiz.find(q => q.id === selectedResponse?.question_code);

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista użytkowników */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight mb-4">Kursanci</h2>
            {userProgress.length === 0 ? (
              <div className="text-center text-gray-400 py-8 bg-white/5 rounded-xl">
                Brak kursantów
              </div>
            ) : (
              userProgress.map((progress) => (
                <div key={progress.userId}>
                  <div
                    onClick={() => setSelectedUser(selectedUser === progress.userId ? null : progress.userId)}
                    className={`bg-white/[0.02] rounded-lg p-3.5 border cursor-pointer transition-all duration-300 ${
                      selectedUser === progress.userId
                        ? 'border-[#fee715] shadow-lg shadow-[#fee715]/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300 truncate font-medium">
                          {progress.userEmail}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div className="w-20 bg-white/10 rounded-full h-2">
                          <div
                            className="bg-[#fee715] h-1.5 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#fee715]">
                            {progress.percentage}%
                          </div>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                            selectedUser === progress.userId ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {selectedUser === progress.userId && (
                    <div className="mt-3 bg-white/[0.02] rounded-lg p-5 border border-white/[0.06] space-y-4">
                      <div>
                        <h3 className="font-sans font-bold text-white mb-3 text-lg">
                          {progress.userName}
                        </h3>
                        {(() => {
                          const userProfile = users.find(u => u.id === progress.userId);
                          return userProfile && (
                            <div className="space-y-2 text-sm text-gray-300">
                              {userProfile.company_name && (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500">🏢</span>
                                  <span>{userProfile.company_name}</span>
                                </div>
                              )}
                              {userProfile.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone size={16} weight="regular" className="text-gray-500" />
                                  <span>{userProfile.phone}</span>
                                </div>
                              )}
                              {(userProfile.first_name || userProfile.last_name) && (
                                <div className="flex items-center gap-2">
                                  <User size={16} weight="regular" className="text-gray-500" />
                                  <span>{[userProfile.first_name, userProfile.last_name].filter(Boolean).join(' ')}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-400">Postęp ogólny</span>
                          <span className="text-sm font-semibold text-white">
                            {progress.completedLessons}/{progress.totalLessons} lekcji
                          </span>
                        </div>
                        
                        <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                          <div
                            className="bg-[#fee715] h-2 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 mb-2">Postęp w modułach:</p>
                          {progress.modules.map((module) => (
                            <div key={module.moduleId} className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Moduł {module.moduleId}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-white/10 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      module.completed 
                                        ? 'bg-emerald-500' 
                                        : 'bg-[#fee715]'
                                    }`}
                                    style={{ width: `${module.percentage}%` }}
                                  />
                                </div>
                                <span className={`font-semibold text-xs w-12 text-right ${
                                  module.completed ? 'text-green-400' : 'text-gray-400'
                                }`}>
                                  {module.percentage}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {pendingResponses.length > 0 && (
                        <div className="pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {pendingResponses.length} {pendingResponses.length === 1 ? 'odpowiedź oczekuje' : 'odpowiedzi oczekuje'} na weryfikację
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Szczegóły użytkownika i odpowiedzi */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedUser ? (
              <div className="bg-white/5 rounded-xl p-12 text-center text-gray-400">
                Wybierz kursanta, aby zobaczyć szczegóły
              </div>
            ) : (
              <>
                {currentUserProgress && (() => {
                  const userProfile = users.find(u => u.id === currentUserProgress.userId);
                  return (
                    <div className="bg-white/[0.02] rounded-lg p-5 border border-white/[0.06]">
                      <h3 className="font-sans text-xl font-bold text-white mb-4">
                        Postęp: {currentUserProgress.userName}
                      </h3>
                      
                      {userProfile && (
                        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                          <h4 className="font-sans font-semibold text-white mb-3">Dane kontaktowe</h4>
                          <div className="space-y-2 text-sm">
                            {userProfile.company_name && (
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-gray-500">Firma:</span>
                                <span>{userProfile.company_name}</span>
                              </div>
                            )}
                            {(userProfile.first_name || userProfile.last_name) && (
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-gray-500">Imię i nazwisko:</span>
                                <span>{[userProfile.first_name, userProfile.last_name].filter(Boolean).join(' ')}</span>
                              </div>
                            )}
                            {userProfile.phone && (
                              <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-gray-500">Telefon:</span>
                                <span>{userProfile.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="text-gray-500">Email:</span>
                              <span>{currentUserProgress.userEmail}</span>
                            </div>
                            {userProfile.notes && (
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <p className="text-gray-500 mb-1">Notatki/Cele biznesowe:</p>
                                <p className="text-gray-300 whitespace-pre-wrap">{userProfile.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Ukończone lekcje</p>
                          <p className="text-2xl font-semibold text-white tracking-tight">
                            {currentUserProgress.completedLessons}/{currentUserProgress.totalLessons}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Postęp ogólny</p>
                          <p className="text-2xl font-semibold text-[#fee715] tracking-tight">
                            {currentUserProgress.percentage}%
                          </p>
                        </div>
                      </div>

                      {currentUserProgress.percentage === 100 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <button
                            onClick={async () => {
                              if (!selectedUser) return;
                              if (!confirm('Czy na pewno chcesz oznaczyć kurs jako gotowy do zakończenia? Użytkownik zobaczy ekran końcowy z formularzem certyfikatu.')) return;
                              
                              try {
                                setActionLoading(true);
                                
                                const { data: existingCert } = await supabase
                                  .from('course_certificates')
                                  .select('id')
                                  .eq('user_id', selectedUser)
                                  .maybeSingle();
                                
                                if (!existingCert) {
                                  const { error } = await supabase
                                    .from('course_certificates')
                                    .insert({
                                      user_id: selectedUser,
                                      full_name: '',
                                      company_name: '',
                                      email: currentUserProgress.userEmail,
                                      course_ready_to_complete: true
                                    });
                                  
                                  if (error) throw error;
                                } else {
                                  const { error } = await supabase
                                    .from('course_certificates')
                                    .update({
                                      course_ready_to_complete: true
                                    })
                                    .eq('user_id', selectedUser);
                                  
                                  if (error) throw error;
                                }
                                
                                setAlertModal({
                                  isOpen: true,
                                  title: 'Sukces',
                                  message: 'Kurs został oznaczony jako gotowy do zakończenia. Użytkownik zobaczy ekran końcowy z formularzem certyfikatu.',
                                  type: 'success'
                                });
                              } catch (error: any) {
                                console.error('Błąd oznaczania kursu:', error);
                                setAlertModal({
                                  isOpen: true,
                                  title: 'Błąd',
                                  message: 'Wystąpił błąd podczas oznaczania kursu: ' + (error.message || 'Nieznany błąd'),
                                  type: 'error'
                                });
                              } finally {
                                setActionLoading(false);
                              }
                            }}
                            disabled={actionLoading}
                            className="w-full bg-[#fee715] text-[#101820] font-sans font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            {actionLoading ? 'Oznaczanie...' : 'Zakończ Szkolenie'}
                          </button>
                          <p className="text-xs text-gray-400 mt-2 text-center">
                            Oznaczy kurs jako gotowy do zakończenia. Użytkownik zobaczy ekran końcowy z formularzem certyfikatu.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-sans text-xl font-bold text-white">
                      Odpowiedzi ({selectedUserResponses.length})
                    </h3>
                    <button
                      onClick={handleRefreshResponses}
                      disabled={refreshing}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
                    >
                      <svg 
                        className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {refreshing ? 'Odświeżanie...' : 'Odśwież'}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedUserResponses.length === 0 ? (
                      <div className="bg-white/5 rounded-xl p-8 text-center text-gray-400">
                        Brak odpowiedzi
                      </div>
                    ) : (
                      selectedUserResponses.map((response) => {
                        const lesson = findLesson(response.step_code);
                        const question = lesson?.quiz.find(q => q.id === response.question_code);
                        
                        return (
                          <div
                            key={response.id}
                            onClick={() => setSelectedResponse(response)}
                            className={`bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 relative ${
                              selectedResponse?.id === response.id
                                ? 'border-[#fee715] shadow-lg shadow-[#fee715]/20'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          >
                            {response.status === 'pending' && (
                              <button
                                onClick={(e) => handleQuickApprove(response.id, e)}
                                disabled={quickApproving === response.id}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-300 hover:text-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                title="Szybkie zatwierdzenie"
                              >
                                {quickApproving === response.id ? (
                                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            )}
                            <div className="flex items-start justify-between mb-3 pr-12">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-3 py-1 rounded-lg bg-white/10 text-xs font-semibold">
                                    {response.module_code.replace('modul_', 'Moduł ')} • {response.step_code}
                                  </span>
                                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                    response.status === 'pending'
                                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50'
                                      : response.status === 'approved'
                                      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                      : 'bg-red-500/20 text-red-300 border border-red-500/50'
                                  }`}>
                                    {response.status === 'pending' ? 'Oczekuje' : response.status === 'approved' ? 'Zatwierdzona' : 'Odrzucona'}
                                  </span>
                                </div>
                                <h4 className="font-sans font-bold text-white mb-2">
                                  {question?.question || 'Pytanie'}
                                </h4>
                                <div className="bg-white/5 rounded-lg p-3">
                                  <p className="text-gray-300 text-sm line-clamp-2">
                                    {response.answer_text}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {response.admin_feedback && (
                              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-sm text-blue-200">Feedback: {response.admin_feedback}</p>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      {/* Panel szczegółów odpowiedzi */}
      {selectedResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedResponse(null)} />
          <div className="relative bg-[#0a0d1f] rounded-xl p-5 border border-white/[0.08] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-base font-semibold text-white tracking-tight mb-4">
              Weryfikacja odpowiedzi
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Pytanie</label>
                <p className="text-white bg-white/5 rounded-lg p-3">
                  {selectedQuestion?.question || 'Brak pytania'}
                </p>
              </div>
              
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Odpowiedź</label>
                <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <p className="text-gray-200 whitespace-pre-wrap">{selectedResponse.answer_text}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Feedback (opcjonalnie)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Dodaj komentarz dla kursanta..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleReview(selectedResponse.id, 'approved')}
                disabled={actionLoading}
                className="flex-1 bg-emerald-500 text-white text-[13px] font-semibold py-2 px-3 rounded-md hover:brightness-110 transition-all disabled:opacity-50"
              >
                Zatwierdź
              </button>
              <button
                onClick={() => handleReview(selectedResponse.id, 'rejected')}
                disabled={actionLoading}
                className="flex-1 bg-red-500 text-white text-[13px] font-semibold py-2 px-3 rounded-md hover:brightness-110 transition-all disabled:opacity-50"
              >
                Odrzuć
              </button>
              <button
                onClick={() => {
                  setSelectedResponse(null);
                  setFeedback('');
                }}
                className="px-3 py-2 bg-white/[0.04] border border-white/[0.08] text-white/80 text-[13px] font-medium rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};
