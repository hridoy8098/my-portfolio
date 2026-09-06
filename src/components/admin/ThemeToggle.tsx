"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "admin-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("admin-dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("admin-dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white">
        <i className="bi bi-circle-half text-slate-400" />
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
    >
      <i className={`bi ${dark ? "bi-sun-fill" : "bi-moon-stars-fill"} text-sm`} />
    </button>
  );
}
