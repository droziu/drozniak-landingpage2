import React, { useState, useEffect } from 'react';
import { 
  ChatCircle, 
  Question, 
  CheckSquare, 
  Funnel, 
  CrosshairSimple, 
  X,
  MagnifyingGlass,
  CheckCircle,
  XCircle,
  Clock,
  ShieldCheck,
  WarningCircle,
  ChatCircleDots
} from 'phosphor-react';
import { supabase } from '../lib/supabase';
import { CustomSelect } from './CustomSelect';

interface CommentThread {
  id: string;
  thread_type: 'Komentarz' | 'Pytanie' | 'Zadanie';
  status: 'Otwarte' | 'W toku' | 'Do akceptacji' | 'Zatwierdzone' | 'Odrzucone';
  priority?: 'Niski' | 'Średni' | 'Wysoki' | null;
  assigned_to?: string | null;
  due_date?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  anchor_type: 'node' | 'edge' | 'region';
  anchor_id?: string | null;
  anchor_label?: string; // Nazwa noda/edge dla wyświetlenia
  last_message?: string;
  last_message_at?: string;
  message_count: number;
}

interface CommentPanelProps {
  funnelId: string;
  isOpen: boolean;
  onClose: () => void;
  onJumpToAnchor: (anchorType: 'node' | 'edge' | 'region', anchorId?: string, regionCoords?: { x: number; y: number; width: number; height: number }) => void;
  onThreadClick?: (threadId: string) => void;
}

