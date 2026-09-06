import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user || !user.email) return null;
  return user;
}

export async function getUserEmail() {
  const user = await getSessionUser();
  return user?.email ?? null;
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}