import { createClient as createSupabaseJs } from "@supabase/supabase-js";

export function hasPublicEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createSupabaseJs(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}