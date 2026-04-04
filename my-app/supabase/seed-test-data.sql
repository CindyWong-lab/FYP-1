-- Run in Supabase → SQL Editor (once). Safe to re-run inserts after TRUNCATE.

-- Saved connections shown on /connections
create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  db_type text not null,
  host text not null,
  port int not null default 5432,
  created_at timestamptz not null default now()
);

-- Optional: let authenticated roles read later; service_role bypasses RLS anyway.
alter table public.connections enable row level security;

insert into public.connections (name, db_type, host, port)
values
  ('Main Database', 'PostgreSQL', 'localhost', 5432),
  ('Testing Database', 'MySQL', 'localhost', 3306);

-- If you need to reset test rows:
-- truncate public.connections restart identity cascade;
