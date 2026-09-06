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
          title="Sign-in email"
          description="Used to log in to the admin panel."
        >
          <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
            Current email:{" "}
            <strong className="font-semibold text-gray-900">
              {user?.email ?? "—"}
            </strong>
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
          <p className="mt-3 text-xs text-gray-400">
            The change takes effect immediately. Use the new email on the next
            sign-in.
          </p>
        </AdminCard>

        <AdminCard
          title="Password"
          description="Set a new password for the admin account."
        >
          <AdminForm action={updateAdminPasswordAction} successMessage="Password updated.">
            <Field label="New password" hint="At least 8 characters.">
              <TextInput
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </Field>
            <Field label="Confirm new password">
              <TextInput
                name="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </Field>
            <SubmitButton>Update password</SubmitButton>
          </AdminForm>
          <p className="mt-3 text-xs text-gray-400">
            You may need to sign in again with the new password after your
            current session expires.
          </p>
        </AdminCard>
      </div>
    </>
  );
}