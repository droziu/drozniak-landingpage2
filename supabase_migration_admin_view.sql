-- =========================================
-- MIGRACJA - View dla admina z danymi użytkowników
-- =========================================

-- View łączące profiles z auth.users (tylko dla admina)
create or replace view public.user_profiles_with_email as
select 
  p.id,
  p.full_name,
  p.company_name,
  p.first_name,
  p.last_name,
  p.phone,
  p.notes,
  p.created_at,
  p.updated_at,
  au.email
from public.profiles p
left join auth.users au on p.id = au.id;

-- RLS dla view (tylko admin może widzieć)
alter view public.user_profiles_with_email owner to postgres;

-- Komentarz
comment on view public.user_profiles_with_email is 'View łączące profiles z auth.users - tylko dla admina';

-- Funkcja pomocnicza do pobierania email (alternatywa)
create or replace function public.get_user_email(user_id uuid)
returns text as $$
begin
  return (
    select email::text 
    from auth.users 
    where id = user_id
  );
end;
$$ language plpgsql security definer stable;

-- Komentarz
comment on function public.get_user_email(uuid) is 'Zwraca email użytkownika z auth.users (tylko dla admina)';

