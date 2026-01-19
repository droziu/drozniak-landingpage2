-- =====================================================
-- MIGRACJA: System komentarzy dla FunnelBuilder
-- =====================================================
-- Data: 2024
-- Opis: System wątków komentarzy przypiętych do nodów, edges lub regionów na mapie
-- =====================================================

-- Tabela comment_threads (wątki komentarzy)
CREATE TABLE IF NOT EXISTS comment_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id UUID NOT NULL REFERENCES funnel_diagrams(id) ON DELETE CASCADE,
  thread_type TEXT NOT NULL CHECK (thread_type IN ('Komentarz', 'Pytanie', 'Zadanie')),
  status TEXT NOT NULL DEFAULT 'Otwarte' CHECK (status IN ('Otwarte', 'W toku', 'Do akceptacji', 'Zatwierdzone', 'Odrzucone')),
  priority TEXT CHECK (priority IN ('Niski', 'Średni', 'Wysoki')),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  requires_approval BOOLEAN DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  closed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Tabela comment_anchors (przypięcia wątków do elementów mapy)
CREATE TABLE IF NOT EXISTS comment_anchors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES comment_threads(id) ON DELETE CASCADE,
  anchor_type TEXT NOT NULL CHECK (anchor_type IN ('node', 'edge', 'region')),
  anchor_id TEXT, -- ID noda lub edge (dla region: NULL)
  region_x DOUBLE PRECISION, -- Współrzędne regionu (dla anchor_type='region')
  region_y DOUBLE PRECISION,
  region_width DOUBLE PRECISION,
  region_height DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(thread_id) -- Jeden wątek = jedno przypięcie
);

-- Tabela comment_messages (wiadomości w wątkach)
CREATE TABLE IF NOT EXISTS comment_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES comment_threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ,
  is_edited BOOLEAN DEFAULT false
);

