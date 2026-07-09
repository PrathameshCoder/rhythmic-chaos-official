import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Public (server-side) Supabase client using the ANON key.
 * Row Level Security restricts anon reads to public releases only
 * (published / upcoming, plus archived where smart_link_public = true),
 * so this client can never see drafts.
 *
 * Returns null if Supabase env vars aren't set yet — callers fall back to the
 * bundled snapshot so the site never breaks during the migration.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("YOUR-PROJECT-REF")) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
