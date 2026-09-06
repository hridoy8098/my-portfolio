"use client";

import { useActionState } from "react";
import { FormError, FormSuccess } from "@/components/admin/ui";

export type AdminState = { error?: string; success?: boolean } | undefined;

export function AdminForm({
  action,
  children,
  successMessage = "Saved successfully.",
}: {
  action: (state: AdminState, formData: FormData) => Promise<AdminState>;
  children: React.ReactNode;
  successMessage?: string;
}) {
  const [state, formAction] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-4">
      {children}
      <div className="space-y-2">
        <FormError message={state?.error} />
        {state?.success && (
          <FormSuccess message={successMessage} />
        )}
      </div>
    </form>
  );
}