-- Supabase evaluation schema
-- Safe to run multiple times (IF NOT EXISTS used)

-- Participants: one row per human participant
create table if not exists public.participants (
  participant_id text primary key,
  email text not null unique,
  name text,
  specialty text,
  years_practice text,
  region text,
  consent boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Sessions: one per evaluation session (uuid from server)
create table if not exists public.sessions (
  session_id uuid primary key,
  participant_id text not null references public.participants(participant_id) on delete cascade,
  app_version text,
  question_set_version integer,
  random_seed integer,
  ua text,
  referer text,
  ip text,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);
create index if not exists idx_sessions_participant on public.sessions(participant_id);

-- Questions: catalog of prompts and options shown
create table if not exists public.questions (
  question_id text primary key,
  prompt_text text not null,
  optionA_text text,
  optionB_text text,
  sourceA_id text,
  sourceB_id text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Responses: one per (session, question)
create table if not exists public.responses (
  response_id text primary key,
  session_id uuid not null references public.sessions(session_id) on delete cascade,
  participant_id text not null references public.participants(participant_id) on delete cascade,
  question_id text not null references public.questions(question_id) on delete cascade,
  shown_order text,
  choice text check (choice in ('A','B','tie','neither')),
  feedback_text text,
  time_started timestamptz,
  time_spent_ms integer,
  sourceA_id_at_eval text,
  sourceB_id_at_eval text,
  optionA_text_hash text,
  optionB_text_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_responses_session on public.responses(session_id);
create index if not exists idx_responses_participant on public.responses(participant_id);
create unique index if not exists unq_responses_session_question on public.responses(session_id, question_id);

-- Optional: tighten shown_order domain
-- alter table public.responses add constraint chk_shown_order check (shown_order in ('A|B','B|A'));

-- NOTE: With Supabase Service Role key, RLS is bypassed. If you enable RLS on these tables,
-- add policies to allow only the service role or your backend as appropriate.
