import { createAdminClient } from "@/lib/supabase/admin";
import { AdminPageHeader, AdminCard } from "@/components/admin/ui";
import { MediaManager } from "@/components/admin/MediaManager";

export const revalidate = 30;

const FOLDERS = ["media", "profile", "hero", "portfolio", "services", "og"];

async function listFolderUrls(folder: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const db = createAdminClient();
  const { data } = await db.storage
    .from("images")
    .list(folder, { limit: 500, sortBy: { column: "name", order: "desc" } });
  if (!data) return [];
  return data.map(
    (o) => `${url}/storage/v1/object/public/images/${folder}/${o.name}`
  );
}

export default async function MediaPage() {
  const folderMap: Record<string, string[]> = {};
  for (const folder of FOLDERS) {
    folderMap[folder] = await listFolderUrls(folder);
  }

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Upload images to Supabase Storage. Copy a URL and paste it into any image field."
      />
      <AdminCard>
        <MediaManager folders={FOLDERS} initial={folderMap} />
      </AdminCard>
    </>
  );
}