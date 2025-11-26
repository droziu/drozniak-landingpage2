import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from './LoginPage';
import { TrainingPage } from './TrainingPage';

/**
 * Komponent głównej ścieżki dla panelu klienta
 * Jeśli użytkownik jest zalogowany, przekierowuje do /panel
 * Jeśli nie, pokazuje stronę logowania
 * 
 * Używany na subdomenie panel.drozniak.pl gdzie główna ścieżka "/" 
 * powinna pokazywać login lub panel
 */
export const PanelRoot: React.FC = () => {
  const { user, loading } = useAuth();

  console.log('PanelRoot - loading:', loading, 'user:', user?.email || 'brak użytkownika');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-white text-lg">Ładowanie...</div>
      </div>
    );
  }

  if (user) {
    // Przekieruj admina do /admin, zwykłych użytkowników do /panel
    if (user.email === 'stanislaw@drozniak.com') {
      console.log('PanelRoot - admin, przekierowanie do /admin');
      return <Navigate to="/admin" replace />;
    } else {
      console.log('PanelRoot - użytkownik, przekierowanie do /panel');
      return <Navigate to="/panel" replace />;
    }
  }

  console.log('PanelRoot - brak użytkownika, pokazanie LoginPage');
  return <LoginPage />;
};

