-- =========================================
-- MIGRACJA - Naprawa błędów security linter
-- =========================================
-- Naprawia dwa błędy:
-- 1. auth_users_exposed - view user_profiles_with_email eksponuje auth.users
-- 2. security_definer_view - view używa SECURITY DEFINER

-- Usuń problematyczny view (nie jest używany w kodzie)
-- Kod używa funkcji get_user_email zamiast tego view
drop view if exists public.user_profiles_with_email;

-- Ulepsz funkcję get_user_email - dodaj sprawdzenie czy użytkownik jest adminem
create or replace function public.get_user_email(user_id uuid)
returns text as $$
begin
  -- Sprawdź czy użytkownik wywołujący funkcję jest adminem
  -- używając funkcji is_admin() (sprawdza czy email to stanislaw@drozniak.com)
  if not public.is_admin() then
    raise exception 'Access denied. Admin privileges required.';
  end if;
  
  -- Zwróć email użytkownika (SECURITY DEFINER pozwala na dostęp do auth.users)
  return (
    select email::text 
    from auth.users 
    where id = user_id
  );
end;
$$ language plpgsql security definer stable;

-- Komentarz
comment on function public.get_user_email(uuid) is 'Zwraca email użytkownika z auth.users. Wymaga uprawnień admina (sprawdzane w aplikacji).';
