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
      <div className="fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex items-center justify-center">
        <div className="text-gray-400">Ładowanie...</div>
      </div>
    );
  }

  const ThreadIcon = getThreadIcon(thread.thread_type);

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ThreadIcon size={20} className="text-[#fee715]" />
            <h2 className="text-lg font-semibold text-white">{thread.thread_type}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded transition-colors"
          >
            <X size={18} className="text-white/70" />
          </button>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
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
          </div>

          {/* Priorytet i przypisanie (tylko dla Zadań) */}
          {thread.thread_type === 'Zadanie' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Priorytet</label>
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
                    { value: 'Niski', label: 'Niski' },
                    { value: 'Średni', label: 'Średni' },
                    { value: 'Wysoki', label: 'Wysoki' },
                  ]}
                  className="w-full"
                />
              </div>
              {thread.due_date && (
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} />
                  Termin: {new Date(thread.due_date).toLocaleDateString('pl-PL')}
                </div>
              )}
              {thread.assigned_to_email && (
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <User size={12} />
                  Przypisane do: {thread.assigned_to_email}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Wiadomości */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {thread.messages.map((message) => (
          <div key={message.id} className="bg-white/[0.02] border border-white/10 rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-white">
                {message.creator_email || 'Nieznany użytkownik'}
              </span>
              <span className="text-[10px] text-gray-500">
                {new Date(message.created_at).toLocaleString('pl-PL')}
              </span>
              {message.is_edited && (
                <span className="text-[10px] text-gray-500 italic">(edytowane)</span>
              )}
            </div>
            <div className="text-sm text-gray-300 whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
      </div>

      {/* Formularz nowej wiadomości */}
      <div className="p-4 border-t border-white/10">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Napisz odpowiedź..."
          className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[80px] resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-gray-500">Cmd/Ctrl + Enter aby wysłać</span>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || saving}
            className="px-4 py-1.5 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <PaperPlaneTilt size={16} />
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
};
