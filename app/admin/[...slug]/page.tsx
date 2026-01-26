'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AdminCoursesTab } from '@/components/AdminCoursesTab';
import { FunnelList } from '@/app/components/FunnelList';
import { ClientManagement } from '@/components/ClientManagement';
import { PanelClientsManagement } from '@/components/PanelClientsManagement';
import { ProposalsList } from '@/app/components/ProposalsList';
import { LoadingState } from '@/components/LoadingState';
import { BookOpen, PresentationChart, Users, User, FileText } from 'phosphor-react';

type TabType = 'courses' | 'marketing' | 'clients' | 'panel-clients' | 'proposals';

export default function AdminPanelPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ slug?: string[] } | null>(null);
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (pathname.startsWith('/admin/marketing')) return 'marketing';
    if (pathname.startsWith('/admin/clients')) return 'clients';
    if (pathname.startsWith('/admin/panel-clients')) return 'panel-clients';
    if (pathname.startsWith('/admin/proposals')) return 'proposals';
    return 'courses';
  });

  // Resolve params (Next.js 15+)
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Update active tab when pathname changes
  useEffect(() => {
    if (pathname.startsWith('/admin/marketing')) setActiveTab('marketing');
    else if (pathname.startsWith('/admin/clients')) setActiveTab('clients');
    else if (pathname.startsWith('/admin/panel-clients')) setActiveTab('panel-clients');
    else if (pathname.startsWith('/admin/proposals')) setActiveTab('proposals');
    else setActiveTab('courses');
  }, [pathname]);

  if (authLoading || !resolvedParams) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user || user.email !== 'stanislaw@drozniak.com') {
    router.push('/login');
    return null;
  }

  const tabs = [
    { id: 'courses' as TabType, label: 'Kursy', icon: 'BookOpen' },
    { id: 'marketing' as TabType, label: 'Marketing', icon: 'PresentationChart' },
    { id: 'proposals' as TabType, label: 'Oferty', icon: 'FileText' },
    { id: 'clients' as TabType, label: 'Klienci', icon: 'Users' },
    { id: 'panel-clients' as TabType, label: 'Klienci panelu', icon: 'User' },
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    if (tabId === 'marketing') router.push('/admin/marketing');
    else if (tabId === 'clients') router.push('/admin/clients');
    else if (tabId === 'panel-clients') router.push('/admin/panel-clients');
    else if (tabId === 'proposals') router.push('/admin/proposals');
    else router.push('/admin/courses');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-[Montserrat] text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
                Panel Administratora
              </span>
            </h1>
            <p className="text-gray-400">Zarządzanie kursantami, lejkami marketingowymi i klientami</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300 border border-white/20"
          >
            Wyloguj
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-6 py-3 font-[Montserrat] font-semibold transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#fee715] text-[#fee715]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2 inline-flex items-center">
                {tab.icon === 'BookOpen' && <BookOpen size={18} weight="regular" />}
                {tab.icon === 'PresentationChart' && <PresentationChart size={18} weight="regular" />}
                {tab.icon === 'FileText' && <FileText size={18} weight="regular" />}
                {tab.icon === 'Users' && <Users size={18} weight="regular" />}
                {tab.icon === 'User' && <User size={18} weight="regular" />}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'courses' && <AdminCoursesTab />}
          {activeTab === 'marketing' && <FunnelList />}
          {activeTab === 'proposals' && pathname === '/admin/proposals' && <ProposalsList />}
          {activeTab === 'clients' && <ClientManagement />}
          {activeTab === 'panel-clients' && <PanelClientsManagement />}
        </div>
      </div>
    </div>
  );
}
