'use client';

// Cienki wrapper Next.js - shared component poznaje tryb klienta po pathname (/panel/marketing/...)
// i automatycznie blokuje edycję + otwiera panel komentarzy.
import { FunnelBuilder } from '@/components/FunnelBuilder';

export default function ClientMarketingFunnelPage() {
  return <FunnelBuilder />;
}
