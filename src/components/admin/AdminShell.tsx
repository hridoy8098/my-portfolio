"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/admin/AccountMenu";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

type NavItem = { href: string; label: string; icon: string };
type NavGroup = { label: string; items: NavItem[] };

function isActive(item: NavItem, pathname: string) {
  return item.href === "/admin"
    ? pathname === "/admin"
    : pathname.startsWith(item.href);
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-sm text-white shadow-lg shadow-indigo-900/40 ring-1 ring-white/10">
        <i className="bi bi-code-slash" />
        <span className="absolute -inset-1 -z-10 rounded-xl bg-indigo-500/30 blur-md" />
      </span>
      {!collapsed && (
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight text-white">Portfolio</p>
          <p className="text-[11px] leading-tight text-slate-400">Admin Panel</p>
        </div>
      )}
    </div>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
  iconOnly,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
  iconOnly?: boolean;
}) {
  const active = isActive(item, pathname);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={iconOnly ? item.label : undefined}
      className={`admin-nav-item ${active ? "admin-nav-item-active" : ""} ${
        iconOnly ? "justify-center px-2" : ""
      }`}
    >
      <i className={`bi ${item.icon} admin-nav-icon`} />
      {!iconOnly && <span className="truncate">{item.label}</span>}
    </Link>
  );
}

function NavGroupSection({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  onNavigate?: () => void;
}) {
  const hasActive = group.items.some((item) => isActive(item, pathname));
  const [open, setOpen] = useState(
    hasActive || group.items.some((item) => item.href === "/admin")
  );

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
      >
        <span className="truncate text-left">{group.label}</span>
        <i className={`bi bi-chevron-down shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="ml-2 space-y-0.5 border-l border-white/10 pb-1 pl-2">
          {group.items.map((item) => (
            <li key={item.href}>
              <NavLink item={item} pathname={pathname} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function NavList({
  navGroups,
  collapsed,
  onNavigate,
}: {
  navGroups: NavGroup[];
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const grouped = Boolean(onNavigate) && !collapsed;

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 admin-scroll">
      {grouped ? (
        <ul className="space-y-1">
          {navGroups.map((group) => (
            <NavGroupSection
              key={group.label}
              group={group}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : (
        <ul className="space-y-1">
          {navGroups.flatMap((group) =>
            group.items.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  pathname={pathname}
                  onNavigate={onNavigate}
                  iconOnly={collapsed}
                />
              </li>
            ))
          )}
        </ul>
      )}
    </nav>
  );
}

function SidebarColumn({
  navGroups,
  name,
  email,
  collapsed,
  onNavigate,
}: {
  navGroups: NavGroup[];
  name: string;
  email: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[var(--admin-sidebar-bg)]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
        <Brand collapsed={collapsed} />
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}
      </div>
      <NavList navGroups={navGroups} collapsed={collapsed} onNavigate={onNavigate} />
      <div className="border-t border-white/5 p-2">
        {collapsed ? (
          <div className="flex justify-center py-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-sm font-semibold text-white ring-2 ring-white/10">
              {name.trim().charAt(0).toUpperCase() || "A"}
            </span>
          </div>
        ) : (
          <AccountMenu name={name} email={email} />
        )}
      </div>
    </div>
  );
}

function Breadcrumbs({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const current = nav.find(
    (item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
  );

  const parts: { label: string; href?: string }[] = [{ label: "Admin", href: "/admin" }];
  if (current && current.href !== "/admin") {
    parts.push({ label: current.label });
  }

  // Detect sub-pages (e.g., /admin/portfolio/new)
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 2) {
    const last = segments[segments.length - 1];
    if (last !== current?.href?.split("/").pop()) {
      const niceLabel = last
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      parts.push({ label: niceLabel });
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px]">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <i className="bi bi-chevron-right text-[10px] text-slate-400" />
          )}
          {p.href && i < parts.length - 1 ? (
            <Link
              href={p.href}
              className="font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {p.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {p.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

function NotificationsBell() {
  return (
    <Link
      href="/admin/messages"
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
      title="Messages"
    >
      <i className="bi bi-bell text-sm" />
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
        !
      </span>
    </Link>
  );
}

export function AdminShell({
  navGroups,
  name,
  email,
  children,
}: {
  navGroups: NavGroup[];
  name: string;
  email: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const flatNav = navGroups.flatMap((group) => group.items);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  // Persist collapse state
  useEffect(() => {
    const stored = localStorage.getItem("admin-sidebar-collapsed");
    if (stored === "1") setCollapsed(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const sidebarWidth = collapsed ? 76 : 256;

  return (
    <div className="flex min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden border-r border-white/5 lg:block transition-[width] duration-200"
        style={{ width: sidebarWidth }}
      >
        <SidebarColumn
          navGroups={navGroups}
          name={name}
          email={email}
          collapsed={collapsed}
        />
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
        >
          <i
            className={`bi bi-chevron-${collapsed ? "right" : "left"} text-[10px]`}
          />
        </button>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col border-r border-white/5 shadow-2xl">
            <SidebarColumn
              navGroups={navGroups}
              name={name}
              email={email}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div
        className="flex min-h-screen w-full flex-col transition-[margin] duration-200 lg:ml-0"
        style={{ marginLeft: 0 }}
      >
        <div className="lg:pl-[var(--sidebar-w)]" style={{ ["--sidebar-w" as string]: `${sidebarWidth}px` }}>
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-surface)]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <i className="bi bi-list text-lg" />
              </button>
              <Breadcrumbs nav={flatNav} />
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                title="View live site"
                className="hidden h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 sm:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
              >
                <i className="bi bi-box-arrow-up-right" />
                <span className="hidden md:inline">Live site</span>
              </Link>
              <NotificationsBell />
              <ThemeToggle />
              <div className="ml-1 hidden h-9 w-px bg-[var(--admin-border)] sm:block" />
              <div className="ml-1 hidden sm:block">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-sm font-semibold text-white ring-2 ring-indigo-500/20">
                  {name.trim().charAt(0).toUpperCase() || "A"}
                </span>
              </div>
            </div>
          </header>

          {/* Page body */}
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 admin-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