-- Tabela comment_audit_log (historia zmian w wątkach)
CREATE TABLE IF NOT EXISTS comment_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES comment_threads(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL CHECK (action_type IN ('created', 'status_changed', 'assigned', 'priority_changed', 'due_date_changed', 'closed', 'reopened')),
  old_value TEXT,
  new_value TEXT,
  changed_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_comment_threads_funnel_id ON comment_threads(funnel_id);
CREATE INDEX IF NOT EXISTS idx_comment_threads_status ON comment_threads(status);
CREATE INDEX IF NOT EXISTS idx_comment_threads_thread_type ON comment_threads(thread_type);
CREATE INDEX IF NOT EXISTS idx_comment_threads_assigned_to ON comment_threads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_comment_threads_created_by ON comment_threads(created_by);
CREATE INDEX IF NOT EXISTS idx_comment_threads_created_at ON comment_threads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comment_anchors_thread_id ON comment_anchors(thread_id);
CREATE INDEX IF NOT EXISTS idx_comment_anchors_anchor_type ON comment_anchors(anchor_type);
CREATE INDEX IF NOT EXISTS idx_comment_anchors_anchor_id ON comment_anchors(anchor_id) WHERE anchor_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_comment_messages_thread_id ON comment_messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_comment_messages_created_at ON comment_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comment_audit_log_thread_id ON comment_audit_log(thread_id);
CREATE INDEX IF NOT EXISTS idx_comment_audit_log_changed_at ON comment_audit_log(changed_at DESC);

-- Funkcja do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_comment_threads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  IF OLD.content IS DISTINCT FROM NEW.content THEN
    NEW.edited_at = NOW();
    NEW.is_edited = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery dla automatycznej aktualizacji updated_at
DROP TRIGGER IF EXISTS update_comment_threads_updated_at ON comment_threads;
CREATE TRIGGER update_comment_threads_updated_at
  BEFORE UPDATE ON comment_threads
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_threads_updated_at();

DROP TRIGGER IF EXISTS update_comment_messages_updated_at ON comment_messages;
CREATE TRIGGER update_comment_messages_updated_at
  BEFORE UPDATE ON comment_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_messages_updated_at();

-- Funkcja do logowania zmian w audit_log
CREATE OR REPLACE FUNCTION log_comment_thread_change()
RETURNS TRIGGER AS $$
DECLARE
  current_user_id UUID;
BEGIN
  current_user_id := auth.uid();
  
  -- Loguj zmianę statusu
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO comment_audit_log (thread_id, action_type, old_value, new_value, changed_by)
    VALUES (NEW.id, 'status_changed', OLD.status, NEW.status, current_user_id);
  END IF;
  
  -- Loguj zmianę przypisania
  IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
    INSERT INTO comment_audit_log (thread_id, action_type, old_value, new_value, changed_by)
    VALUES (NEW.id, 'assigned', 
      COALESCE((SELECT email FROM auth.users WHERE id = OLD.assigned_to), 'NULL'),
      COALESCE((SELECT email FROM auth.users WHERE id = NEW.assigned_to), 'NULL'),
      current_user_id);
  END IF;
  
  -- Loguj zmianę priorytetu
  IF OLD.priority IS DISTINCT FROM NEW.priority THEN
    INSERT INTO comment_audit_log (thread_id, action_type, old_value, new_value, changed_by)
    VALUES (NEW.id, 'priority_changed', COALESCE(OLD.priority, 'NULL'), COALESCE(NEW.priority, 'NULL'), current_user_id);
  END IF;
  
  -- Loguj zamknięcie
  IF OLD.status NOT IN ('Zatwierdzone', 'Odrzucone') AND NEW.status IN ('Zatwierdzone', 'Odrzucone') THEN
    INSERT INTO comment_audit_log (thread_id, action_type, old_value, new_value, changed_by)
    VALUES (NEW.id, 'closed', OLD.status, NEW.status, current_user_id);
  END IF;
  
  -- Loguj ponowne otwarcie
  IF OLD.status IN ('Zatwierdzone', 'Odrzucone') AND NEW.status NOT IN ('Zatwierdzone', 'Odrzucone') THEN
    INSERT INTO comment_audit_log (thread_id, action_type, old_value, new_value, changed_by)
    VALUES (NEW.id, 'reopened', OLD.status, NEW.status, current_user_id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger dla audit log (tylko dla zmian statusu, przypisania, priorytetu)

DROP TRIGGER IF EXISTS log_comment_thread_change ON comment_threads;
CREATE TRIGGER log_comment_thread_change
  AFTER UPDATE ON comment_threads
  FOR EACH ROW
  EXECUTE FUNCTION log_comment_thread_change();

-- RLS Policies
ALTER TABLE comment_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_anchors ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_audit_log ENABLE ROW LEVEL SECURITY;

-- Polityka: Admini mogą wszystko
DROP POLICY IF EXISTS "Admins can do everything with comment_threads" ON comment_threads;
CREATE POLICY "Admins can do everything with comment_threads"
  ON comment_threads
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can do everything with comment_anchors" ON comment_anchors;
CREATE POLICY "Admins can do everything with comment_anchors"
  ON comment_anchors
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can do everything with comment_messages" ON comment_messages;
CREATE POLICY "Admins can do everything with comment_messages"
  ON comment_messages
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Admins can do everything with comment_audit_log" ON comment_audit_log;
CREATE POLICY "Admins can do everything with comment_audit_log"
  ON comment_audit_log
  FOR ALL
  USING (is_admin());

-- Polityka: Twórcy wątków mogą je edytować
DROP POLICY IF EXISTS "Users can view threads in their funnels" ON comment_threads;
CREATE POLICY "Users can view threads in their funnels"
  ON comment_threads
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM funnel_diagrams fd
      WHERE fd.id = comment_threads.funnel_id
      AND (fd.created_by = auth.uid() OR is_admin())
    )
    OR EXISTS (
      SELECT 1 FROM funnel_access fa
      JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
      WHERE fa.funnel_id = comment_threads.funnel_id
      AND pc.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create threads in their funnels" ON comment_threads;
CREATE POLICY "Users can create threads in their funnels"
  ON comment_threads
  FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND (
      EXISTS (
        SELECT 1 FROM funnel_diagrams fd
        WHERE fd.id = comment_threads.funnel_id
        AND (fd.created_by = auth.uid() OR is_admin())
      )
      OR EXISTS (
        SELECT 1 FROM funnel_access fa
        JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
        WHERE fa.funnel_id = comment_threads.funnel_id
        AND pc.user_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can update their own threads or assigned threads" ON comment_threads;
CREATE POLICY "Users can update their own threads or assigned threads"
  ON comment_threads
  FOR UPDATE
  USING (
    created_by = auth.uid()
    OR assigned_to = auth.uid()
    OR is_admin()
  )
  WITH CHECK (
    created_by = auth.uid()
    OR assigned_to = auth.uid()
    OR is_admin()
  );

-- Polityka: Anchors
DROP POLICY IF EXISTS "Users can view anchors for accessible threads" ON comment_anchors;
CREATE POLICY "Users can view anchors for accessible threads"
  ON comment_anchors
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_diagrams fd ON ct.funnel_id = fd.id
      WHERE ct.id = comment_anchors.thread_id
      AND (fd.created_by = auth.uid() OR is_admin())
    )
    OR EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_access fa ON ct.funnel_id = fa.funnel_id
      JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
      WHERE ct.id = comment_anchors.thread_id
      AND pc.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create anchors for accessible threads" ON comment_anchors;
CREATE POLICY "Users can create anchors for accessible threads"
  ON comment_anchors
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_diagrams fd ON ct.funnel_id = fd.id
      WHERE ct.id = comment_anchors.thread_id
      AND (fd.created_by = auth.uid() OR is_admin())
    )
    OR EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_access fa ON ct.funnel_id = fa.funnel_id
      JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
      WHERE ct.id = comment_anchors.thread_id
      AND pc.user_id = auth.uid()
    )
  );

