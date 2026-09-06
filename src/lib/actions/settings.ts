"use server";

import type { AdminState } from "@/components/admin/AdminForm";
import { authedAdminClient, refreshSite, splitLines, str, bool, num } from "@/lib/actions/helpers";

function formObject(fd: FormData): Record<string, string> {
  return Object.fromEntries(
    Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
  );
}

function settingsAction(
  groupKey: string,
  build: (fd: FormData) => Record<string, unknown>
) {
  return async (prevState: AdminState, fd: FormData): Promise<AdminState> => {
    try {
      const db = await authedAdminClient();
      const value = build(fd);
      const { error } = await db
        .from("settings")
        .upsert({ key: groupKey, value }, { onConflict: "key" });
      if (error) return { error: error.message };
      refreshSite();
      return { success: true };
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Failed to save settings.",
      };
    }
  };
}

export const saveMetaSettings = settingsAction("meta", (fd) => ({
  site_title: str(fd.get("site_title")),
  description: str(fd.get("description")),
  keywords: splitLines(fd.get("keywords")),
  og_title: str(fd.get("og_title")),
  og_description: str(fd.get("og_description")),
  og_image: str(fd.get("og_image")),
  canonical_url: str(fd.get("canonical_url")),
  lang: str(fd.get("lang")) || "en",
  favicon_url: str(fd.get("favicon_url")),
  apple_icon_url: str(fd.get("apple_icon_url")),
}));

export const saveHeroSettings = settingsAction("hero", (fd) => ({
  hello_prefix: str(fd.get("hello_prefix")),
  typed_prefix: str(fd.get("typed_prefix")),
  primary_label: str(fd.get("primary_label")),
  primary_link: str(fd.get("primary_link")),
  cv_label: str(fd.get("cv_label")),
  cv_soon_label: str(fd.get("cv_soon_label")),
  contact_label: str(fd.get("contact_label")),
  contact_link: str(fd.get("contact_link")),
}));

export const saveFooterSettings = settingsAction("footer", (fd) => ({
  copyright_text: str(fd.get("copyright_text")),
  show_credit: bool(fd.get("show_credit")),
  credit_html: str(fd.get("credit_html")),
}));

export const saveSectionSubtitles = settingsAction("section_subtitles", (fd) => {
  const o = formObject(fd);
  const keys = ["about", "skills", "resume", "portfolio", "services", "contact"];
  return Object.fromEntries(keys.map((k) => [k, o[k] ?? ""]));
});

export const saveResumeLabels = settingsAction("resume_labels", (fd) => ({
  summary_heading: str(fd.get("summary_heading")),
  education_heading: str(fd.get("education_heading")),
  experience_heading: str(fd.get("experience_heading")),
}));

export const saveServiceDetailsSettings = settingsAction(
  "service_details",
  (fd) => ({
    page_title: str(fd.get("page_title")),
    heading: str(fd.get("heading")),
    image_url: str(fd.get("image_url")),
    highlight_heading: str(fd.get("highlight_heading")),
    highlight_body: str(fd.get("highlight_body")),
    paragraph: str(fd.get("paragraph")),
    paragraph_2: str(fd.get("paragraph_2")),
    checklist: splitLines(fd.get("checklist")),
    sidebar_heading: str(fd.get("sidebar_heading")),
  })
);

export const saveContactSettings = settingsAction("contact", (fd) => ({
  name_label: str(fd.get("name_label")),
  email_label: str(fd.get("email_label")),
  subject_label: str(fd.get("subject_label")),
  message_label: str(fd.get("message_label")),
  submit_label: str(fd.get("submit_label")),
  sending_label: str(fd.get("sending_label")),
  success_message: str(fd.get("success_message")),
  error_message: str(fd.get("error_message")),
  fieldErrorRequired: {
    name: str(fd.get("fieldError_name")),
    email: str(fd.get("fieldError_email")),
    subject: str(fd.get("fieldError_subject")),
    message: str(fd.get("fieldError_message")),
  },
  name_placeholder: str(fd.get("name_placeholder")),
  email_placeholder: str(fd.get("email_placeholder")),
  subject_placeholder: str(fd.get("subject_placeholder")),
  message_placeholder: str(fd.get("message_placeholder")),
}));