export const CommentPanel: React.FC<CommentPanelProps> = ({ 
  funnelId, 
  isOpen, 
  onClose, 
  onJumpToAnchor,
  onThreadClick,
  refreshTrigger
}) => {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showClosed, setShowClosed] = useState(false);

  const loadThreads = async () => {
    if (!funnelId) return;
    setLoading(true);
    try {
      // Załaduj wątki z anchorami i ostatnią wiadomością
      const { data, error } = await supabase
        .from('comment_threads')
        .select(`
          id,
          thread_type,
          status,
          priority,
          assigned_to,
          due_date,
          created_by,
          created_at,
          updated_at,
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
            created_at
          )
        `)
        .eq('funnel_id', funnelId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Przetwórz dane do formatu CommentThread
      const processedThreads: CommentThread[] = (data || []).map((thread: any) => {
        // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
        const anchors = thread.comment_anchors;
        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
        const messages = thread.comment_messages || [];
        const lastMessage = messages.length > 0 
          ? messages.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
          : null;

        return {
          id: thread.id,
          thread_type: thread.thread_type,
          status: thread.status,
          priority: thread.priority,
          assigned_to: thread.assigned_to,
          due_date: thread.due_date,
          created_by: thread.created_by,
          created_at: thread.created_at,
          updated_at: thread.updated_at,
          anchor_type: anchor?.anchor_type || 'node',
          anchor_id: anchor?.anchor_id || null,
          anchor_label: anchor?.anchor_id || 'Region',
          last_message: lastMessage?.content,
          last_message_at: lastMessage?.created_at,
          message_count: messages.length,
        };
      });

      setThreads(processedThreads);
    } catch (error: any) {
      console.error('Błąd ładowania wątków:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && funnelId) {
      loadThreads();
    }
  }, [isOpen, funnelId, refreshTrigger]);

  const getThreadIcon = (type: string) => {
    switch (type) {
      case 'Pytanie': return Question;
      case 'Zadanie': return CheckSquare;
      default: return ChatCircle;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Zatwierdzone': return CheckCircle;
      case 'Odrzucone': return XCircle;
      case 'W toku': return Clock;
      case 'Do akceptacji': return ShieldCheck;
      default: return ChatCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Otwarte': return 'text-red-400';
      case 'W toku': return 'text-blue-400';
      case 'Do akceptacji': return 'text-amber-400';
      case 'Zatwierdzone': return 'text-green-400';
      case 'Odrzucone': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const filteredThreads = threads.filter(thread => {
    // Filtry
    if (!showClosed && (thread.status === 'Zatwierdzone' || thread.status === 'Odrzucone')) {
      return false;
    }
    if (statusFilter !== 'all' && thread.status !== statusFilter) {
      return false;
    }
    if (typeFilter !== 'all' && thread.thread_type !== typeFilter) {
      return false;
    }
    // Wyszukiwarka
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        thread.anchor_label?.toLowerCase().includes(query) ||
        thread.last_message?.toLowerCase().includes(query) ||
        thread.thread_type.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-[#0a0f14] border-l border-white/10 z-50 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChatCircleDots size={20} className="text-[#fee715]" />
          <h2 className="text-lg font-semibold text-white">Komentarze</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/5 rounded transition-colors"
        >
          <X size={18} className="text-white/70" />
        </button>
      </div>

      {/* Filtry i wyszukiwarka */}
      <div className="p-4 border-b border-white/10 space-y-3">
        <div className="relative">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj..."
            className="w-full bg-white/[0.04] border border-white/10 rounded px-3 pl-9 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <CustomSelect
            size="sm"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'Wszystkie statusy' },
              { value: 'Otwarte', label: 'Otwarte' },
              { value: 'W toku', label: 'W toku' },
              { value: 'Do akceptacji', label: 'Do akceptacji' },
              { value: 'Zatwierdzone', label: 'Zatwierdzone' },
              { value: 'Odrzucone', label: 'Odrzucone' },
            ]}
            className="w-full"
          />
          <CustomSelect
            size="sm"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'all', label: 'Wszystkie typy' },
              { value: 'Komentarz', label: 'Komentarz' },
              { value: 'Pytanie', label: 'Pytanie' },
              { value: 'Zadanie', label: 'Zadanie' },
            ]}
            className="w-full"
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showClosed}
            onChange={(e) => setShowClosed(e.target.checked)}
            className="w-4 h-4 rounded bg-white/[0.04] border-white/10 text-[#fee715] focus:ring-[#fee715]/40"
          />
          Pokaż zamknięte
        </label>
      </div>

      {/* Lista wątków */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          <div className="text-center text-gray-400 py-8">Ładowanie...</div>
        ) : filteredThreads.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
              ? 'Brak wyników' 
              : 'Brak wątków'}
          </div>
        ) : (
          filteredThreads.map((thread) => {
            const ThreadIcon = getThreadIcon(thread.thread_type);
            const StatusIcon = getStatusIcon(thread.status);
            
            return (
              <div
                key={thread.id}
                onClick={() => {
                  onThreadClick?.(thread.id);
                  if (thread.anchor_type === 'region') {
                    // TODO: Przekaż współrzędne regionu
                    onJumpToAnchor('region');
                  } else {
                    onJumpToAnchor(thread.anchor_type, thread.anchor_id || undefined);
                  }
                }}
                className="p-3 bg-white/[0.02] border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-2 mb-2">
                  <ThreadIcon size={16} className="text-[#fee715] mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-white">{thread.thread_type}</span>
                      <StatusIcon size={12} className={getStatusColor(thread.status)} />
                      <span className={`text-xs ${getStatusColor(thread.status)}`}>{thread.status}</span>
                    </div>
                    <div className="text-xs text-gray-400 line-clamp-1">
                      {thread.anchor_label || 'Nieznany element'}
                    </div>
                  </div>
                </div>
                {thread.last_message && (
                  <div className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {thread.last_message}
                  </div>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] text-gray-500">
                    {thread.message_count} {thread.message_count === 1 ? 'wiadomość' : 'wiadomości'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJumpToAnchor(thread.anchor_type, thread.anchor_id || undefined);
                    }}
                    className="text-[10px] text-[#fee715] hover:underline flex items-center gap-1"
                    title="Przejdź do miejsca na mapie"
                  >
                    <CrosshairSimple size={12} />
                    Przejdź
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
