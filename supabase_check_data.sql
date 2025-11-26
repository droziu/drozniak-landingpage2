-- =========================================
-- SPRAWDZENIE DANYCH W BAZIE
-- =========================================

-- 1. Sprawdź liczbę odpowiedzi
SELECT COUNT(*) as total_responses FROM public.training_responses;

-- 2. Sprawdź liczbę postępów (już sprawdziłeś - jest 10)
SELECT COUNT(*) as total_progress FROM public.training_progress;

-- 3. Sprawdź odpowiedzi z lekcji 6.3
SELECT 
  user_id, 
  module_code, 
  step_code, 
  question_code, 
  LEFT(answer_text, 50) as answer_preview, 
  status, 
  created_at 
FROM public.training_responses 
WHERE step_code = '6.3'
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Sprawdź wszystkich użytkowników z odpowiedziami
SELECT 
  tr.user_id,
  COUNT(*) as response_count,
  COUNT(DISTINCT tr.step_code) as unique_lessons,
  MAX(tr.created_at) as last_response
FROM public.training_responses tr
GROUP BY tr.user_id
ORDER BY response_count DESC;

-- 5. Sprawdź postęp użytkowników
SELECT 
  tp.user_id,
  tp.module_code,
  tp.last_step_code,
  tp.percentage,
  tp.module_completed
FROM public.training_progress tp
ORDER BY tp.updated_at DESC;

