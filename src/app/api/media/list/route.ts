import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const FOLDERS = ["media", "profile", "hero", "portfolio", "services", "og"];

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 500 }
    );
  }

  const db = createAdminClient();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  try {
    const result: Record<string, string[]> = {};

    for (const folder of FOLDERS) {
      const { data, error } = await db.storage
        .from("images")
        .list(folder, { limit: 500, sortBy: { column: "name", order: "desc" } });

      if (error) {
        result[folder] = [];
        continue;
      }

      result[folder] = (data ?? []).map(
        (o) => `${url}/storage/v1/object/public/images/${folder}/${o.name}`
      );
    }

    return NextResponse.json({ folders: result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to list images" },
      { status: 500 }
    );
  }
}