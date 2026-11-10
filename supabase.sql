-- Base de datos Constructorres · pegar en Supabase > SQL Editor > Run
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null check (length(nombre) between 1 and 200),
  whatsapp text check (length(whatsapp) <= 60),
  email text check (length(email) <= 200),
  ciudad text check (length(ciudad) <= 60), reunion text check (length(reunion) <= 60),
  busca text check (length(busca) <= 120), monto text check (length(monto) <= 60),
  decide text check (length(decide) <= 80), cuando text check (length(cuando) <= 60),
  puntaje int check (puntaje between 0 and 20), perfil text check (perfil in ('A','B','C')),
  estado text not null default 'Nuevo' check (estado in ('Nuevo','Contactado','Reunión agendada','Reunión hecha','Firmó','Descartado')),
  notas text check (length(notas) <= 4000),
  utm_source text check (length(utm_source) <= 120), utm_campaign text check (length(utm_campaign) <= 120), utm_content text check (length(utm_content) <= 120)
);
create table if not exists public.team (email text primary key, created_at timestamptz not null default now());

alter table public.leads enable row level security;
alter table public.team enable row level security;

create or replace function public.is_team() returns boolean language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.team where email = lower(coalesce(auth.jwt()->>'email',''))) $$;

revoke all on public.leads from anon, authenticated;
revoke all on public.team from anon, authenticated;
grant insert (nombre,whatsapp,email,ciudad,reunion,busca,monto,decide,cuando,puntaje,perfil,utm_source,utm_campaign,utm_content) on public.leads to anon, authenticated;
grant select, update (estado, notas) on public.leads to authenticated;
grant select, insert on public.team to authenticated;

drop policy if exists "landing inserta" on public.leads;
create policy "landing inserta" on public.leads for insert to anon, authenticated with check (estado = 'Nuevo' and notas is null);
drop policy if exists "equipo lee" on public.leads;
create policy "equipo lee" on public.leads for select to authenticated using (public.is_team());
drop policy if exists "equipo edita" on public.leads;
create policy "equipo edita" on public.leads for update to authenticated using (public.is_team()) with check (public.is_team());
drop policy if exists "equipo ve equipo" on public.team;
create policy "equipo ve equipo" on public.team for select to authenticated using (public.is_team());
drop policy if exists "equipo agrega" on public.team;
create policy "equipo agrega" on public.team for insert to authenticated with check (public.is_team() and email = lower(email));

do $$ begin
  alter publication supabase_realtime add table public.leads;
exception when duplicate_object then null; end $$;

-- Primer miembro del equipo (reemplazar por tu email):
insert into public.team (email) values ('TU_EMAIL') on conflict do nothing;
