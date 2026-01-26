import React, { useState } from 'react';
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0f14] border border-white/20 rounded-lg w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Nowy wątek</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded transition-colors"
          >
            <X size={18} className="text-white/70" />
          </button>
        </div>

        {/* Formularz */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Typ</label>
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
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Treść <span className="text-red-400">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Opisz problem, zadanie lub pytanie..."
              className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[100px] resize-none"
              autoFocus
            />
          </div>

          {/* Pola tylko dla Zadań */}
          {threadType === 'Zadanie' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Priorytet</label>
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
                <label className="block text-xs font-medium text-gray-400 mb-1">Termin (opcjonalnie)</label>
                <DatePickerField
                  value={dueDate}
                  onChange={setDueDate}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Przypisz do (email, opcjonalnie)</label>
                <input
                  type="email"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
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
        <div className="p-4 border-t border-white/10 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || saving}
            className="px-4 py-2 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Zapisywanie...' : 'Utwórz wątek'}
          </button>
        </div>
      </div>
    </div>
  );
};
