-- Waitlist table for Sushrut Health
-- Safe to run multiple times (IF NOT EXISTS used)

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  user_type text not null check (user_type in ('doctor', 'student')),
  specialty text,
  institution text,
  years_experience text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for faster queries
create index if not exists idx_waitlist_email on public.waitlist(email);
create index if not exists idx_waitlist_user_type on public.waitlist(user_type);
create index if not exists idx_waitlist_created_at on public.waitlist(created_at);

-- Enable Row Level Security (optional)
-- alter table public.waitlist enable row level security;

-- Create a policy to allow inserts (for signup)
-- create policy "Allow public inserts" on public.waitlist for insert with check (true);
