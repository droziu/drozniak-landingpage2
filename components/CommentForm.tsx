import React, { useState, useEffect } from 'react';
import { 
  ChatCircle, 
  Question, 
  CheckSquare,
  X,
  Calendar,
  User
} from 'phosphor-react';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/app/hooks/useAuth';
import { CustomSelect } from './CustomSelect';
import { CustomCheckbox } from './CustomCheckbox';
import { DatePickerField } from './DatePickerField';

interface CommentFormProps {
  funnelId: string;
  anchorType: 'node' | 'edge' | 'region';
  anchorId?: string;
  regionCoords?: { x: number; y: number; width: number; height: number };
  onClose: () => void;
  onSuccess: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  funnelId,
  anchorType,
  anchorId,
  regionCoords,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [threadType, setThreadType] = useState<'Komentarz' | 'Pytanie' | 'Zadanie'>('Komentarz');
  const [content, setContent] = useState('');

  // ESC zamyka modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const [priority, setPriority] = useState<'Niski' | 'Średni' | 'Wysoki'>('Średni');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [requiresApproval, setRequiresApproval] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    if (!user) {
      alert('Musisz być zalogowany, aby utworzyć komentarz');
      return;
    }

    setSaving(true);
    try {
      // Utwórz wątek
      const { data: thread, error: threadError } = await supabase
        .from('comment_threads')
        .insert({
          funnel_id: funnelId,
          created_by: user.id,
          thread_type: threadType,
          status: 'Otwarte',
          priority: threadType === 'Zadanie' ? priority : null,
          assigned_to: threadType === 'Zadanie' && assignedTo ? assignedTo : null,
          due_date: threadType === 'Zadanie' && dueDate ? dueDate : null,
          requires_approval: threadType === 'Zadanie' ? requiresApproval : false,
        })
        .select()
        .single();

      if (threadError) throw threadError;

      // Utwórz anchor
      const anchorData: any = {
        thread_id: thread.id,
        anchor_type: anchorType,
      };

      if (anchorType === 'region' && regionCoords) {
        anchorData.region_x = regionCoords.x;
        anchorData.region_y = regionCoords.y;
        anchorData.region_width = regionCoords.width;
        anchorData.region_height = regionCoords.height;
      } else if (anchorId) {
        anchorData.anchor_id = anchorId;
      }

      const { error: anchorError } = await supabase
        .from('comment_anchors')
        .insert(anchorData);

      if (anchorError) throw anchorError;

      // Utwórz pierwszą wiadomość
      const { error: messageError } = await supabase
        .from('comment_messages')
        .insert({
          thread_id: thread.id,
          created_by: user.id,
          content: content.trim(),
        });

      if (messageError) throw messageError;

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Błąd tworzenia wątku:', error);
      alert('Nie udało się utworzyć wątku: ' + (error.message || 'Nieznany błąd'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#13151a] border border-white/[0.08] rounded-xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white tracking-tight">Nowa uwaga</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/[0.06] rounded-md text-white/45 hover:text-white transition-colors"
            title="Zamknij (ESC)"
          >
            <X size={14} />
          </button>
        </div>

        {/* Formularz */}
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Typ</label>
            <CustomSelect
              size="sm"
              value={threadType}
              onChange={(value) => setThreadType(value as 'Komentarz' | 'Pytanie' | 'Zadanie')}
              options={[
                { value: 'Komentarz', label: 'Komentarz' },
                { value: 'Pytanie', label: 'Pytanie' },
                { value: 'Zadanie', label: 'Zadanie' },
              ]}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">
              Treść <span className="text-red-400 normal-case font-sans tracking-normal">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={threadType === 'Pytanie' ? 'O co chcesz zapytać?' : threadType === 'Zadanie' ? 'Co należy zrobić?' : 'Twoja uwaga…'}
              className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/30 focus:border-[#fee715]/40 transition-colors resize-none min-h-[90px]"
              autoFocus
            />
          </div>

          {/* Pola tylko dla Zadań */}
          {threadType === 'Zadanie' && (
            <>
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Priorytet</label>
                <CustomSelect
                  size="sm"
                  value={priority}
                  onChange={(value) => setPriority(value as 'Niski' | 'Średni' | 'Wysoki')}
                  options={[
                    { value: 'Niski', label: 'Niski' },
                    { value: 'Średni', label: 'Średni' },
                    { value: 'Wysoki', label: 'Wysoki' },
                  ]}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Termin</label>
                <DatePickerField
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/50 uppercase tracking-[0.14em] mb-1.5">Przypisz do (email)</label>
                <input
                  type="email"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-3 py-2 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/30 focus:border-[#fee715]/40 transition-colors"
                />
              </div>

              <div>
                <CustomCheckbox
                  checked={requiresApproval}
                  onChange={setRequiresApproval}
                  label="Wymaga akceptacji"
                  align="start"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/80 rounded-md text-[13px] font-medium hover:bg-white/[0.10] hover:text-white transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || saving}
            className="px-3 py-1.5 bg-[#fee715] text-[#0a0b0e] rounded-md text-[13px] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            {saving ? 'Zapisywanie…' : 'Dodaj'}
          </button>
        </div>
      </div>
    </div>
  );
};
