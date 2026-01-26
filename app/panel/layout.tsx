'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingState } from '@/components/LoadingState';

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user) {
    return null; // Przekierowanie w useEffect
  }

  return <>{children}</>;
}
