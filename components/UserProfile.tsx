import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { AlertModal } from './AlertModal';

interface UserProfileData {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  notes: string | null;
  email: string | null;
  full_name: string | null;
}

export const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>({
    company_name: '',
    first_name: '',
    last_name: '',
    phone: '',
    notes: '',
    email: '',
    full_name: '',
  });
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (user) {
      // Ustaw email od razu z user.email
      setProfileData(prev => ({
        ...prev,
        email: user.email || '',
      }));
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      // Jeśli profil istnieje, użyj danych z bazy, w przeciwnym razie użyj wartości domyślnych
      if (data) {
        setProfileData({
          company_name: data.company_name || '',
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
          notes: data.notes || '',
          email: user.email || '', // Zawsze używaj emaila z auth.users
          full_name: data.full_name || '',
        });
      } else {
        // Jeśli profil nie istnieje, użyj wartości domyślnych
        setProfileData({
          company_name: '',
          first_name: '',
          last_name: '',
          phone: '',
          notes: '',
          email: user.email || '',
          full_name: '',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Błąd ładowania profilu:', error);
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      // Oblicz full_name z first_name i last_name
      const fullName = [profileData.first_name, profileData.last_name]
        .filter(Boolean)
        .join(' ') || null;

      // Użyj upsert zamiast update, żeby tworzyć profil jeśli nie istnieje
      // UWAGA: email NIE jest zapisywany do profiles - jest tylko w auth.users
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id, // Klucz główny
          company_name: profileData.company_name || null,
          first_name: profileData.first_name || null,
          last_name: profileData.last_name || null,
          phone: profileData.phone || null,
          notes: profileData.notes || null,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id' // Konflikt na podstawie id
        });

      if (error) {
        console.error('Szczegóły błędu:', error);
        throw error;
      }

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Dane zostały zapisane pomyślnie!',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Błąd zapisywania profilu:', error);
      const errorMessage = error?.message || 'Wystąpił błąd podczas zapisywania danych. Spróbuj ponownie.';
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-white text-lg">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101820] text-white">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <button
            onClick={() => navigate('/panel')}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Powrót do kursu
          </button>
          <h1 className="font-[Montserrat] text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] bg-clip-text text-transparent">
              Mój Profil
            </span>
          </h1>
          <p className="text-gray-400">Zarządzaj swoimi danymi</p>
        </div>

        <form onSubmit={handleSave} className="bg-gradient-to-br from-white/5 to-white/3 rounded-xl p-8 border-2 border-white/10">
          <div className="space-y-6">
            {/* Email (tylko do odczytu) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileData.email || user?.email || ''}
                disabled
                readOnly
                className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-3 text-white cursor-not-allowed"
                style={{ opacity: 0.8 }}
              />
              <p className="text-xs text-gray-400 mt-1">Email nie może być zmieniony</p>
            </div>

            {/* Nazwa firmy */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nazwa firmy
              </label>
              <input
                type="text"
                value={profileData.company_name || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Wprowadź nazwę firmy"
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] transition-all"
              />
            </div>

            {/* Imię i Nazwisko */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Imię
                </label>
                <input
                  type="text"
                  value={profileData.first_name || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Wprowadź imię"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nazwisko
                </label>
                <input
                  type="text"
                  value={profileData.last_name || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Wprowadź nazwisko"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] transition-all"
                />
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                value={profileData.phone || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Wprowadź numer telefonu"
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] transition-all"
              />
            </div>

            {/* Notatki/Cele biznesowe */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notatki / Cele biznesowe
              </label>
              <textarea
                value={profileData.notes || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Wprowadź swoje cele biznesowe, notatki lub inne informacje..."
                rows={6}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715] transition-all resize-none"
              />
            </div>

            {/* Przycisk zapisz */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:shadow-[#fee715]/40 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Zapisywanie...
                  </span>
                ) : (
                  'Zapisz zmiany'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Modal alertów */}
      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

