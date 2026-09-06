import Link from "next/link";
import { authedAdminClient } from "@/lib/actions/helpers";
import { AdminPageHeader } from "@/components/admin/ui";

export const revalidate = 60;

function StatCard({
  label,
  value,
  href,
  icon,
  trend,
  accent = "indigo",
}: {
  label: string;
  value: number;
  href: string;
  icon: string;
  trend?: string;
  accent?: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
}) {
  const accents: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", ring: "ring-indigo-500/20", gradient: "from-indigo-500 to-indigo-700" },
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", ring: "ring-emerald-500/20", gradient: "from-emerald-500 to-emerald-700" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600", ring: "ring-amber-500/20", gradient: "from-amber-500 to-amber-700" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-600", ring: "ring-rose-500/20", gradient: "from-rose-500 to-rose-700" },
    sky: { bg: "bg-sky-500/10", text: "text-sky-600", ring: "ring-sky-500/20", gradient: "from-sky-500 to-sky-700" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-600", ring: "ring-violet-500/20", gradient: "from-violet-500 to-violet-700" },
  };
  const a = accents[accent];

  return (
    <Link
      href={href}
      className="admin-card admin-card-hover group block overflow-hidden"
    >
      <div className="relative p-5">
        {/* Decorative corner blob */}
        <div
          className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${a.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
        />
        <div className="relative flex items-start justify-between">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.bg} ${a.text} ring-1 ${a.ring}`}
          >
            <i className={`bi ${icon} text-lg`} />
          </span>
          {trend && (
            <span className={`admin-pill ${a.bg} ${a.text}`}>
              <i className="bi bi-graph-up-arrow text-[10px]" />
              {trend}
            </span>
          )}
        </div>
        <div className="relative mt-4">
          <p className="text-3xl font-bold tracking-tight text-[var(--admin-text)]">
            {value}
          </p>
          <p className="mt-1 text-[13px] font-medium text-[var(--admin-text-muted)]">
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
}

function QuickAction({
  href,
  label,
  description,
  icon,
  accent,
}: {
  href: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3.5 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-3.5 transition hover:border-[var(--admin-accent)] hover:shadow-md"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent} transition group-hover:scale-110`}
      >
        <i className={`bi ${icon} text-base`} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-[var(--admin-text)]">
          {label}
        </p>
        <p className="truncate text-[11px] text-[var(--admin-text-muted)]">
          {description}
        </p>
      </div>
      <i className="bi bi-arrow-right text-[12px] text-[var(--admin-text-soft)] transition group-hover:translate-x-0.5 group-hover:text-[var(--admin-accent)]" />
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const db = await authedAdminClient();
  const [messages, projects, services, skills, unread, recentMessages, recentProjects] =
    await Promise.all([
      db.from("messages").select("id, created_at", { count: "exact", head: false }).order("created_at", { ascending: false }).limit(5),
      db.from("portfolio_items").select("id, title, created_at", { count: "exact", head: false }).order("created_at", { ascending: false }).limit(5),
      db.from("services").select("id", { count: "exact", head: true }),
      db.from("skill_categories").select("id", { count: "exact", head: true }),
      db.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
      db.from("messages").select("id, name, email, subject, created_at, is_read").order("created_at", { ascending: false }).limit(5),
      db.from("portfolio_items").select("id, title, slug, created_at").order("created_at", { ascending: false }).limit(5),
    ]);

  const msgCount = messages.count ?? 0;
  const projCount = projects.count ?? 0;
  const svcCount = services.count ?? 0;
  const skillCount = skills.count ?? 0;
  const unreadCount = unread.count ?? 0;
  const recentMsgs = (recentMessages as unknown) as Array<{
    id: string;
    name: string;
    email: string;
    subject: string | null;
    created_at: string;
    is_read: boolean;
  }> ?? [];
  const recentProjs = (recentProjects as unknown) as Array<{
    id: string;
    title: string;
    slug: string;
    created_at: string;
  }> ?? [];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of your portfolio content and recent activity."
      />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Unread messages"
          value={unreadCount}
          href="/admin/messages"
          icon="bi-envelope-exclamation-fill"
          accent="rose"
          trend={unreadCount > 0 ? "New" : undefined}
        />
        <StatCard
          label="Total messages"
          value={msgCount}
          href="/admin/messages"
          icon="bi-envelope-fill"
          accent="sky"
        />
        <StatCard
          label="Projects"
          value={projCount}
          href="/admin/portfolio"
          icon="bi-collection-fill"
          accent="indigo"
        />
        <StatCard
          label="Services"
          value={svcCount}
          href="/admin/services"
          icon="bi-briefcase-fill"
          accent="violet"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Skill groups"
          value={skillCount}
          href="/admin/skills"
          icon="bi-tools"
          accent="emerald"
        />
      </div>

      {/* Two-column section: Activity + Quick Actions */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent activity — takes 2 cols */}
        <div className="lg:col-span-2">
          <div className="admin-card">
            <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-5 py-4">
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
                  Recent activity
                </h2>
                <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">
                  Latest messages and project updates
                </p>
              </div>
              <Link
                href="/admin/messages"
                className="text-[12px] font-medium text-[var(--admin-accent)] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="divide-y divide-[var(--admin-border)]">
              {recentMsgs.length === 0 && recentProjs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                    <i className="bi bi-inbox text-xl" />
                  </span>
                  <p className="mt-3 text-sm text-[var(--admin-text-muted)]">
                    No recent activity yet
                  </p>
                </div>
              ) : (
                <>
                  {recentMsgs.map((m) => (
                    <Link
                      key={`msg-${m.id}`}
                      href="/admin/messages"
                      className="flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-[var(--admin-surface-2)]"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                          m.is_read
                            ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            : "bg-indigo-500/10 text-indigo-600 ring-2 ring-indigo-500/20"
                        }`}
                      >
                        {m.name?.charAt(0).toUpperCase() ?? "?"}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-[var(--admin-text)]">
                          {m.name}
                          {!m.is_read && (
                            <span className="ml-2 inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                          )}
                        </p>
                        <p className="truncate text-[12px] text-[var(--admin-text-muted)]">
                          {m.subject || m.email}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-[var(--admin-text-soft)]">
                        {new Date(m.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </Link>
                  ))}
                  {recentProjs.map((p) => (
                    <Link
                      key={`proj-${p.id}`}
                      href={`/admin/portfolio/${p.id}`}
                      className="flex items-center gap-3.5 px-5 py-3.5 transition hover:bg-[var(--admin-surface-2)]"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20">
                        <i className="bi bi-folder2-open text-[13px]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-[var(--admin-text)]">
                          {p.title}
                        </p>
                        <p className="truncate text-[12px] text-[var(--admin-text-muted)]">
                          Project updated
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-[var(--admin-text-soft)]">
                        {new Date(p.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick actions — 1 col */}
        <div className="space-y-4">
          <div className="admin-card">
            <div className="border-b border-[var(--admin-border)] px-5 py-4">
              <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
                Quick actions
              </h2>
              <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">
                Jump to common tasks
              </p>
            </div>
            <div className="space-y-2 p-3">
              <QuickAction
                href="/admin/portfolio/new"
                label="Add new project"
                description="Create a portfolio item"
                icon="bi-plus-lg"
                accent="bg-indigo-500/10 text-indigo-600"
              />
              <QuickAction
                href="/admin/services"
                label="Edit services"
                description="Manage your offerings"
                icon="bi-briefcase"
                accent="bg-violet-500/10 text-violet-600"
              />
              <QuickAction
                href="/admin/media"
                label="Upload media"
                description="Add images to library"
                icon="bi-cloud-arrow-up"
                accent="bg-sky-500/10 text-sky-600"
              />
              <QuickAction
                href="/admin/theme"
                label="Customize theme"
                description="Colors, fonts, styling"
                icon="bi-palette"
                accent="bg-amber-500/10 text-amber-600"
              />
              <QuickAction
                href="/admin/settings"
                label="Site settings"
                description="General configuration"
                icon="bi-gear"
                accent="bg-emerald-500/10 text-emerald-600"
              />
            </div>
          </div>

          {/* Tip card */}
          <div className="admin-card overflow-hidden border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-900/30 dark:from-amber-950/30 dark:to-orange-950/20">
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
                  <i className="bi bi-lightbulb-fill" />
                </span>
                <h3 className="text-[14px] font-semibold text-amber-900 dark:text-amber-300">
                  Pro tip
                </h3>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-amber-800 dark:text-amber-200/80">
                Changes are published immediately. Use{" "}
                <Link
                  href="/admin/media"
                  className="font-semibold underline underline-offset-2"
                >
                  Media
                </Link>{" "}
                to upload images and{" "}
                <Link
                  href="/admin/theme"
                  className="font-semibold underline underline-offset-2"
                >
                  Theme
                </Link>{" "}
                to customize colors &amp; fonts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
