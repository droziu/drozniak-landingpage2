import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingState } from './LoadingState';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - loading:', loading, 'user:', user?.email || 'brak użytkownika', 'pathname:', window.location.pathname);

  if (loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie…" />;
  }

  if (!user) {
    console.log('ProtectedRoute - brak użytkownika, przekierowanie do /login');
    return <Navigate to="/login" replace />;
  }

  // Przekieruj admina do /admin, jeśli próbuje wejść na /panel
  if (user.email === 'stanislaw@drozniak.com' && window.location.pathname === '/panel') {
    console.log('ProtectedRoute - admin na /panel, przekierowanie do /admin');
    return <Navigate to="/admin" replace />;
  }

  // Przekieruj zwykłego użytkownika do /panel, jeśli próbuje wejść na /admin
  if (user.email !== 'stanislaw@drozniak.com' && window.location.pathname === '/admin') {
    console.log('ProtectedRoute - zwykły użytkownik na /admin, przekierowanie do /panel');
    return <Navigate to="/panel" replace />;
  }

  console.log('ProtectedRoute - dostęp przyznany');
  return <>{children}</>;
};

