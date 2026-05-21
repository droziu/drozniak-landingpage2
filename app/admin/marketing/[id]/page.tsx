'use client';

// Cienki wrapper Next.js - cała logika lejka jest w shared component @/components/FunnelBuilder.
// Dzięki temu ścieżki /admin/marketing/:id i /panel/marketing/:id mają jedno źródło prawdy.
// Tryb (admin vs klient) rozpoznawany jest automatycznie po pathname (usePathname()).
import { FunnelBuilder } from '@/components/FunnelBuilder';

export default function AdminMarketingFunnelPage() {
  return <FunnelBuilder />;
}