-- Polityka: Messages
DROP POLICY IF EXISTS "Users can view messages for accessible threads" ON comment_messages;
CREATE POLICY "Users can view messages for accessible threads"
  ON comment_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_diagrams fd ON ct.funnel_id = fd.id
      WHERE ct.id = comment_messages.thread_id
      AND (fd.created_by = auth.uid() OR is_admin())
    )
    OR EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_access fa ON ct.funnel_id = fa.funnel_id
      JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
      WHERE ct.id = comment_messages.thread_id
      AND pc.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create messages in accessible threads" ON comment_messages;
CREATE POLICY "Users can create messages in accessible threads"
  ON comment_messages
  FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND (
      EXISTS (
        SELECT 1 FROM comment_threads ct
        JOIN funnel_diagrams fd ON ct.funnel_id = fd.id
        WHERE ct.id = comment_messages.thread_id
        AND (fd.created_by = auth.uid() OR is_admin())
      )
      OR EXISTS (
        SELECT 1 FROM comment_threads ct
        JOIN funnel_access fa ON ct.funnel_id = fa.funnel_id
        JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
        WHERE ct.id = comment_messages.thread_id
        AND pc.user_id = auth.uid()
      )
    )
  );

DROP POLICY IF EXISTS "Users can update their own messages within 10 minutes" ON comment_messages;
CREATE POLICY "Users can update their own messages within 10 minutes"
  ON comment_messages
  FOR UPDATE
  USING (
    created_by = auth.uid()
    AND created_at > NOW() - INTERVAL '10 minutes'
  )
  WITH CHECK (
    created_by = auth.uid()
    AND created_at > NOW() - INTERVAL '10 minutes'
  );

-- Polityka: Audit Log (tylko odczyt)
DROP POLICY IF EXISTS "Users can view audit log for accessible threads" ON comment_audit_log;
CREATE POLICY "Users can view audit log for accessible threads"
  ON comment_audit_log
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_diagrams fd ON ct.funnel_id = fd.id
      WHERE ct.id = comment_audit_log.thread_id
      AND (fd.created_by = auth.uid() OR is_admin())
    )
    OR EXISTS (
      SELECT 1 FROM comment_threads ct
      JOIN funnel_access fa ON ct.funnel_id = fa.funnel_id
      JOIN panel_clients pc ON pc.marketing_client_id = fa.client_id
      WHERE ct.id = comment_audit_log.thread_id
      AND pc.user_id = auth.uid()
    )
  );

-- Komentarze
COMMENT ON TABLE comment_threads IS 'Wątki komentarzy przypięte do elementów mapy';
COMMENT ON TABLE comment_anchors IS 'Przypięcia wątków do nodów, edges lub regionów';
COMMENT ON TABLE comment_messages IS 'Wiadomości w wątkach komentarzy';
COMMENT ON TABLE comment_audit_log IS 'Historia zmian w wątkach (audit trail)';

COMMENT ON COLUMN comment_threads.thread_type IS 'Typ wątku: Komentarz, Pytanie, Zadanie';
COMMENT ON COLUMN comment_threads.status IS 'Status: Otwarte, W toku, Do akceptacji, Zatwierdzone, Odrzucone';
COMMENT ON COLUMN comment_anchors.anchor_type IS 'Typ przypięcia: node, edge, region';
COMMENT ON COLUMN comment_anchors.anchor_id IS 'ID noda lub edge (NULL dla region)';
COMMENT ON COLUMN comment_anchors.region_x IS 'Współrzędna X regionu (tylko dla anchor_type=region)';
COMMENT ON COLUMN comment_anchors.region_y IS 'Współrzędna Y regionu (tylko dla anchor_type=region)';
