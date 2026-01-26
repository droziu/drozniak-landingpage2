'use client';

import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sprawdź aktualną sesję
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Błąd pobierania sesji:', error);
      }
      console.log('Sesja załadowana:', session?.user?.email || 'brak sesji');
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Nasłuchuj zmian w autentykacji
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Zmiana stanu autentykacji:', event, session?.user?.email || 'brak sesji');
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    updatePassword,
  };
};
