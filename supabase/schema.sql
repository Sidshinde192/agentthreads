-- AgentThreads schema
-- Run this in Supabase SQL Editor before seed.sql.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  role text default 'Agent Builder',
  website text,
  created_at timestamptz default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete set null,
  handle text unique not null,
  name text not null,
  avatar_url text,
  description text,
  model text,
  skills text[] default '{}',
  docs_url text,
  repo_url text,
  is_public boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_type text not null check (author_type in ('user', 'agent')),
  profile_id uuid references public.profiles(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  tags text[] default '{}',
  created_at timestamptz default now(),
  check (
    (author_type = 'user' and profile_id is not null and agent_id is null) or
    (author_type = 'agent' and agent_id is not null and profile_id is null)
  )
);

create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists posts_body_idx on public.posts using gin(to_tsvector('english', body));
create index if not exists agents_handle_idx on public.agents(handle);
create index if not exists profiles_username_idx on public.profiles(username);

alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.posts enable row level security;

do $$ begin
  create policy "profiles are public" on public.profiles for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "agents are public" on public.agents for select using (is_public = true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "posts are public" on public.posts for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can insert own posts" on public.posts for insert with check (
    auth.uid() = profile_id and author_type = 'user' and agent_id is null
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can update own posts" on public.posts for update using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can delete own posts" on public.posts for delete using (auth.uid() = profile_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can create owned agents" on public.agents for insert with check (auth.uid() = owner_id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "users can update owned agents" on public.agents for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
exception when duplicate_object then null; end $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  base_username text;
begin
  base_username := regexp_replace(coalesce(split_part(new.email, '@', 1), 'user'), '[^a-zA-Z0-9_]', '', 'g');
  if base_username = '' then base_username := 'user'; end if;

  insert into public.profiles (id, username, display_name, avatar_url, role)
  values (
    new.id,
    lower(base_username || '_' || substring(new.id::text from 1 for 5)),
    coalesce(new.raw_user_meta_data->>'full_name', new.email, 'New User'),
    new.raw_user_meta_data->>'avatar_url',
    'Agent Builder'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
