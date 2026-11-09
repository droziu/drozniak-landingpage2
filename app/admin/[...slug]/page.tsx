'use client';

// Catch-all route dla podstron /admin/{courses,marketing,clients,panel-clients,proposals}.
// Layout (AdminShell) zapewnia sidebar + topbar - tu renderujemy tylko content sekcji.

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminCoursesTab } from '@/components/AdminCoursesTab';
import { FunnelList } from '@/app/components/FunnelList';
import { ClientManagement } from '@/components/ClientManagement';
import { PanelClientsManagement } from '@/components/PanelClientsManagement';
import { ProposalsList } from '@/app/components/ProposalsList';

export default function AdminSlugPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const [, setResolvedParams] = useState<{ slug?: string[] } | null>(null);
  const pathname = usePathname() || '';

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (pathname.startsWith('/admin/marketing')) return <FunnelList />;
  if (pathname.startsWith('/admin/clients')) return <ClientManagement />;
  if (pathname.startsWith('/admin/panel-clients')) return <PanelClientsManagement />;
  if (pathname.startsWith('/admin/proposals')) return <ProposalsList />;
  return <AdminCoursesTab />;
}
