import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (service role bypasses RLS).
 * Use only in Route Handlers, Server Actions, and Server Components — never import from client components.
 * For production you will usually prefer the anon key + RLS policies; this is fine for a first wiring test.
 */
export function createSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL in .env.local (Supabase → Project Settings → API → Project URL).",
    );
  }
  if (!key) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local. The publishable/anon key is not enough — copy the secret service_role key from the same API page (never expose it in the browser).",
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
