"use server";

import type { AdminState } from "@/components/admin/AdminForm";
import { authedAdminClient, refreshSite, splitLines, str, bool, num } from "@/lib/actions/helpers";

function parseJsonArray<T>(value: string, fallback: T[]): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function upsertRow(
  table: string,
  build: (fd: FormData) => Record<string, unknown>
) {
  return async (prevState: AdminState, fd: FormData): Promise<AdminState> => {
    try {
      const id = num(fd.get("_id"));
      const db = await authedAdminClient();
      const payload = build(fd);
      const { error } = id
        ? await db.from(table).update(payload).eq("id", id)
        : await db.from(table).insert([{ ...payload, position: num(fd.get("position"), 0) }]);
      if (error) return { error: error.message };
      refreshSite();
      return { success: true };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Failed to save.",
      };
    }
  };
}

export const saveSocialLinkAction = upsertRow("social_links", (fd) => ({
  label: str(fd.get("label")),
  icon: str(fd.get("icon")),
  url: str(fd.get("url")),
  is_published: bool(fd.get("is_published")),
}));

export const saveNavItemAction = upsertRow("nav_items", (fd) => ({
  section_id: str(fd.get("section_id")),
  label: str(fd.get("label")),
  icon: str(fd.get("icon")),
  is_published: bool(fd.get("is_published")),
}));

export const saveSkillCategoryAction = upsertRow("skill_categories", (fd) => ({
  label: str(fd.get("label")),
  icon: str(fd.get("icon")),
  is_published: bool(fd.get("is_published")),
}));

export const saveSkillAction = upsertRow("skills", (fd) => ({
  name: str(fd.get("name")),
  icon: str(fd.get("icon")),
  category_id: num(fd.get("category_id")),
  is_published: bool(fd.get("is_published")),
}));

export const saveServiceAction = upsertRow("services", (fd) => ({
  icon: str(fd.get("icon")),
  title: str(fd.get("title")),
  description: str(fd.get("description")),
  points: splitLines(fd.get("points")),
  is_published: bool(fd.get("is_published")),
}));

export const savePortfolioCategoryAction = upsertRow(
  "portfolio_categories",
  (fd) => ({
    value: str(fd.get("value")),
    label: str(fd.get("label")),
    is_published: bool(fd.get("is_published")),
  })
);

export const savePortfolioItemAction = upsertRow("portfolio_items", (fd) => {
  const sections = parseJsonArray<
    { id: string; title: string; icon: string; items: string[] }
  >(str(fd.get("sections")), []).map((s) => ({
    id: s.id || `s-${Math.random().toString(36).slice(2, 8)}`,
    title: s.title ?? "",
    icon: s.icon ?? "bi-journal-text",
    items: Array.isArray(s.items) ? s.items : [],
  }));
  return {
    slug: str(fd.get("slug")),
    title: str(fd.get("title")),
    categories: splitLines(fd.get("categories")),
    description: str(fd.get("description")),
    image: str(fd.get("image")),
    screenshots: splitLines(fd.get("screenshots")),
    technologies: splitLines(fd.get("technologies")),
    live_url: str(fd.get("live_url")),
    github_url: str(fd.get("github_url")),
    detail_category: str(fd.get("detail_category")),
    detail_client: str(fd.get("detail_client")),
    detail_date: str(fd.get("detail_date")),
    detail_status: str(fd.get("detail_status")),
    sections,
    is_featured: bool(fd.get("is_featured")),
    is_published: bool(fd.get("is_published")),
  };
});

export const saveEducationAction = upsertRow("education", (fd) => ({
  degree: str(fd.get("degree")),
  institution: str(fd.get("institution")),
  description: str(fd.get("description")),
  is_published: bool(fd.get("is_published")),
}));

export const saveExperienceAction = upsertRow("experience", (fd) => ({
  role: str(fd.get("role")),
  organization: str(fd.get("organization")),
  period: str(fd.get("period")),
  responsibilities: splitLines(fd.get("responsibilities")),
  description: str(fd.get("description")),
  is_published: bool(fd.get("is_published")),
}));

export async function deleteRowAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const table = str(fd.get("_table"));
    const id = num(fd.get("_id"));
    const allowed = new Set([
      "social_links",
      "nav_items",
      "skill_categories",
      "skills",
      "services",
      "portfolio_categories",
      "portfolio_items",
      "education",
      "experience",
    ]);
    if (!allowed.has(table) || !id) return { error: "Invalid row." };
    const db = await authedAdminClient();
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) return { error: error.message };
    refreshSite();
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete." };
  }
}

export async function deleteMessageAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const db = await authedAdminClient();
    const { error } = await db
      .from("messages")
      .delete()
      .eq("id", num(fd.get("_id")));
    if (error) return { error: error.message };
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to delete." };
  }
}

export async function toggleMessageReadAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const db = await authedAdminClient();
    const { error } = await db
      .from("messages")
      .update({ is_read: bool(fd.get("_read")) })
      .eq("id", num(fd.get("_id")));
    if (error) return { error: error.message };
    return { success: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Failed to update." };
  }
}