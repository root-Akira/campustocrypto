-- ============================================
-- Complete Supabase Setup for CampustoCrypto
-- Copy and paste this entire file into
-- Supabase Dashboard > SQL Editor > Run
-- ============================================

-- 1. Events table
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  date date not null,
  time time not null,
  location text not null,
  registration_link text,
  cover_image text,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Storage bucket for event images
insert into storage.buckets (id, name, public)
values ('events', 'events', true)
on conflict (id) do nothing;

-- 3. Row Level Security policies
drop policy if exists "Admin full access" on events;
drop policy if exists "Public read" on events;

create policy "Admin full access"
on events for all
to authenticated
using (true)
with check (true);

create policy "Public read"
on events for select
to anon
using (true);

-- 4. Seed demo events
insert into events (title, description, date, time, location, registration_link, featured)
values
  ('Weekly Builder Sessions', 'Every Saturday at 3 PM. Bring your laptop and build something in web3. All skill levels welcome.', '2026-06-06', '15:00', 'Centurion University', null, false),
  ('Blockchain Fundamentals',  'Monthly workshop series covering Bitcoin, Ethereum, smart contracts, and DeFi basics. Next session: June 10.', '2026-06-10', '14:00', 'Centurion University', null, false),
  ('Crypto Hackathon',         '48-hour buildathon in July. Form a team, build a dApp, and win prizes. Registration opens June 15.', '2026-07-15', '09:00', 'Centurion University', null, false),
  ('Guest Speaker Series',     'Industry leaders share their journey into crypto. Past speakers include founders, engineers, and researchers.', '2026-06-20', '16:00', 'Centurion University', null, false),
  ('Crypto Coffee Chat',       'Casual Friday meetups. No agenda — just good conversations about crypto over coffee.', '2026-06-12', '15:00', 'Centurion University', null, false),
  ('Protocol Deep Dives',      'Bi-weekly deep dives into specific protocols. Past topics: Solana, L2s, zk-proofs, and oracles.', '2026-06-18', '14:00', 'Centurion University', null, false),
  ('Hands-on Workshop: Build a dApp', 'Learn to build a full-stack decentralized application from scratch. All tools and resources provided.', '2026-06-25', '10:00', 'Centurion University', null, false),
  ('Web3 Networking Night',     'Connect with blockchain professionals, alumni, and fellow students over food and conversations.', '2026-06-28', '18:00', 'Centurion University', null, false),
  ('Crypto Trivia & Quiz Night','Test your crypto knowledge and win prizes. Fun for beginners and experts alike.', '2026-07-02', '17:00', 'Centurion University', null, false)
on conflict do nothing;
