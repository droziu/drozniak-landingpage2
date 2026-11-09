'use client';

// /admin → domyślnie pokazuje sekcję Kursy. Layout (AdminShell) zapewnia sidebar + topbar.
import { AdminCoursesTab } from '@/components/AdminCoursesTab';

export default function AdminRootPage() {
  return <AdminCoursesTab />;
}
