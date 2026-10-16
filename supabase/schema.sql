-- =============================================================================
-- AYUSH HUB — COMPLETE DATABASE SCHEMA & BACKEND SYSTEM (SUPABASE)
-- =============================================================================
-- Run this entire script in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Sets up Row Level Security (RLS), admin roles, and real persistent storage
-- for songs, movies, homepage content, social links, and collaboration leads.
-- =============================================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. ADMIN PROFILES (SUPERADMIN ACCESS CONTROL)
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'superadmin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_profiles enable row level security;

-- Security Definer: is_admin() checks if authenticated user is in admin_profiles
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role in ('admin', 'superadmin')
  );
$$;

-- RLS: Admins can view own profile
drop policy if exists "Admins can view their own profile" on public.admin_profiles;
create policy "Admins can view their own profile"
  on public.admin_profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- RLS: Admins can manage admin profiles
drop policy if exists "Admins can manage admin profiles" on public.admin_profiles;
create policy "Admins can manage admin profiles"
  on public.admin_profiles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- 3. SONGS TABLE (MUSIC & AUDIO MANAGER)
-- =============================================================================
create table if not exists public.songs (
  id text primary key,
  title text not null,
  artist text not null,
  movie text,
  category text default 'bollywood',
  youtube_id text,
  spotify_track_id text,
  spotify_url text,
  cover_url text,
  duration text default '3:30 min',
  genre text,
  mood text,
  rating text default '9.5/10',
  lyrics text,
  ayush_note text,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.songs enable row level security;

-- Public can read published songs only
drop policy if exists "Public visitors read published songs" on public.songs;
create policy "Public visitors read published songs"
  on public.songs
  for select
  to anon, authenticated
  using (is_published = true or public.is_admin());

-- Only SuperAdmin can insert, update, or delete songs
drop policy if exists "Admins manage songs" on public.songs;
create policy "Admins manage songs"
  on public.songs
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- 4. MOVIES TABLE (CINEMA VAULT & FILM CRITIQUE DESK)
-- =============================================================================
create table if not exists public.movies (
  id text primary key,
  title text not null,
  franchise text,
  category text default 'bollywood',
  category_label text,
  release_year text default '2024',
  release_date text,
  duration text default '2h 30m',
  genre text,
  director text,
  cast text[],
  language text default 'Hindi',
  is_hindi_dubbed boolean default true,
  rating numeric(3, 1) default 9.0,
  verdict text,
  overview text,
  review text,
  youtube_id text,
  poster_url text,
  backdrop_url text,
  status text default 'published',
  is_published boolean default true,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.movies enable row level security;

-- Public can read published movies only
drop policy if exists "Public visitors read published movies" on public.movies;
create policy "Public visitors read published movies"
  on public.movies
  for select
  to anon, authenticated
  using ((is_published = true and status != 'draft') or public.is_admin());

-- Only SuperAdmin can manage movies
drop policy if exists "Admins manage movies" on public.movies;
create policy "Admins manage movies"
  on public.movies
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- 5. SITE SETTINGS TABLE (HOMEPAGE, ABOUT, SOCIAL LINKS & FOOTER)
-- =============================================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_settings enable row level security;

-- Public can read site settings (hero text, social links, footer, etc.)
drop policy if exists "Public visitors read site settings" on public.site_settings;
create policy "Public visitors read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);

-- Only SuperAdmin can update site settings
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings"
  on public.site_settings
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- 6. INBOUND COLLABORATIONS TABLE (LEADS & PROPOSALS)
-- =============================================================================
create table if not exists public.collaborations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  category text default 'gaming',
  tags text[],
  notes text,
  status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.collaborations enable row level security;

-- Public visitors can submit collaboration leads
drop policy if exists "Public visitors submit collaborations" on public.collaborations;
create policy "Public visitors submit collaborations"
  on public.collaborations
  for insert
  to anon, authenticated
  with check (true);

-- Only SuperAdmin can read and update collaboration inquiries
drop policy if exists "Admins manage collaborations" on public.collaborations;
create policy "Admins manage collaborations"
  on public.collaborations
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- =============================================================================
-- 7. AUTHORIZE ADMINISTRATOR (AYUSH SHRIVASTAVA)
-- =============================================================================
INSERT INTO public.admin_profiles (id, email, role)
VALUES ('2ff3cbc6-2b4a-4187-aa7d-c9a613c4071a', 'ayushshrivastava2108@gmail.com', 'superadmin')
ON CONFLICT (id) DO UPDATE SET role = 'superadmin';
