"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "@/components/admin/AccountMenu";

type NavItem = { href: string; label: string; icon: string };

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm text-white">
        <i className="bi bi-code-slash" />
      </span>
      <div>
        <p className="text-sm font-bold leading-tight">Portfolio</p>
        <p className="text-[11px] leading-tight text-gray-400">Admin Panel</p>
      </div>
    </div>
  );
}

function NavList({
  nav,
  onNavigate,
}: {
  nav: NavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition ${
                  active
                    ? "bg-accent/10 text-accent-dark"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <i
                  className={`bi ${item.icon} w-5 ${
                    active ? "text-accent" : "text-gray-400"
                  }`}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SidebarColumn({
  nav,
  name,
  email,
  onNavigate,
}: {
  nav: NavItem[];
  name: string;
  email: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <Brand />
        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}
      </div>
      <NavList nav={nav} onNavigate={onNavigate} />
      <div className="border-t border-gray-200 p-2">
        <AccountMenu name={name} email={email} />
      </div>
    </div>
  );
}

export function AdminShell({
  nav,
  name,
  email,
  children,
}: {
  nav: NavItem[];
  name: string;
  email: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  const current = nav.find(
    (item) =>
      (item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href))
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] border-r border-gray-200 bg-white lg:block">
        <SidebarColumn nav={nav} name={name} email={email} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] max-w-[85vw] flex-col border-r border-gray-200 bg-white shadow-xl">
            <SidebarColumn
              nav={nav}
              name={name}
              email={email}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen w-full flex-col lg:ml-[240px]">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100"
            >
              <i className="bi bi-list text-xl" />
            </button>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm text-white">
              <i className="bi bi-code-slash" />
            </span>
            <span className="truncate text-sm font-bold text-gray-900">
              {current ? current.label : "Admin Panel"}
            </span>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            title="View site"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <i className="bi bi-box-arrow-up-right text-lg" />
          </Link>
        </header>

        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}