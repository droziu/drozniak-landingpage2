import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { AdminCoursesTab } from './AdminCoursesTab';
import { FunnelList } from './FunnelList';
import { ClientManagement } from './ClientManagement';
import { PanelClientsManagement } from './PanelClientsManagement';
import { ProposalsList } from './ProposalsList';
import { ProposalEditor } from './ProposalEditor';
import { LoadingState } from './LoadingState';
import { BookOpen, PresentationChart, Users, User, FileText } from 'phosphor-react';

type TabType = 'courses' | 'marketing' | 'clients' | 'panel-clients' | 'proposals';

export const AdminPanel: React.FC = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (location.pathname.startsWith('/admin/marketing')) return 'marketing';
    if (location.pathname.startsWith('/admin/clients')) return 'clients';
    if (location.pathname.startsWith('/admin/panel-clients')) return 'panel-clients';
    if (location.pathname.startsWith('/admin/proposals')) return 'proposals';
    return 'courses';
  });

  if (authLoading) {
    return <LoadingState variant="fullscreen" label="Ładowanie panelu…" />;
  }

  if (!user || user.email !== 'stanislaw@drozniak.com') {
    navigate('/login');
    return null;
  }

  const tabs = [
    { id: 'courses' as TabType, label: 'Kursy', icon: 'BookOpen' },
    { id: 'marketing' as TabType, label: 'Marketing', icon: 'PresentationChart' },
    { id: 'proposals' as TabType, label: 'Oferty', icon: 'FileText' },
    { id: 'clients' as TabType, label: 'Klienci', icon: 'Users' },
    { id: 'panel-clients' as TabType, label: 'Klienci panelu', icon: 'User' },
  ];

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
            onClick={async () => {
              await signOut();
              navigate('/login');
            }}
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
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'marketing') navigate('/admin/marketing');
                else if (tab.id === 'clients') navigate('/admin/clients');
                else if (tab.id === 'panel-clients') navigate('/admin/panel-clients');
                else if (tab.id === 'proposals') navigate('/admin/proposals');
                else navigate('/admin');
              }}
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
          {activeTab === 'proposals' && (
            location.pathname === '/admin/proposals' || location.pathname === '/admin/proposals/' ? (
              <ProposalsList />
            ) : (
              <ProposalEditor />
            )
          )}
          {activeTab === 'clients' && <ClientManagement />}
          {activeTab === 'panel-clients' && <PanelClientsManagement />}
        </div>
      </div>
    </div>
  );
};
