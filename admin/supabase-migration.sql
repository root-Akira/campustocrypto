-- Run this in Supabase Dashboard → SQL Editor
ALTER TABLE events ADD COLUMN IF NOT EXISTS show_on_homepage boolean DEFAULT false;