export async function saveThemeAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const db = await authedAdminClient();
    const value = {
      accent: str(fd.get("accent")),
      accent_dark: str(fd.get("accent_dark")),
      accent_soft: str(fd.get("accent_soft")),
      navy: str(fd.get("navy")),
      navy_light: str(fd.get("navy_light")),
      heading: str(fd.get("heading")),
      body: str(fd.get("body")),
      light: str(fd.get("light")),
      navm: str(fd.get("navm")),
      danger: str(fd.get("danger")),
      success: str(fd.get("success")),
      hero_overlay_opacity: num(fd.get("hero_overlay_opacity"), 20),
      font_heading: str(fd.get("font_heading")) || "raleway",
      font_body: str(fd.get("font_body")) || "roboto",
      font_nav: str(fd.get("font_nav")) || "poppins",
      updated_at: new Date().toISOString(),
    };
    const { error } = await db.from("theme").upsert({ id: 1, ...value });
    if (error) return { error: error.message };
    refreshSite();
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to save theme.",
    };
  }
}

export async function saveProfileAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const provided = new Set(Array.from(fd.keys()));
    const db = await authedAdminClient();
    const typedLines = splitLines(fd.get("typed_items"));
    const bodyLines = splitLines(fd.get("about_body"));
    const resumeBullets = splitLines(fd.get("resume_bullets"));
    const facts: Array<{ label: string; value: string }> = splitLines(
      fd.get("facts")
    ).map((line) => {
      const [label, ...rest] = line.split("::");
      return { label: label.trim(), value: rest.join("::").trim() };
    });

    const candidate = {
      name: str(fd.get("name")),
      role: str(fd.get("role")),
      typed_items: typedLines,
      subtitle: str(fd.get("subtitle")),
      cv_url: str(fd.get("cv_url")),
      email: str(fd.get("email")),
      phone: str(fd.get("phone")),
      city: str(fd.get("city")),
      degree: str(fd.get("degree")),
      availability: str(fd.get("availability")),
      github_handle: str(fd.get("github_handle")),
      github_url: str(fd.get("github_url")),
      linkedin_handle: str(fd.get("linkedin_handle")),
      linkedin_url: str(fd.get("linkedin_url")),
      photo_url: str(fd.get("photo_url")),
      hero_bg_url: str(fd.get("hero_bg_url")),
      about_headline: str(fd.get("about_headline")),
      about_intro: str(fd.get("about_intro")),
      about_body: bodyLines,
      resume_summary: str(fd.get("resume_summary")),
      resume_bullets: resumeBullets,
      facts,
    };

    const partial = Object.fromEntries(
      Object.entries(candidate).filter(([key]) => provided.has(key))
    );

    const { data: existing } = await db
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const { error } = await db
      .from("profile")
      .update({ ...(existing ?? {}), ...partial })
      .eq("id", 1);
    if (error) return { error: error.message };
    refreshSite();
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to save profile.",
    };
  }
}

const COLLECTION_KEYS = new Set([
  "social_links",
  "nav_items",
  "skill_categories",
  "services",
  "portfolio_categories",
]);

export async function deleteCollectionRowAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const table = str(fd.get("_table"));
    const id = num(fd.get("_id"));
    if (!COLLECTION_KEYS.has(table) || !id) return { error: "Invalid row." };
    const db = await authedAdminClient();
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) return { error: error.message };
    refreshSite();
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to delete.",
    };
  }
}

export async function togglePublishAction(
  prevState: AdminState,
  fd: FormData
): Promise<AdminState> {
  try {
    const table = str(fd.get("_table"));
    const id = num(fd.get("_id"));
    const published = bool(fd.get("_published"));
    if (!COLLECTION_KEYS.has(table) || !id) return { error: "Invalid row." };
    const db = await authedAdminClient();
    const { error } = await db
      .from(table)
      .update({ is_published: published })
      .eq("id", id);
    if (error) return { error: error.message };
    refreshSite();
    return { success: true };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Failed to update.",
    };
  }
}