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
  const totalImages = Object.values(folderMap).reduce((n, arr) => n + arr.length, 0);

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Upload images to Supabase Storage. Copy a URL and paste it into any image field."
      />
      
      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20">
            <i className="bi bi-images" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {totalImages}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Total images
            </p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20">
            <i className="bi bi-folder-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">
              {FOLDERS.length}
            </p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Folders
            </p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20">
            <i className="bi bi-cloud-arrow-up-fill" />
          </span>
          <div>
            <p className="text-xl font-bold tracking-tight text-[var(--admin-text)]">∞</p>
            <p className="text-[12px] font-medium text-[var(--admin-text-muted)]">
              Storage available
            </p>
          </div>
        </div>
      </div>

      <AdminCard>
        <MediaManager folders={FOLDERS} initial={folderMap} />
      </AdminCard>
    </>
  );
}