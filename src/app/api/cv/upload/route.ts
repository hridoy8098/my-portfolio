import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createAdminClient, hasSupabaseEnv } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req: Request) {
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

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      {
        error:
          "Unsupported file type. Only PDF, DOC and DOCX files are allowed.",
      },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File must be under 10MB" },
      { status: 400 }
    );
  }

  const ext = (file.name.split(".").pop() ?? "pdf").toLowerCase();
  const path = `cv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const db = createAdminClient();
  const { error } = await db.storage
    .from("cv")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = db.storage.from("cv").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}