create extension if not exists pgcrypto;

create table if not exists public.studio_notes (
  id uuid primary key default gen_random_uuid(),
  note_text text not null,
  note_date timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.studio_notes enable row level security;

drop policy if exists "studio_notes_no_public_access" on public.studio_notes;
create policy "studio_notes_no_public_access"
on public.studio_notes
for all
using (false)
with check (false);
