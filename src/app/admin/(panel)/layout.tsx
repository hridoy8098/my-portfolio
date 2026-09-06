import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { getProfile } from "@/lib/supabase/queries";
import { AccountMenu } from "@/components/admin/AccountMenu";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "bi-speedometer2" },
  { href: "/admin/settings", label: "Site Settings", icon: "bi-gear" },
  { href: "/admin/theme", label: "Theme", icon: "bi-palette" },
  { href: "/admin/profile", label: "Profile", icon: "bi-person-badge" },
  { href: "/admin/account", label: "Account", icon: "bi-person-lock" },
  { href: "/admin/nav", label: "Navigation", icon: "bi-list-nested" },
  { href: "/admin/skills", label: "Skills", icon: "bi-tools" },
  { href: "/admin/services", label: "Services", icon: "bi-briefcase" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "bi-collection" },
  { href: "/admin/resume", label: "Resume", icon: "bi-file-earmark-text" },
  { href: "/admin/messages", label: "Messages", icon: "bi-envelope" },
  { href: "/admin/media", label: "Media", icon: "bi-images" },
];

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, profile] = await Promise.all([getSessionUser(), getProfile()]);
  const name = user?.user_metadata?.name || profile?.name || "Admin";
  const email = user?.email ?? "";

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[240px] flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm text-white">
            <i className="bi bi-code-slash" />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Portfolio</p>
            <p className="text-[11px] leading-tight text-gray-400">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                >
                  <i className={`bi ${item.icon} w-5 text-gray-400`} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-2">
          <AccountMenu name={name} email={email} />
        </div>
      </aside>

      <main className="ml-[240px] w-[calc(100%-240px)] px-8 py-8">
        {children}
      </main>
    </div>
  );
}