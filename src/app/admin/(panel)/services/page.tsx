import { getServices } from "@/lib/supabase/queries";
import { saveServiceAction, deleteRowAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/admin/ui";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Services shown in the Services section. The service-details page is a single shared page edited under Site Settings."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <AdminCard key={service.id}>
            <div className="flex justify-end pb-2">
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="services" />
                <input type="hidden" name="_id" value={service.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                >
                  <i className="bi bi-trash" /> Delete
                </button>
              </AdminForm>
            </div>
            <AdminForm action={saveServiceAction} successMessage="Saved.">
              <input type="hidden" name="_id" defaultValue={service.id} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Title">
                  <TextInput name="title" defaultValue={service.title} />
                </Field>
                <Field label="Icon">
                  <TextInput name="icon" defaultValue={service.icon} placeholder="bi-code-square" />
                </Field>
              </div>
              <Field label="Description">
                <TextArea name="description" rows={2} defaultValue={service.description} />
              </Field>
              <Field label="Points (one per line)">
                <TextArea name="points" rows={3} defaultValue={service.points.join("\n")} />
              </Field>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked={service.is_published} />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </AdminCard>
        ))}

        <AdminCard title="Add new service">
          <AdminForm action={saveServiceAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title">
                <TextInput name="title" placeholder="Web Development" />
              </Field>
              <Field label="Icon">
                <TextInput name="icon" placeholder="bi-code-square" />
              </Field>
            </div>
            <Field label="Description">
              <TextArea name="description" rows={2} />
            </Field>
            <Field label="Points (one per line)">
              <TextArea name="points" rows={3} />
            </Field>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <input type="checkbox" name="is_published" defaultChecked />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </AdminCard>
      </div>
    </>
  );
}