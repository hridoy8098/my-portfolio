import { getSessionUser } from "@/lib/auth";
import { updateAdminEmailAction, updateAdminPasswordAction } from "@/lib/actions/account";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminPageHeader, AdminCard, Field, TextInput, SubmitButton } from "@/components/admin/ui";

export default async function AccountPage() {
  const user = await getSessionUser();

  return (
    <>
      <AdminPageHeader
        title="Account"
        description="Manage the admin sign-in credentials used on /admin/login."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard
          title={
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20">
                <i className="bi bi-envelope-fill text-[13px]" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Sign-in email</h2>
                <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">Used to log in to the admin panel.</p>
              </div>
            </div>
          }
        >
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-[12px] font-semibold text-white">
              {(user?.email ?? "A").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--admin-text-soft)]">Current email</p>
              <p className="truncate text-[13px] font-semibold text-[var(--admin-text)]">{user?.email ?? "—"}</p>
            </div>
          </div>
          <AdminForm action={updateAdminEmailAction} successMessage="Email updated.">
            <Field label="New email">
              <TextInput
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
              />
            </Field>
            <SubmitButton>Update email</SubmitButton>
          </AdminForm>
          <p className="mt-3 flex items-start gap-1.5 text-[12px] text-[var(--admin-text-soft)]">
            <i className="bi bi-info-circle mt-0.5" />
            <span>The change takes effect immediately. Use the new email on the next sign-in.</span>
          </p>
        </AdminCard>

        <AdminCard
          title={
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20">
                <i className="bi bi-shield-lock-fill text-[13px]" />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Password</h2>
                <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">Set a new password for the admin account.</p>
              </div>
            </div>
          }
        >
          <AdminForm action={updateAdminPasswordAction} successMessage="Password updated.">
            <Field label="New password" hint="At least 8 characters.">
              <TextInput
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </Field>
            <Field label="Confirm new password">
              <TextInput
                name="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </Field>
            <SubmitButton>Update password</SubmitButton>
          </AdminForm>
          <p className="mt-3 flex items-start gap-1.5 text-[12px] text-[var(--admin-text-soft)]">
            <i className="bi bi-info-circle mt-0.5" />
            <span>You may need to sign in again with the new password after your current session expires.</span>
          </p>
        </AdminCard>
      </div>
    </>
  );
}