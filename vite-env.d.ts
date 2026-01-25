/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VERCEL_ENV?: 'production' | 'preview' | 'development';
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
