import Link from "next/link";
import { authedAdminClient } from "@/lib/actions/helpers";
import { AdminPageHeader } from "@/components/admin/ui";

export const revalidate = 60;

function Card({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: number;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-accent"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-accent/10 text-accent">
        <i className={`bi ${icon} text-lg`} />
      </span>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-[13px] text-gray-500">{label}</p>
      </div>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const db = await authedAdminClient();
  const [messages, projects, services, skills, unread] = await Promise.all([
    db.from("messages").select("id", { count: "exact", head: true }),
    db.from("portfolio_items").select("id", { count: "exact", head: true }),
    db.from("services").select("id", { count: "exact", head: true }),
    db.from("skill_categories").select("id", { count: "exact", head: true }),
    db.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your portfolio content."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          label="Unread messages"
          value={unread.count ?? 0}
          href="/admin/messages"
          icon="bi-envelope-exclamation"
        />
        <Card
          label="Total messages"
          value={messages.count ?? 0}
          href="/admin/messages"
          icon="bi-envelope"
        />
        <Card
          label="Projects"
          value={projects.count ?? 0}
          href="/admin/portfolio"
          icon="bi-collection"
        />
        <Card
          label="Services"
          value={services.count ?? 0}
          href="/admin/services"
          icon="bi-briefcase"
        />
        <Card
          label="Skill groups"
          value={skills.count ?? 0}
          href="/admin/skills"
          icon="bi-tools"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Quick actions</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/admin/portfolio/new", label: "Add project", icon: "bi-plus-lg" },
              { href: "/admin/services", label: "Add service", icon: "bi-plus-lg" },
              { href: "/admin/media", label: "Upload image", icon: "bi-cloud-arrow-up" },
              { href: "/admin/settings", label: "Edit site settings", icon: "bi-pencil-square" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-[13px] font-medium text-gray-700 transition hover:border-accent hover:text-accent"
              >
                <i className={`bi ${a.icon}`} />
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
            <i className="bi bi-lightbulb" /> Tip
          </h2>
          <p className="text-[13px] leading-relaxed text-amber-800">
            Changes are published immediately. Use{" "}
            <Link href="/admin/media" className="underline">
              Media
            </Link>{" "}
            to upload images (they get a Supabase Storage URL you can paste into
            any image field), and set your colors and fonts under{" "}
            <Link href="/admin/theme" className="underline">
              Theme
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}