'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingState } from '@/components/LoadingState';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.email !== 'stanislaw@drozniak.com') {
        router.push('/panel');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user || user.email !== 'stanislaw@drozniak.com') {
    return null; // Przekierowanie w useEffect
  }

  return <>{children}</>;
}
