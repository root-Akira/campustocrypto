# CampusToCrypto

Frontend website for CampusToCrypto — a college community exploring cryptocurrency, blockchain, and web3.

Built with **React + Vite**, styled with glassmorphism design, and backed by **Supabase**.

## Features

- **Home** with upcoming events, countdown, and featured event
- **Events** page — upcoming (sorted ascending) and past (sorted descending)
- **Register** page — nearest upcoming event with countdown and registration link
- **About**, **Journey** pages
- **Live auto-refresh** (5s polling) — changes from admin appear automatically
- **Homepage event selection** — admin can mark up to 3 events to show on homepage
- **Shared components**: `EventCard`, `Countdown`, `Layout`, `useAutoRefresh`
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML

## Prerequisites

- Node.js 18+
- A Supabase project with the `events` table

## Setup

```bash
# Install dependencies
npm install

# Copy environment file and fill in your Supabase credentials
cp .env.example .env
```

**.env** — you need a Supabase URL and an anon key:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Database

Run `seed.sql` (in the admin repo) against your Supabase SQL Editor to create the `events` table:

```sql
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
  show_on_homepage boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Row-level security policies:

```sql
create policy "Admin full access" on events for all to authenticated using (true) with check (true);
create policy "Public read" on events for select to anon using (true);
```

Also create a public storage bucket named `events`.

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to `dist/` — deploy to any static host (Vercel, Netlify, Cloudflare Pages, etc.).

For SPA routing, configure a fallback that serves `index.html` for all paths.

## Admin Dashboard

The admin dashboard is a **separate project** at a separate repository. It shares the same Supabase backend and provides event CRUD, image upload, featured/homepage toggles, and dashboard stats.
