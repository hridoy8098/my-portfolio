"use server";

import type { AdminState } from "@/components/admin/AdminForm";
import { requireUser } from "@/lib/auth";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/admin";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateAdminEmailAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    if (!hasSupabaseEnv()) {
      return { error: "Supabase is not configured." };
    }
    const user = await requireUser();
    const email = String(fd.get("email") ?? "").trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      return { error: "Enter a valid email address." };
    }
    const db = createAdminClient();
    const { error } = await db.auth.admin.updateUserById(user.id, {
      email,
      email_confirm: true,
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update email." };
  }
}

export async function updateAdminPasswordAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    if (!hasSupabaseEnv()) {
      return { error: "Supabase is not configured." };
    }
    const user = await requireUser();
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password.length < 8) {
      return { error: "Password must be at least 8 characters." };
    }
    if (password !== confirm) {
      return { error: "Passwords do not match." };
    }
    const db = createAdminClient();
    const { error } = await db.auth.admin.updateUserById(user.id, { password });
    if (error) return { error: error.message };
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to update password.",
    };
  }
}