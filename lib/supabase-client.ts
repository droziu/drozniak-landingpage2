'use client';

import { createClient } from '@supabase/supabase-js';

// W Next.js zmienne środowiskowe dla klienta MUSZĄ mieć prefix NEXT_PUBLIC_
// Dla kompatybilności wstecznej sprawdzamy też VITE_ (ale tylko jeśli są dostępne)
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  (typeof process !== 'undefined' && process.env.VITE_SUPABASE_URL) ||
  '';
    
const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  (typeof process !== 'undefined' && process.env.VITE_SUPABASE_ANON_KEY) ||
  '';

// Sprawdź czy zmienne środowiskowe są ustawione
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
╔══════════════════════════════════════════════════════════════╗
║  BŁĄD: Brakuje zmiennych środowiskowych Supabase!           ║
╠══════════════════════════════════════════════════════════════╣
║  W Next.js zmienne dla klienta MUSZĄ mieć prefix            ║
║  NEXT_PUBLIC_                                                ║
║                                                              ║
║  Dodaj do .env.local:                                        ║
║                                                              ║
║  NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co   ║
║  NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj-anon-key                ║
║                                                              ║
║  LUB zmień istniejące VITE_ na NEXT_PUBLIC_:                ║
║  VITE_SUPABASE_URL → NEXT_PUBLIC_SUPABASE_URL                ║
║  VITE_SUPABASE_ANON_KEY → NEXT_PUBLIC_SUPABASE_ANON_KEY     ║
╚══════════════════════════════════════════════════════════════╝
  `;
  console.error(errorMessage);
  throw new Error('Missing Supabase environment variables. Check console for details.');
}

// Utwórz klienta Supabase dla Client Components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
