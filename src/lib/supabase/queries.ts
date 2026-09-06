import { cache } from "react";
import { hasPublicEnv, createPublicClient } from "./public";
import type {
  Education,
  Experience,
  NavItem,
  PortfolioCategory,
  PortfolioItem,
  Profile,
  Service,
  SiteData,
  SiteSettings,
  Skill,
  SkillCategory,
  SocialLink,
  ThemeSettings,
} from "@/types/site";
import {
  fallbackCategories,
  fallbackEducation,
  fallbackExperience,
  fallbackNav,
  fallbackPortfolio,
  fallbackProfile,
  fallbackServices,
  fallbackSettings,
  fallbackSkillCategories,
  fallbackSocials,
  fallbackTheme,
} from "./fallback";

function db() {
  return createPublicClient();
}

function normalize<T>(rows: T[], fallback: T[]): T[] {
  if (!hasPublicEnv() || !rows) return fallback;
  return rows;
}

export const getProfile = cache(async (): Promise<Profile> => {
  if (!hasPublicEnv()) return fallbackProfile;
  const { data } = await db().from("profile").select("*").eq("id", 1).maybeSingle();
  if (!data) return fallbackProfile;
  return data as unknown as Profile;
});

export const getNavItems = cache(async (): Promise<NavItem[]> => {
  const { data } = await db()
    .from("nav_items")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as NavItem[], fallbackNav);
});

export const getSocialLinks = cache(async (): Promise<SocialLink[]> => {
  const { data } = await db()
    .from("social_links")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as SocialLink[], fallbackSocials);
});

export const getSkillCategories = cache(async (): Promise<SkillCategory[]> => {
  if (!hasPublicEnv()) return fallbackSkillCategories;
  const { data: catsData } = await db()
    .from("skill_categories")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });

  const categories = normalize(
    catsData as unknown as SkillCategory[],
    fallbackSkillCategories
  ).map((cat) => {
    const legacy = (cat as unknown as { skills?: unknown }).skills;
    const skills: Skill[] = Array.isArray(legacy)
      ? legacy.map((s, i) => ({
          id: `${cat.id}-${i}` as unknown as number,
          category_id: cat.id,
          name: String(s),
          icon: "",
          position: i + 1,
          is_published: true,
        }))
      : [];
    return { ...cat, skills };
  });
  return categories;
});

export const getSkills = cache(async (): Promise<Skill[]> => {
  const { data } = await db()
    .from("skills")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as Skill[], []);
});

export const getServices = cache(async (): Promise<Service[]> => {
  const { data } = await db()
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as Service[], fallbackServices);
});

export const getPortfolioCategories = cache(
  async (): Promise<PortfolioCategory[]> => {
    const { data } = await db()
      .from("portfolio_categories")
      .select("*")
      .eq("is_published", true)
      .order("position", { ascending: true });
    return normalize(data as unknown as PortfolioCategory[], fallbackCategories);
  }
);

export const getPortfolioItems = cache(async (): Promise<PortfolioItem[]> => {
  const { data } = await db()
    .from("portfolio_items")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as PortfolioItem[], fallbackPortfolio);
});

export const getAllPortfolioSlugs = cache(async (): Promise<string[]> => {
  if (!hasPublicEnv()) return fallbackPortfolio.map((p) => p.slug);
  const { data } = await db()
    .from("portfolio_items")
    .select("slug")
    .eq("is_published", true);
  return (data ?? []).map((r) => r.slug as string);
});

export const getPortfolioItemBySlug = cache(
  async (slug: string): Promise<PortfolioItem | null> => {
    if (!hasPublicEnv()) {
      return fallbackPortfolio.find((p) => p.slug === slug) ?? null;
    }
    const { data } = await db()
      .from("portfolio_items")
      .select("*")
      .eq("is_published", true)
      .eq("slug", slug)
      .maybeSingle();
    if (!data) return null;
    return data as unknown as PortfolioItem;
  }
);

export const getEducation = cache(async (): Promise<Education[]> => {
  const { data } = await db()
    .from("education")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as Education[], fallbackEducation);
});

export const getExperience = cache(async (): Promise<Experience[]> => {
  const { data } = await db()
    .from("experience")
    .select("*")
    .eq("is_published", true)
    .order("position", { ascending: true });
  return normalize(data as unknown as Experience[], fallbackExperience);
});

function deepMerge<T>(base: T, patch: Record<string, unknown>): T {
  if (!patch || typeof patch !== "object") return base;
  const result: Record<string, unknown> = { ...(base as object) };
  for (const [key, value] of Object.entries(patch)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof result[key] === "object" &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        value as Record<string, unknown>
      );
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

const SETTINGS_KEYS: Array<keyof SiteSettings> = [
  "meta",
  "hero",
  "footer",
  "section_subtitles",
  "resume_labels",
  "service_details",
  "contact",
];

export const getSettings = cache(async (): Promise<SiteSettings> => {
  if (!hasPublicEnv()) return fallbackSettings;
  const { data } = await db().from("settings").select("key, value");
  if (!data) return fallbackSettings;
  let settings: SiteSettings = structuredClone(fallbackSettings);
  for (const row of data) {
    const key = row.key as string;
    if ((SETTINGS_KEYS as string[]).includes(key)) {
      settings = {
        ...settings,
        [key]: deepMerge(
          settings[key as keyof SiteSettings] as unknown as Record<string, unknown>,
          (row.value as Record<string, unknown>) ?? {}
        ),
      };
    }
  }
  return settings;
});

export const getTheme = cache(async (): Promise<ThemeSettings> => {
  if (!hasPublicEnv()) return fallbackTheme;
  const { data } = await db().from("theme").select("*").eq("id", 1).maybeSingle();
  if (!data) return fallbackTheme;
  return { ...fallbackTheme, ...(data as Record<string, unknown>) } as unknown as ThemeSettings;
});

export const getSiteData = cache(async (): Promise<SiteData> => {
  const [profile, nav, socials] = await Promise.all([
    getProfile(),
    getNavItems(),
    getSocialLinks(),
  ]);
  return { profile, nav, socials };
});