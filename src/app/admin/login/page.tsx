"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { FormError } from "@/components/admin/ui";
import Link from "next/link";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
          {/* Brand */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-2xl text-white shadow-lg shadow-indigo-900/50 ring-1 ring-white/10">
              <i className="bi bi-shield-lock" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to manage your portfolio.
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-slate-300"
              >
                Email address
              </label>
              <div className="relative">
                <i className="bi bi-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[13px] font-medium text-slate-300"
              >
                Password
              </label>
              <div className="relative">
                <i className="bi bi-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <FormError message={state?.error} />

            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:from-indigo-400 hover:to-indigo-600 hover:shadow-indigo-900/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {pending ? "Signing in…" : "Sign in"}
              {!pending && <i className="bi bi-arrow-right" />}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <Link
            href="/"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <i className="bi bi-arrow-left" />
            Back to website
          </Link>

          <p className="mt-6 text-center text-xs text-slate-500">
            <i className="bi bi-info-circle mr-1" />
            Create the admin user in Supabase and sign in with those credentials.
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-slate-600">
          &copy; {new Date().getFullYear()} Hridoy Hussain · All rights reserved
        </p>
      </div>
    </div>
  );
}
