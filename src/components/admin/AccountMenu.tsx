"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";

export function AccountMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const initial = name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-gray-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
          {initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-gray-900">
            {name}
          </span>
          <span className="block truncate text-[11px] text-gray-400">{email}</span>
        </span>
        <i
          className={`bi bi-chevron-${open ? "up" : "down"} text-[12px] text-gray-400`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-50 mb-2 w-full min-w-[220px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
            <p className="truncate text-[13px] font-semibold text-gray-900">{name}</p>
            <p className="truncate text-[11px] text-gray-400">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/admin/account"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <i className="bi bi-person-lock w-4 text-gray-400" />
              Account settings
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <i className="bi bi-arrow-up-right-square w-4 text-gray-400" />
              View site
            </a>
          </div>
          <div className="border-t border-gray-200" />
          <form action={logoutAction} className="py-1">
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-red-600 transition hover:bg-red-50"
            >
              <i className="bi bi-box-arrow-right w-4" />
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}