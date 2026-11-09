import React, { useState, useEffect } from 'react';
import { 
  Question, 
  CheckSquare, 
  ChatCircle,
  X,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  User,
  Calendar,
  PaperPlaneTilt
} from 'phosphor-react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { CustomSelect } from './CustomSelect';
import { CustomCheckbox } from './CustomCheckbox';

interface CommentMessage {
  id: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
  edited_at?: string | null;
  creator_email?: string;
}

interface CommentThreadData {
  id: string;
  thread_type: 'Komentarz' | 'Pytanie' | 'Zadanie';
  status: 'Otwarte' | 'W toku' | 'Do akceptacji' | 'Zatwierdzone' | 'Odrzucone';
  priority?: 'Niski' | 'Średni' | 'Wysoki' | null;
  assigned_to?: string | null;
  assigned_to_email?: string | null;
  due_date?: string | null;
  requires_approval: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  anchor_type: 'node' | 'edge' | 'region';
  anchor_id?: string | null;
  messages: CommentMessage[];
}

interface CommentThreadProps {
  threadId: string;
  funnelId: string;
  onClose: () => void;
  onUpdate: () => void;
}

export const CommentThread: React.FC<CommentThreadProps> = ({ 
  threadId, 
  funnelId, 
  onClose,
  onUpdate 
}) => {
  const { user } = useAuth();
  const [thread, setThread] = useState<CommentThreadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingPriority, setEditingPriority] = useState(false);
  const [editingAssigned, setEditingAssigned] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState(false);

  // ESC zamyka wątek (jak Figma)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Tylko jeśli textarea nie jest sfocowane (żeby ESC w textarea czyściło tekst, nie zamykało)
        const isTextarea = (document.activeElement as HTMLElement)?.tagName === 'TEXTAREA';
        if (!isTextarea) onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const loadThread = async () => {
    if (!threadId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('comment_threads')
        .select(`
          *,
          comment_anchors (
            anchor_type,
            anchor_id,
            region_x,
            region_y,
            region_width,
            region_height
          ),
          comment_messages (
            id,
            content,
            created_by,
            created_at,
            updated_at,
            is_edited,
            edited_at
          )
        `)
        .eq('id', threadId)
        .single();

      if (error) throw error;

      // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
      const anchors = data.comment_anchors;
      const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
      const messages = data.comment_messages || [];

      // Pobierz display_name dla każdego użytkownika używając funkcji get_user_display_name
      const userIds = new Set<string>([data.created_by, ...messages.map((m: any) => m.created_by)]);
      if (data.assigned_to) userIds.add(data.assigned_to);
      
      const userMap = new Map<string, string>();
      // Pobierz display_name dla wszystkich użytkowników
      for (const uid of userIds) {
        const { data: displayName } = await supabase.rpc('get_user_display_name', { user_uuid: uid });
        userMap.set(uid, displayName || 'Nieznany użytkownik');
      }

      setThread({
        ...data,
        anchor_type: anchor?.anchor_type || 'node',
        anchor_id: anchor?.anchor_id || null,
        assigned_to_email: data.assigned_to ? userMap.get(data.assigned_to) : null,
        messages: messages.map((msg: any) => ({
          ...msg,
          creator_email: userMap.get(msg.created_by),
        })),
      });
    } catch (error: any) {
      console.error('Błąd ładowania wątku:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThread();
  }, [threadId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !thread) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('comment_messages')
        .insert({
          thread_id: thread.id,
          content: newMessage.trim(),
        });

      if (error) throw error;

      // Aktualizuj status na "W toku" jeśli był "Otwarte"
      if (thread.status === 'Otwarte') {
        await supabase
          .from('comment_threads')
          .update({ status: 'W toku' })
          .eq('id', thread.id);
      }

      setNewMessage('');
      await loadThread();
      onUpdate();
    } catch (error: any) {
      console.error('Błąd wysyłania wiadomości:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!thread) return;
    try {
      const updates: any = { status: newStatus };
      if (newStatus === 'Zatwierdzone' || newStatus === 'Odrzucone') {
        updates.closed_at = new Date().toISOString();
        updates.closed_by = user?.id;
      } else {
        updates.closed_at = null;
        updates.closed_by = null;
      }

      const { error } = await supabase
        .from('comment_threads')
        .update(updates)
        .eq('id', thread.id);

      if (error) throw error;
      await loadThread();
      onUpdate();
    } catch (error: any) {
      console.error('Błąd aktualizacji statusu:', error);
    }
  };

  const getThreadIcon = (type: string) => {
    switch (type) {
      case 'Pytanie': return Question;
      case 'Zadanie': return CheckSquare;
      default: return ChatCircle;
    }
  };

  if (loading || !thread) {
    return (
      <div className="fixed right-0 top-0 h-full w-96 bg-[#13151a] border-l border-white/[0.06] z-50 flex items-center justify-center">
        <div className="text-white/45 text-[13px]">Ładowanie…</div>
      </div>
    );
  }

  const ThreadIcon = getThreadIcon(thread.thread_type);

  const formatRelativeTime = (iso: string): string => {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - then);
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'przed chwilą';
    if (m < 60) return `${m} min temu`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} godz. temu`;
    const d = Math.floor(h / 24);
    if (d === 1) return 'wczoraj';
    if (d < 7) return `${d} dni temu`;
    return new Date(iso).toLocaleDateString('pl-PL');
  };

  const getInitials = (email?: string): string => {
    if (!email) return '?';
    const name = email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed right-0 top-0 h-full w-[420px] bg-[#13151a] border-l border-white/[0.06] z-50 flex flex-col shadow-2xl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#13151a]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition-colors"
            title="Wróć do listy (ESC)"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Wstecz
          </button>
          <div className="flex items-center gap-1.5">
            <ThreadIcon size={14} className="text-[#fee715]" />
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-[0.14em]">{thread.thread_type}</span>
          </div>
        </div>

        {/* Status + Priorytet w jednej linii */}
        <div className="space-y-2">
          <CustomSelect
            size="sm"
            value={thread.status}
            onChange={(value) => updateStatus(value)}
            options={[
              { value: 'Otwarte', label: 'Otwarte' },
              { value: 'W toku', label: 'W toku' },
              { value: 'Do akceptacji', label: 'Do akceptacji' },
              { value: 'Zatwierdzone', label: 'Zatwierdzone' },
              { value: 'Odrzucone', label: 'Odrzucone' },
            ]}
            className="w-full"
          />

          {thread.thread_type === 'Zadanie' && (
            <>
              <CustomSelect
                size="sm"
                value={thread.priority || 'Średni'}
                onChange={async (value) => {
                  await supabase
                    .from('comment_threads')
                    .update({ priority: value })
                    .eq('id', thread.id);
                  await loadThread();
                  onUpdate();
                }}
                options={[
                  { value: 'Niski', label: 'Priorytet: Niski' },
                  { value: 'Średni', label: 'Priorytet: Średni' },
                  { value: 'Wysoki', label: 'Priorytet: Wysoki' },
                ]}
                className="w-full"
              />
              <div className="flex flex-wrap gap-2 text-[11px] text-white/50">
                {thread.due_date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {new Date(thread.due_date).toLocaleDateString('pl-PL')}
                  </span>
                )}
                {thread.assigned_to_email && (
                  <span className="flex items-center gap-1">
                    <User size={11} />
                    {thread.assigned_to_email}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Wiadomości - jak chat */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {thread.messages.map((message) => {
          const isMine = message.created_by === user?.id;
          return (
            <div key={message.id} className="flex gap-2.5">
              {/* Avatar */}
              <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-semibold ${
                isMine ? 'bg-[#fee715] text-[#0a0b0e]' : 'bg-white/[0.06] border border-white/[0.08] text-white/80'
              }`}>
                {getInitials(message.creator_email)}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[12px] font-medium text-white truncate">
                    {message.creator_email?.split('@')[0] || 'Użytkownik'}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {formatRelativeTime(message.created_at)}
                  </span>
                  {message.is_edited && (
                    <span className="text-[10px] text-white/35 italic">(edytowane)</span>
                  )}
                </div>
                <div className="text-[13px] text-white/85 whitespace-pre-wrap leading-relaxed">{message.content}</div>
              </div>
            </div>
          );
        })}
        {thread.messages.length === 0 && (
          <div className="text-center text-[12px] text-white/45 py-8">
            Brak wiadomości. Napisz pierwszą poniżej.
          </div>
        )}
      </div>

      {/* Formularz nowej wiadomości */}
      <div className="p-3 border-t border-white/[0.06] bg-[#13151a]/95 backdrop-blur-xl">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Odpowiedz w wątku…"
          className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/30 focus:border-[#fee715]/40 transition-colors resize-none"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-mono text-white/35 tracking-wide">⌘/CTRL + ENTER</span>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || saving}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fee715] text-[#0a0b0e] rounded-md text-[12px] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <PaperPlaneTilt size={13} weight="fill" />
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};
