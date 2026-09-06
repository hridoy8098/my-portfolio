import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  fallbackProfile,
  fallbackPortfolio,
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
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRole) {
  console.error("Missing Supabase config in .env.local");
  process.exit(1);
}

const db = createClient(url, serviceRole, { auth: { persistSession: false } });

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

async function uploadIfExists(rel: string, folder: string, map: Map<string, string>) {
  const abs = join(process.cwd(), "public", rel);
  if (!existsSync(abs)) {
    console.log(`  skip (missing file): ${rel}`);
    return;
  }
  const name = rel.split("/").pop() ?? "file";
  const ext = name.split(".").pop() ?? "jpg";
  const storagePath = `${folder}/${name}`;
  const { error } = await db.storage.from("images").upload(storagePath, readFileSync(abs), {
    upsert: true,
    contentType: MIME[ext] ?? "image/jpeg",
  });
  if (error) {
    console.error(`  upload ${rel} FAILED: ${error.message}`);
    return;
  }
  const publicUrl = `${url}/storage/v1/object/public/images/${storagePath}`;
  map.set(rel, publicUrl);
  console.log(`  ${rel} -> ${publicUrl}`);
}

async function main() {
  console.log("Uploading public images to Supabase Storage…");
  const map = new Map<string, string>();

  await uploadIfExists(fallbackProfile.photo_url ?? "", "profile", map);
  await uploadIfExists(fallbackProfile.hero_bg_url ?? "", "hero", map);
  await uploadIfExists(fallbackSettings.service_details.image_url, "services", map);
  for (const item of fallbackPortfolio) {
    if (item.image) await uploadIfExists(item.image, "portfolio", map);
    for (const s of item.screenshots ?? []) await uploadIfExists(s, "portfolio", map);
  }

  if (map.size === 0) {
    console.log("No image files uploaded — local URLs stay in place.");
    return;
  }

  console.log("\nUpdating database rows to use Storage URLs…");

  const photo = map.get("/my-profile-img.jpg");
  if (photo) {
    const { error } = await db.from("profile").update({ photo_url: photo }).eq("id", 1);
    if (error) console.error("  profile photo update FAILED:", error.message);
    else console.log("  profile.photo_url updated");
  }

  const heroBg = map.get("/hero-bg.jpg");
  if (heroBg) {
    const { error } = await db.from("profile").update({ hero_bg_url: heroBg }).eq("id", 1);
    if (error) console.error("  profile hero_bg update FAILED:", error.message);
    else console.log("  profile.hero_bg_url updated");
  }

  const servicesImage = map.get("/services.jpg");
  if (servicesImage) {
    const { data: row } = await db.from("settings").select("value").eq("key", "service_details").maybeSingle();
    const value = (row?.value ?? fallbackSettings.service_details) as Record<string, unknown>;
    const { error } = await db
      .from("settings")
      .update({ value: { ...value, image_url: servicesImage } })
      .eq("key", "service_details");
    if (error) console.error("  service_details image update FAILED:", error.message);
    else console.log("  service_details.image_url updated");
  }

  for (const item of fallbackPortfolio) {
    const image = map.get(item.image);
    const screenshots = (item.screenshots ?? []).map((s) => map.get(s) ?? s);
    if (!image) continue;
    const { error } = await db
      .from("portfolio_items")
      .update({ image, screenshots })
      .eq("slug", item.slug);
    if (error) console.error(`  portfolio "${item.slug}" update FAILED: ${error.message}`);
    else console.log(`  portfolio "${item.slug}" updated`);
  }

  console.log("Done.");
}

main();