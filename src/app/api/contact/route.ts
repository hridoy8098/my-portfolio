import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createPublicClient } from "@/lib/supabase/public";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    console.error("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured");
    return NextResponse.json(
      { error: "Message storage is not configured" },
      { status: 500 }
    );
  }

  const db = createPublicClient();
  const { error: insertError } = await db.from("messages").insert({
    name,
    email,
    subject,
    message,
  });

  if (insertError) {
    console.error("Supabase insert error", insertError);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  if (apiKey && to) {
    try {
      const resend = new Resend(apiKey);
      const { error: emailError } = await resend.emails.send({
        from,
        to: [to],
        subject: `Portfolio message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      if (emailError) {
        console.error("Resend error (message saved to admin panel)", emailError);
      }
    } catch (e) {
      console.error("Resend exception (message saved to admin panel)", e);
    }
  } else {
    console.warn("RESEND_API_KEY or CONTACT_EMAIL not configured; email notification skipped");
  }

  return NextResponse.json({ ok: true });
}