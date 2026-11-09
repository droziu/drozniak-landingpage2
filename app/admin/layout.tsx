'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { LoadingState } from '@/components/LoadingState';
import { AdminShell } from './_components/AdminShell';

// Pełnoekranowe podstrony - bez AdminShell (mają własny header/sidebar)
const FULLSCREEN_PATTERNS = [
  /^\/admin\/marketing\/[^/]+$/, // /admin/marketing/{id}
  /^\/admin\/proposals\/[^/]+$/, // /admin/proposals/{id} i /admin/proposals/new
];

const isFullscreenRoute = (path: string): boolean =>
  FULLSCREEN_PATTERNS.some((re) => re.test(path));

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || '';

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
    return null;
  }

  // Strony pełnoekranowe (FunnelBuilder, ProposalEditor) - bez shella
  if (isFullscreenRoute(pathname)) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
