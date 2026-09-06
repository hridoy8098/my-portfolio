import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  fallbackProfile,
  fallbackNav,
  fallbackSocials,
  fallbackSkillCategories,
  fallbackSkills,
  fallbackServices,
  fallbackCategories,
  fallbackPortfolio,
  fallbackEducation,
  fallbackExperience,
  fallbackTheme,
  fallbackSettings,
} from "../src/lib/supabase/fallback.ts";

loadDotEnv(".env.local");

function loadDotEnv(path: string) {
  try {
    const content = readFileSync(join(process.cwd(), path), "utf8");
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // no .env.local
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error(
    "Missing Supabase config. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (in .env.local)."
  );
  process.exit(1);
}

const db = createClient(url, serviceRole, { auth: { persistSession: false } });

async function upsertAll(table: string, rows: Record<string, unknown>[], onConflict: string) {
  if (rows.length === 0) {
    console.log(`[${table}] skipped (0 rows)`);
    return;
  }
  const { error } = await db.from(table).upsert(rows, { onConflict });
  if (error) {
    console.error(`[${table}] FAILED: ${error.message}`);
  } else {
    console.log(`[${table}] ok (${rows.length} rows)`);
  }
}

async function main() {
  console.log("Seeding Supabase…");

  const { error: profileError } = await db
    .from("profile")
    .upsert({ id: 1, ...fallbackProfile });
  if (profileError) {
    console.error(`[profile] FAILED: ${profileError.message}`);
  } else {
    console.log("[profile] ok");
  }

  await upsertAll("social_links", fallbackSocials as unknown as Record<string, unknown>[], "id");
  await upsertAll("nav_items", fallbackNav as unknown as Record<string, unknown>[], "id");
  const skillCategoryRows = (fallbackSkillCategories as unknown as Record<string, unknown>[]).map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { skills: _skills, ...rest } = row;
    return rest;
  });
  await upsertAll("skill_categories", skillCategoryRows, "id");
  await upsertAll("skills", fallbackSkills as unknown as Record<string, unknown>[], "id");
  await upsertAll("services", fallbackServices as unknown as Record<string, unknown>[], "id");
  await upsertAll("portfolio_categories", fallbackCategories as unknown as Record<string, unknown>[], "id");
  const portfolioRows = (fallbackPortfolio as unknown as Record<string, unknown>[]).map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, updated_at, ...rest } = row;
    return rest;
  });
  await upsertAll("portfolio_items", portfolioRows, "id");
  await upsertAll("education", fallbackEducation as unknown as Record<string, unknown>[], "id");
  await upsertAll("experience", fallbackExperience as unknown as Record<string, unknown>[], "id");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updated_at: _themeUpdatedAt, ...themeRow } = fallbackTheme;
  await upsertAll("theme", [{ id: 1, ...themeRow }], "id");

  const settingsRows = Object.entries(fallbackSettings).map(([key, value]) => ({ key, value }));
  await upsertAll("settings", settingsRows, "key");

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const { error } = await db.auth.admin.createUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.log(`[auth] admin user not created: ${error.message}`);
    } else {
      console.log(`[auth] created admin user: ${process.env.ADMIN_EMAIL}`);
    }
  } else {
    console.log("[auth] skipped (set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to create the admin user)");
  }

  console.log("Done.");
}

main();