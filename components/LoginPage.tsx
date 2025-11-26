import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './icons/Logo';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await signIn(email, password);

    if (signInError) {
      const errorMessage = signInError.message.toLowerCase();
      
      // Sprawdź czy to błąd związany z brakiem konfiguracji Supabase
      if (errorMessage.includes('failed to fetch') || errorMessage.includes('network') || errorMessage.includes('name_not_resolved')) {
        setError('Błąd połączenia z serwerem. Sprawdź, czy zmienne środowiskowe Supabase są poprawnie skonfigurowane w pliku .env.local');
      } else if (errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid credentials')) {
        setError('Nieprawidłowy email lub hasło. Sprawdź dane i spróbuj ponownie.');
      } else if (errorMessage.includes('email not confirmed') || errorMessage.includes('not confirmed')) {
        setError('Email nie został potwierdzony. Sprawdź swoją skrzynkę email (również folder spam) i kliknij link aktywacyjny.');
      } else if (errorMessage.includes('too many requests') || errorMessage.includes('rate limit')) {
        setError('Zbyt wiele prób logowania. Poczekaj chwilę i spróbuj ponownie za kilka minut.');
      } else if (errorMessage.includes('user not found')) {
        setError('Nie znaleziono użytkownika z tym adresem email. Sprawdź adres email.');
      } else {
        setError(`Wystąpił błąd podczas logowania: ${signInError.message}. Spróbuj ponownie.`);
      }
      setLoading(false);
    } else if (data?.user) {
      // Logowanie udane - sprawdź email i przekieruj
      const userEmail = data.user.email;
      console.log('Logowanie udane, email:', userEmail);
      setLoading(false);
      
      // Poczekaj chwilę, żeby sesja się zaktualizowała, potem przekieruj
      // Używamy navigate zamiast window.location.href, żeby React Router mógł obsłużyć routing
      setTimeout(() => {
        if (userEmail === 'stanislaw@drozniak.com') {
          console.log('Przekierowanie admina do /admin');
          navigate('/admin', { replace: true });
        } else {
          console.log('Przekierowanie użytkownika do /panel');
          navigate('/panel', { replace: true });
        }
      }, 200);
    } else {
      // Brak danych użytkownika - nieoczekiwany błąd
      console.error('Logowanie udane, ale brak danych użytkownika:', data);
      setError('Logowanie udane, ale wystąpił problem z pobraniem danych użytkownika. Spróbuj odświeżyć stronę.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101820] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="font-[Montserrat] text-3xl font-bold text-white mb-2">
            Panel Klienta
          </h1>
          <p className="text-gray-400">
            Zaloguj się, aby uzyskać dostęp do szkolenia
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Komunikat błędu */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                placeholder="twoj@email.pl"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Hasło
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-6 rounded-lg hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logowanie...
                </span>
              ) : (
                'Zaloguj się'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

