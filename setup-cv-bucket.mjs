import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env = {};
for (const l of readFileSync("C:\\Users\\Hridoy\\Downloads\\hridoy-portfolio\\next-app\\.env.local", "utf8").split(/\r?\n/)) {
  const line = l.trim(); if (!line || line.startsWith("#") || !line.includes("=")) continue;
  const i = line.indexOf("="); env[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
}
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data: buckets, error: listErr } = await admin.storage.listBuckets();
if (listErr) { console.log("LIST ERR: " + listErr.message); }
console.log("buckets: " + JSON.stringify((buckets ?? []).map(b => `${b.name}(public=${b.public})`)));

const hasCv = (buckets ?? []).some((b) => b.name === "cv");
if (!hasCv) {
  const { data, error } = await admin.storage.createBucket("cv", {
    public: true,
    file_size_limit: 10485760,
    allowed_mime_types: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  });
  console.log("createBucket cv: " + (error ? "ERR " + error.message : "ok " + JSON.stringify(data)));
} else {
  console.log("cv bucket already exists");
}
process.exit(0);