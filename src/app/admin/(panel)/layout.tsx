import { getSessionUser } from "@/lib/auth";
import { getProfile } from "@/lib/supabase/queries";
import { AdminShell } from "@/components/admin/AdminShell";

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
    <AdminShell nav={NAV} name={name} email={email}>
      {children}
    </AdminShell>
  );
}