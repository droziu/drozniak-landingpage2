-- =====================================================
-- SPRAWDZENIE: Czy użytkownik ma rekord w panel_clients
-- =====================================================
-- Uruchom to w Supabase SQL Editor jako admin
-- Zastąp EMAIL adresem użytkownika

-- 1. Znajdź user_id dla emaila
SELECT id, email 
FROM auth.users 
WHERE email = 'drozniakstanislaw@gmail.com';

-- 2. Sprawdź czy istnieje panel_clients dla tego user_id
-- (Zastąp UUID poniżej user_id z kroku 1)
SELECT pc.*, 
       (SELECT array_agg(cvg.view_tag) FROM client_view_grants cvg WHERE cvg.client_id = pc.id) as view_tags
FROM panel_clients pc
WHERE pc.user_id = (SELECT id FROM auth.users WHERE email = 'drozniakstanislaw@gmail.com');

-- 3. Sprawdź RLS - czy użytkownik może zobaczyć swój rekord
-- (To trzeba uruchomić jako ten użytkownik, nie admin)
-- SELECT * FROM panel_clients WHERE user_id = auth.uid();

-- 4. Sprawdź get_my_view_grants() - czy zwraca widoki
-- (To też jako użytkownik)
-- SELECT get_my_view_grants();
