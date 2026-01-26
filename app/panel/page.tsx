'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClientPanel } from '@/app/hooks/useClientPanel';
import { LoadingState } from '@/components/LoadingState';

const TAB: Record<string, { path: string; label: string }> = {
  documents: { path: 'documents', label: 'Umowy i dokumenty' },
  courses: { path: 'courses', label: 'Kursy' },
  marketing: { path: 'marketing', label: 'Marketing' },
  data: { path: 'data', label: 'Dane' },
  projects: { path: 'projects', label: 'Projekty' },
};

const TAB_ORDER = ['data', 'documents', 'courses', 'marketing', 'projects'];

export default function PanelRootPage() {
  const router = useRouter();
  const { panelClient, viewGrants, loading } = useClientPanel();

  useEffect(() => {
    if (!loading) {
      // Jeśli nie ma panelu klienta, przekieruj do widoku z komunikatem
      if (!panelClient) {
        // Użyj catch-all route, który obsłuży brak panelu
        router.replace('/panel/data');
        return;
      }
      
      // Jeśli nie ma uprawnień, przekieruj do widoku z komunikatem
      if (viewGrants.length === 0) {
        router.replace('/panel/data');
        return;
      }
      
      // Jeśli są uprawnienia, przekieruj do pierwszego dostępnego widoku
      if (viewGrants.length > 0) {
        const orderedGrants = TAB_ORDER.filter((t) => viewGrants.includes(t as any));
        const first = TAB[orderedGrants[0]];
        if (first) {
          router.replace(`/panel/${first.path}`);
        }
      }
    }
  }, [loading, panelClient, viewGrants, router]);

  return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
}
