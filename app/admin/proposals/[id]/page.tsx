'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from '@/components/AlertModal';
import { CustomSelect } from '@/components/CustomSelect';
import { LoadingState } from '@/components/LoadingState';
import { ArrowLeft, Plus, Trash, Copy, Link as LinkIcon, Eye } from 'phosphor-react';

interface ProposalSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'pricing';
  items?: string[];
  price?: number;
}

interface ProposalVersion {
  id: string;
  version_number: number;
  content: { sections: ProposalSection[] };
  created_at: string;
  created_by: string;
}

interface Proposal {
  id: string;
  title: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'archived';
  client_id: string | null;
  marketing_client_id: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export default function ProposalEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [id, setId] = useState<string | null>(null);
  const isNew = id === 'new';

  // Resolve params (Next.js 15+)
  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      setId(p.id);
    });
  }, [params]);

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [versions, setVersions] = useState<ProposalVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<number>(1);
  const [sections, setSections] = useState<ProposalSection[]>([
    { title: 'Wprowadzenie', content: '', type: 'text' }
  ]);

  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState<string>('');
  const [marketingClientId, setMarketingClientId] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'archived'>('draft');
  const [validUntil, setValidUntil] = useState<string>('');

  const [clients, setClients] = useState<Array<{ id: string; name: string; company_name: string | null }>>([]);
  const [marketingClients, setMarketingClients] = useState<Array<{ id: string; name: string; company_name: string | null }>>([]);
  const [accessLink, setAccessLink] = useState<{ token: string; link: string } | null>(null);
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  useEffect(() => {
    const initializeEditor = async () => {
      if (user && id) {
        try {
          await loadClients();
          if (!isNew) {
            await loadProposal();
          } else {
            setLoading(false);
          }
        } catch (error: any) {
          console.error('Błąd inicjalizacji edytora:', error);
          setLoading(false);
          if (!isNew) {
            setAlertModal({
              isOpen: true,
              title: 'Błąd',
              message: 'Nie udało się załadować danych: ' + (error.message || 'Nieznany błąd'),
              type: 'error',
            });
          }
        }
      } else {
        setLoading(false);
      }
    };

    initializeEditor();
  }, [user, id]);

  const loadClients = async () => {
    const [pcRes, mcRes] = await Promise.all([
      supabase.from('panel_clients').select('id, name, company_name').order('name'),
      supabase.from('marketing_clients').select('id, name, company_name').eq('status', 'active').order('name'),
    ]);
    setClients(pcRes.data || []);
    setMarketingClients(mcRes.data || []);
  };

  const loadProposal = async () => {
    if (!id || !user) return;
    setLoading(true);
    try {
      const { data: propData, error: propError } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single();

      if (propError) throw propError;

      setProposal(propData);
      setTitle(propData.title);
      setClientId(propData.client_id || '');
      setMarketingClientId(propData.marketing_client_id || '');
      setStatus(propData.status);
      setValidUntil(propData.valid_until ? propData.valid_until.split('T')[0] : '');

      // Pobierz wersje
      const { data: versData, error: versError } = await supabase
        .from('proposal_versions')
        .select('*')
        .eq('proposal_id', id)
        .order('version_number', { ascending: false });

      if (!versError && versData) {
        setVersions(versData);
        if (versData.length > 0) {
          const latest = versData[0];
          setCurrentVersion(latest.version_number);
          setSections(latest.content.sections || [{ title: 'Wprowadzenie', content: '', type: 'text' }]);
        }
      }

      // Pobierz link dostępowy
      const { data: linkData } = await supabase
        .from('proposal_access_links')
        .select('token')
        .eq('proposal_id', id)
        .eq('status', 'active')
        .single();

      if (linkData) {
        const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${linkData.token}` : '';
        setAccessLink({ token: linkData.token, link: publicUrl });
      }
    } catch (error: any) {
      console.error('Błąd ładowania oferty:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się załadować oferty: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !title.trim() || !id) {
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Tytuł oferty jest wymagany.',
        type: 'error',
      });
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        // Utwórz nową ofertę
        const { data: newProposal, error: propError } = await supabase
          .from('proposals')
          .insert({
            title: title.trim(),
            client_id: clientId || null,
            marketing_client_id: marketingClientId || null,
            status: 'draft',
            valid_until: validUntil ? new Date(validUntil).toISOString() : null,
            created_by: user.id,
          })
          .select()
          .single();

        if (propError) throw propError;

        // Utwórz pierwszą wersję
        const { error: versError } = await supabase
          .from('proposal_versions')
          .insert({
            proposal_id: newProposal.id,
            version_number: 1,
            content: { sections },
            created_by: user.id,
          });

        if (versError) throw versError;

        setAlertModal({
          isOpen: true,
          title: 'Sukces',
          message: 'Oferta została utworzona.',
          type: 'success',
        });

        router.push(`/admin/proposals/${newProposal.id}`);
      } else {
        // Aktualizuj ofertę
        const { error: propError } = await supabase
          .from('proposals')
          .update({
            title: title.trim(),
            client_id: clientId || null,
            marketing_client_id: marketingClientId || null,
            status,
            valid_until: validUntil ? new Date(validUntil).toISOString() : null,
          })
          .eq('id', id);

        if (propError) throw propError;

        // Sprawdź czy treść się zmieniła (porównaj z najnowszą wersją)
        const latestVersion = versions[0];
        const contentChanged = !latestVersion || JSON.stringify({ sections }) !== JSON.stringify(latestVersion.content);

        if (contentChanged) {
          // Utwórz nową wersję
          const nextVersionNumber = latestVersion ? latestVersion.version_number + 1 : 1;
          const { error: versError } = await supabase
            .from('proposal_versions')
            .insert({
              proposal_id: id,
              version_number: nextVersionNumber,
              content: { sections },
              created_by: user.id,
            });

          if (versError) throw versError;
          setCurrentVersion(nextVersionNumber);
        }

        setAlertModal({
          isOpen: true,
          title: 'Sukces',
          message: 'Oferta została zaktualizowana.',
          type: 'success',
        });

        await loadProposal();
      }
    } catch (error: any) {
      console.error('Błąd zapisywania oferty:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zapisać oferty: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateLink = async () => {
    if (!id || !user) return;
    try {
      const { data, error } = await supabase.rpc('generate_proposal_link', {
        proposal_uuid: id,
        user_uuid: user.id,
      });

      if (error) throw error;

      // generate_proposal_link zwraca TABLE, więc data to tablica
      if (data && Array.isArray(data) && data.length > 0) {
        const token = data[0].token;
        const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/p/${token}` : '';
        setAccessLink({ token, link: publicUrl });

        setAlertModal({
          isOpen: true,
          title: 'Sukces',
          message: 'Link został wygenerowany.',
          type: 'success',
        });

        // Kopiuj do schowka
        if (typeof window !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(publicUrl);
        }
      }
    } catch (error: any) {
      console.error('Błąd generowania linku:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się wygenerować linku: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  };

  const addSection = (type: 'text' | 'list' | 'pricing') => {
    const newSection: ProposalSection = {
      title: '',
      content: '',
      type,
      ...(type === 'list' && { items: [''] }),
      ...(type === 'pricing' && { price: 0 }),
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, updates: Partial<ProposalSection>) => {
    setSections(sections.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  };

  const loadVersion = (versionNumber: number) => {
    const version = versions.find(v => v.version_number === versionNumber);
    if (version) {
      setSections(version.content.sections || []);
      setCurrentVersion(versionNumber);
    }
  };

  if (loading || !resolvedParams) {
    return <LoadingState variant="fullscreen" label="Ładowanie oferty…" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/admin/proposals')}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
        >
          <ArrowLeft size={18} weight="regular" />
          Powrót do listy
        </button>
        {accessLink && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(accessLink.link);
                  setAlertModal({
                    isOpen: true,
                    title: 'Sukces',
                    message: 'Link skopiowany do schowka.',
                    type: 'success',
                  });
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#fee715] text-[#101820] rounded-lg hover:bg-[#fee715]/90 text-sm font-semibold"
            >
              <Copy size={16} weight="regular" />
              Kopiuj link
            </button>
            <a
              href={accessLink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-semibold"
            >
              <Eye size={16} weight="regular" />
              Podgląd
            </a>
          </div>
        )}
      </div>

      {/* Formularz podstawowy */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
        <h2 className="font-[Montserrat] text-xl font-bold text-white mb-4">
          {isNew ? 'Nowa Oferta' : 'Edytuj Ofertę'}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tytuł oferty <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
            placeholder="np. Oferta współpracy Q1 2024"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Klient (panel)
            </label>
            <CustomSelect
              value={clientId}
              onChange={(value) => {
                setClientId(value || '');
                if (value) setMarketingClientId(''); // Tylko jedno może być wybrane
              }}
              placeholder="Wybierz klienta"
              options={[
                { value: '', label: '✓ Brak przypisania' },
                ...clients.map((c) => ({
                  value: c.id,
                  label: `${c.name || 'Brak nazwy'}${c.company_name ? ` • ${c.company_name}` : ''}`,
                })),
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Klient (marketing)
            </label>
            <CustomSelect
              value={marketingClientId}
              onChange={(value) => {
                setMarketingClientId(value || '');
                if (value) setClientId(''); // Tylko jedno może być wybrane
              }}
              placeholder="Wybierz klienta"
              options={[
                { value: '', label: '✓ Brak przypisania' },
                ...marketingClients.map((c) => ({
                  value: c.id,
                  label: `${c.name}${c.company_name ? ` • ${c.company_name}` : ''}`,
                })),
              ]}
            />
          </div>
        </div>

        {!isNew && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <CustomSelect
                value={status}
                onChange={(value) => setStatus(value as typeof status)}
                placeholder="Wybierz status"
                options={[
                  { value: 'draft', label: 'Szkic' },
                  { value: 'sent', label: 'Wysłana' },
                  { value: 'viewed', label: 'Otworzona' },
                  { value: 'accepted', label: 'Zaakceptowana' },
                  { value: 'expired', label: 'Wygasła' },
                  { value: 'archived', label: 'Zarchiwizowana' },
                ]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ważna do (opcjonalnie)
              </label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#fee715] focus:border-[#fee715]"
              />
            </div>
          </div>
        )}

        {!isNew && !accessLink && (
          <div>
            <button
              onClick={handleGenerateLink}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] rounded-lg hover:shadow-lg text-sm font-semibold"
            >
              <LinkIcon size={16} weight="regular" />
              Generuj link publiczny
            </button>
          </div>
        )}
      </div>

      {/* Historia wersji (jeśli istnieje) */}
      {versions.length > 1 && (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="font-[Montserrat] text-lg font-bold text-white mb-3">Historia wersji</h3>
          <div className="flex gap-2 flex-wrap">
            {versions.map((v) => (
              <button
                key={v.id}
                onClick={() => loadVersion(v.version_number)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                  currentVersion === v.version_number
                    ? 'bg-[#fee715] text-[#101820]'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Wersja {v.version_number}
                {v.version_number === versions[0].version_number && ' (aktualna)'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edycja sekcji */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-[Montserrat] text-lg font-bold text-white">Treść oferty</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addSection('text')}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold"
            >
              + Tekst
            </button>
            <button
              onClick={() => addSection('list')}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold"
            >
              + Lista
            </button>
            <button
              onClick={() => addSection('pricing')}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold"
            >
              + Cennik
            </button>
          </div>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="bg-white/[0.03] rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                placeholder="Tytuł sekcji"
                className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
              />
              <button
                onClick={() => removeSection(index)}
                className="ml-2 p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                title="Usuń sekcję"
              >
                <Trash size={18} weight="regular" />
              </button>
            </div>

            {section.type === 'text' && (
              <textarea
                value={section.content}
                onChange={(e) => updateSection(index, { content: e.target.value })}
                placeholder="Treść sekcji"
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none"
              />
            )}

            {section.type === 'list' && (
              <div className="space-y-2">
                {(section.items || ['']).map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...(section.items || [''])];
                        newItems[itemIndex] = e.target.value;
                        updateSection(index, { items: newItems });
                      }}
                      placeholder={`Punkt ${itemIndex + 1}`}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                    />
                    <button
                      onClick={() => {
                        const newItems = (section.items || ['']).filter((_, i) => i !== itemIndex);
                        updateSection(index, { items: newItems.length > 0 ? newItems : [''] });
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      <Trash size={16} weight="regular" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updateSection(index, { items: [...(section.items || ['']), ''] });
                  }}
                  className="text-xs text-[#fee715] hover:underline"
                >
                  + Dodaj punkt
                </button>
              </div>
            )}

            {section.type === 'pricing' && (
              <div className="space-y-2">
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, { content: e.target.value })}
                  placeholder="Opis pakietu"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715] resize-none"
                />
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Cena</label>
                  <input
                    type="number"
                    value={section.price || 0}
                    onChange={(e) => updateSection(index, { price: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 text-sm focus:ring-1 focus:ring-[#fee715] focus:border-[#fee715]"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Przyciski akcji */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold rounded-xl hover:shadow-lg hover:shadow-[#fee715]/40 transition-all duration-300 disabled:opacity-50"
        >
          {saving ? 'Zapisywanie…' : isNew ? 'Utwórz ofertę' : 'Zapisz zmiany'}
        </button>
        <button
          onClick={() => router.push('/admin/proposals')}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-[Montserrat] font-semibold rounded-xl transition-all duration-300"
        >
          Anuluj
        </button>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
