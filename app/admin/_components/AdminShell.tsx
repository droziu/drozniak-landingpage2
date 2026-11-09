'use client';

// Shared shell dla wszystkich podstron /admin/* (kursy, marketing, oferty, klienci, konta klientów).
// Jeden sidebar + topbar - eliminuje duplikację stylów między /admin a /admin/[slug].
// Strony pełnoekranowe (FunnelBuilder, ProposalEditor) NIE używają tego shella - są wyłączane w layout.tsx.

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { BookOpen, PresentationChart, Users, User, FileText, SignOut, House } from 'phosphor-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  match: (path: string) => boolean;
}

const NAV: NavItem[] = [
  {
    href: '/admin/courses',
    label: 'Kursy',
    icon: <BookOpen size={15} weight="regular" />,
    match: (p) => p === '/admin' || p === '/admin/courses' || p.startsWith('/admin/courses/'),
  },
  {
    href: '/admin/marketing',
    label: 'Marketing',
    icon: <PresentationChart size={15} weight="regular" />,
    match: (p) => p.startsWith('/admin/marketing'),
  },
  {
    href: '/admin/proposals',
    label: 'Oferty',
    icon: <FileText size={15} weight="regular" />,
    match: (p) => p.startsWith('/admin/proposals'),
  },
  {
    href: '/admin/clients',
    label: 'Klienci',
    icon: <Users size={15} weight="regular" />,
    match: (p) => p.startsWith('/admin/clients'),
  },
  {
    href: '/admin/panel-clients',
    label: 'Konta klienckie',
    icon: <User size={15} weight="regular" />,
    match: (p) => p.startsWith('/admin/panel-clients'),
  },
];

interface AdminShellProps {
  children: React.ReactNode;
  /** Nazwa aktualnej sekcji do topbar. Jeśli pominięte - auto z NAV.match() */
  title?: string;
  /** Akcje po prawej w topbar (np. button "Nowy lejek") */
  actions?: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children, title, actions }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || '';

  const currentNav = NAV.find((n) => n.match(pathname));
  const displayTitle = title ?? currentNav?.label ?? 'Panel';

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="h-screen bg-[#050714] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/[0.06] bg-[#0a0d1f] flex flex-col">
        {/* Brand */}
        <Link
          href="/admin"
          className="px-3.5 py-3.5 border-b border-white/[0.06] flex items-center gap-2.5 hover:bg-white/[0.02] transition-colors"
        >
          <div className="w-7 h-7 rounded-md bg-[#fee715] flex items-center justify-center shrink-0">
            <span className="text-[#050714] font-bold text-[13px]">D</span>
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white tracking-tight">Drożniak</div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.18em]">Admin</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-px overflow-y-auto">
          <div className="px-2 py-1 text-[9px] font-mono font-semibold text-white/30 uppercase tracking-[0.18em]">
            Workspace
          </div>
          {NAV.map((item) => {
            const isActive = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                  isActive ? 'bg-white/[0.07] text-white' : 'text-white/55 hover:bg-white/[0.04] hover:text-white/90'
                }`}
              >
                <span className={`shrink-0 ${isActive ? 'text-[#fee715]' : 'text-white/40 group-hover:text-white/70'} transition-colors`}>
                  {item.icon}
                </span>
                <span className="truncate font-medium tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-white/[0.06] p-2">
          <div className="flex items-center gap-2 px-1.5 py-1.5">
            <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
              <span className="text-[10px] text-white/70 font-medium">SD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11.5px] text-white/85 truncate">{user?.email}</div>
              <div className="text-[9px] font-mono text-white/35 uppercase tracking-wider">Admin</div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1 hover:bg-white/[0.06] rounded text-white/40 hover:text-white transition-colors"
              title="Wyloguj"
            >
              <SignOut size={13} weight="regular" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-11 border-b border-white/[0.06] bg-[#0a0d1f]/85 backdrop-blur-xl flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-2 text-[13px]">
            <House size={12} weight="regular" className="text-white/30" />
            <span className="text-white/30">/</span>
            <span className="text-white font-medium tracking-tight">{displayTitle}</span>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-5">{children}</div>
        </div>
      </main>
    </div>
  );
};
