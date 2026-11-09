'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FileText, BookOpen, PresentationChart, User, FolderOpen } from 'phosphor-react';
import { useAuth } from '@/app/hooks/useAuth';
import { useClientPanel, type ViewTag } from '@/app/hooks/useClientPanel';
import { UserMenu } from '@/app/components/UserMenu';
import { ClientDocumentsView } from '@/components/ClientDocumentsView';
import { ClientMarketingView } from '@/components/ClientMarketingView';
import { ClientDataView } from '@/components/ClientDataView';
import { ClientProjectsView } from '@/components/ClientProjectsView';
import { ClientCoursesView } from '@/app/components/ClientCoursesView';
import { LoadingState } from '@/components/LoadingState';

const TAB: Record<ViewTag, { path: string; label: string; icon: React.ReactNode }> = {
  documents: { path: 'documents', label: 'Dokumenty', icon: <FileText size={16} weight="regular" /> },
  courses: { path: 'courses', label: 'Kursy', icon: <BookOpen size={16} weight="regular" /> },
  marketing: { path: 'marketing', label: 'Marketing', icon: <PresentationChart size={16} weight="regular" /> },
  data: { path: 'data', label: 'Dane', icon: <User size={16} weight="regular" /> },
  projects: { path: 'projects', label: 'Projekty', icon: <FolderOpen size={16} weight="regular" /> },
};

/** Kolejność widoków w menu: najpierw Dane, potem reszta */
const TAB_ORDER: ViewTag[] = ['data', 'documents', 'courses', 'marketing', 'projects'];

const sortViewGrants = (grants: ViewTag[]): ViewTag[] =>
  TAB_ORDER.filter((t) => grants.includes(t));

export default function ClientPanelPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ slug?: string[] } | null>(null);
  const { user, loading: authLoading, updatePassword } = useAuth();
  const { panelClient, viewGrants, loading } = useClientPanel();
  const router = useRouter();
  const pathname = usePathname();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Resolve params (Next.js 15+)
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Resolve active tab from pathname
  const seg = pathname.replace(/^\/panel\/?/, '') || '';
  const activeTab = (seg.split('/')[0] || '') as ViewTag;
  const orderedGrants = sortViewGrants(viewGrants);

  // Redirect /panel or /panel/ do pierwszego widoku (Dane, jeśli ma; inaczej pierwszy z listy)
  useEffect(() => {
    if (!loading && !authLoading && orderedGrants.length > 0 && (!seg || seg === '')) {
      const first = TAB[orderedGrants[0]];
      if (first) {
        router.replace(`/panel/${first.path}`);
      }
    }
  }, [loading, authLoading, orderedGrants, seg, router]);

  if (authLoading || loading || !resolvedParams) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (!panelClient) {
    return (
      <div className="min-h-screen bg-[#050714] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-white/70 text-sm mb-2">Nie masz przypisanego konta klienta.</p>
          <p className="text-white/40 text-xs">Skontaktuj się z administratorem.</p>
        </div>
      </div>
    );
  }

  if (viewGrants.length === 0) {
    return (
      <div className="min-h-screen bg-[#050714] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-white/70 text-sm mb-2">Brak przypisanych modułów.</p>
          <p className="text-white/40 text-xs">Skontaktuj się z administratorem.</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting
  if (!seg || seg === '') {
    return <LoadingState variant="fullscreen" label="Ładowanie…" />;
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
  const onProfileClick = () => router.push('/panel/data');

  const renderContent = () => {
    if (activeTab === 'documents') return <ClientDocumentsView />;
    if (activeTab === 'courses') return <ClientCoursesView />;
    if (activeTab === 'marketing') return <ClientMarketingView panelClient={panelClient} />;
    if (activeTab === 'data') return <ClientDataView />;
    if (activeTab === 'projects') return <ClientProjectsView />;
    return null;
  };

  const currentTab = activeTab && TAB[activeTab as ViewTag];

  return (
    <div className="min-h-screen bg-[#050714] text-white flex">
      {/* Sidebar - spójny z Admin Panel (Linear style) */}
      <aside className="w-60 shrink-0 border-r border-white/[0.06] bg-[#0a0d1f]/85 backdrop-blur-xl flex flex-col">
        {/* Brand */}
        <div className="px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#fee715] flex items-center justify-center shrink-0">
              <span className="text-[#050714] font-bold text-sm">D</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-white tracking-tight truncate">Drożniak</div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Panel klienta</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          <div className="px-2 py-1.5 text-[10px] font-mono font-semibold text-white/30 uppercase tracking-[0.16em]">Moduły</div>
          {orderedGrants.map((t) => {
            const { path, label, icon } = TAB[t];
            const href = `/panel/${path}`;
            const isActive = activeTab === t;
            return (
              <Link
                key={t}
                href={href}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-white/[0.06] text-white'
                    : 'text-white/60 hover:bg-white/[0.04] hover:text-white/90'
                }`}
              >
                <span className={`shrink-0 transition-colors ${isActive ? 'text-[#fee715]' : 'text-white/40'}`}>
                  {icon}
                </span>
                <span className="truncate tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-2 py-3 border-t border-white/[0.06]">
          <UserMenu onPasswordChange={onPasswordChange} onProfileClick={onProfileClick} />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-12 border-b border-white/[0.06] bg-[#0a0d1f]/85 backdrop-blur-xl flex items-center px-5 shrink-0">
          <h1 className="text-[14px] font-semibold text-white tracking-tight">
            {currentTab?.label || 'Panel klienta'}
          </h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Modal zmiany hasła */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#0a0d1f] border border-white/[0.08] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold text-white tracking-tight">
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
                <label htmlFor="newPassword" className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Nowe hasło <span className="text-white/30 ml-1 normal-case font-sans tracking-normal">(min. 6 znaków)</span>
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
                  Potwierdź nowe hasło
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError(null);
                    setPasswordSuccess(null);
                    setNewPassword('');
                    setConfirmNewPassword('');
                  }}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm font-medium py-2 px-4 rounded-md hover:bg-white/[0.08] hover:text-white transition-colors"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 bg-[#fee715] text-[#050714] text-sm font-semibold py-2 px-4 rounded-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-[#fee715]/20"
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
}
