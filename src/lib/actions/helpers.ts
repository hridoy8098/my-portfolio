import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/admin";

export async function authedAdminClient() {
  await requireUser();
  if (!hasSupabaseEnv()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createAdminClient();
}

export function refreshSite() {
  revalidatePath("/", "layout");
  revalidatePath("/projects", "layout");
  revalidatePath("/portfolio", "layout");
  revalidatePath("/service-details", "layout");
}

export function splitLines(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function str(value: FormDataEntryValue | null): string {
  return value ? String(value).trim() : "";
}

export function bool(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true" || value === "1";
}

export function num(value: FormDataEntryValue | null, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}