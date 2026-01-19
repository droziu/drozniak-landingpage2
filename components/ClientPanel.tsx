import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useClientPanel, type ViewTag } from '../hooks/useClientPanel';
import { UserMenu } from './UserMenu';
import { ClientDocumentsView } from './ClientDocumentsView';
import { ClientMarketingView } from './ClientMarketingView';
import { ClientDataView } from './ClientDataView';
import { ClientProjectsView } from './ClientProjectsView';
import { ClientCoursesView } from './ClientCoursesView';
import { LoadingState } from './LoadingState';

const TAB: Record<ViewTag, { path: string; label: string }> = {
  documents: { path: 'documents', label: 'Umowy i dokumenty' },
  courses: { path: 'courses', label: 'Kursy' },
  marketing: { path: 'marketing', label: 'Marketing' },
  data: { path: 'data', label: 'Dane' },
  projects: { path: 'projects', label: 'Projekty' },
};

/** Kolejność widoków w menu: najpierw Dane, potem reszta */
const TAB_ORDER: ViewTag[] = ['data', 'documents', 'courses', 'marketing', 'projects'];

const sortViewGrants = (grants: ViewTag[]): ViewTag[] =>
  TAB_ORDER.filter((t) => grants.includes(t));

export const ClientPanel: React.FC = () => {
  const { user, loading: authLoading, updatePassword } = useAuth();
  const { panelClient, viewGrants, loading } = useClientPanel();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  if (authLoading || loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!panelClient) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-gray-400 text-sm mb-2">Nie masz przypisanego konta klienta.</p>
          <p className="text-gray-500 text-xs">Skontaktuj się z administratorem.</p>
        </div>
      </div>
    );
  }

  if (viewGrants.length === 0) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-gray-400 text-sm mb-2">Brak przypisanych modułów.</p>
          <p className="text-gray-500 text-xs">Skontaktuj się z administratorem.</p>
        </div>
      </div>
    );
  }

  const base = '/panel';
  const seg = location.pathname.replace(/^\/panel\/?/, '') || '';
  const activeTab = (seg.split('/')[0] || '') as ViewTag;
  const orderedGrants = sortViewGrants(viewGrants);

  // Redirect /panel or /panel/ do pierwszego widoku (Dane, jeśli ma; inaczej pierwszy z listy)
  if (!seg || seg === '') {
    const first = TAB[orderedGrants[0]];
    if (first) {
      navigate(`${base}/${first.path}`, { replace: true });
      return <LoadingState variant="fullscreen" label="Ładowanie…" />;
    }
  }

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

  const onPasswordChange = () => setShowPasswordModal(true);
  const onProfileClick = () => navigate(`${base}/data`);

  const renderContent = () => {
    if (activeTab === 'documents') return <ClientDocumentsView />;
    if (activeTab === 'courses') return <ClientCoursesView />;
    if (activeTab === 'marketing') return <ClientMarketingView panelClient={panelClient} />;
    if (activeTab === 'data') return <ClientDataView />;
    if (activeTab === 'projects') return <ClientProjectsView />;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#101820] text-white flex flex-col">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#101820]/95">
        <h1 className="font-[Montserrat] text-base font-semibold text-white">Panel klienta</h1>
        <UserMenu onPasswordChange={onPasswordChange} onProfileClick={onProfileClick} />
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="flex-shrink-0 w-48 border-r border-white/10 bg-white/[0.02] py-3">
          <nav className="px-2 space-y-0.5">
            {orderedGrants.map((t) => {
              const { path, label } = TAB[t];
              const to = `${base}/${path}`;
              return (
                <NavLink
                  key={t}
                  to={to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-[#fee715]/20 text-[#fee715]' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto px-4 py-4">
          {renderContent()}
        </main>
      </div>

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
