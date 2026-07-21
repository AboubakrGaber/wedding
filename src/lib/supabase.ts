import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Gracefully degrade if env is missing so the site still renders.
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export type Rsvp = {
  id: number;
  name: string;
  phone: string | null;
  guests: number;
  message: string | null;
  attending: boolean;
  created_at: string;
};

export type RsvpInput = {
  name: string;
  phone: string;
  attending: boolean;
  guests: number;
  message: string;
};

/*
  The RSVPs are stored in the existing `public.rsvp` table:

    create table public.rsvp (
      id bigint generated always as identity primary key,
      name text not null,
      phone text,
      guests int not null default 1,
      message text,
      attending boolean not null default true,
      created_at timestamptz not null default now()
    );

  Enable RLS and allow anonymous inserts so guests can reply:

    alter table public.rsvp enable row level security;
    create policy "Anyone can submit an RSVP"
      on public.rsvp for insert to anon with check (true);
*/
