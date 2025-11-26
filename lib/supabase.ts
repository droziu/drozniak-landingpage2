import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Sprawdź czy zmienne środowiskowe są ustawione
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = `
╔══════════════════════════════════════════════════════════════╗
║  BŁĄD: Brakuje zmiennych środowiskowych Supabase!           ║
╠══════════════════════════════════════════════════════════════╣
║  Utwórz plik .env.local w głównym katalogu projektu i dodaj: ║
║                                                              ║
║  VITE_SUPABASE_URL=https://twoj-projekt.supabase.co          ║
║  VITE_SUPABASE_ANON_KEY=twoj-anon-key                       ║
║                                                              ║
║  Po dodaniu zmiennych zrestartuj serwer dev (Ctrl+C i npm   ║
║  run dev ponownie).                                          ║
╚══════════════════════════════════════════════════════════════╝
  `;
  console.error(errorMessage);
  throw new Error('Missing Supabase environment variables. Check console for details.');
}

// Utwórz klienta Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

