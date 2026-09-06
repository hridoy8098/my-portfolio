import { getEducation, getExperience } from "@/lib/supabase/queries";
import { saveEducationAction, saveExperienceAction, deleteRowAction } from "@/lib/actions/collections";
import type { Education, Experience } from "@/types/site";
import { AdminForm } from "@/components/admin/AdminForm";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/admin/ui";

function EducationSection({ items }: { items: Education[] }) {
  return (
    <AdminCard title="Education">
      <div className="space-y-5">
        {items.map((e) => (
          <div key={e.id} className="rounded-md border border-gray-200 p-4">
            <div className="flex justify-end">
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="education" />
                <input type="hidden" name="_id" value={e.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                >
                  <i className="bi bi-trash" /> Delete
                </button>
              </AdminForm>
            </div>
            <AdminForm action={saveEducationAction} successMessage="Saved.">
              <input type="hidden" name="_id" defaultValue={e.id} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Degree">
                  <TextInput name="degree" defaultValue={e.degree} />
                </Field>
                <Field label="Institution">
                  <TextInput name="institution" defaultValue={e.institution} />
                </Field>
              </div>
              <Field label="Description">
                <TextArea name="description" rows={3} defaultValue={e.description} />
              </Field>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked={e.is_published} />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </div>
        ))}

        <div className="rounded-md border border-dashed border-gray-300 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Add education
          </p>
          <AdminForm action={saveEducationAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Degree">
                <TextInput name="degree" placeholder="BSc in CSE" />
              </Field>
              <Field label="Institution">
                <TextInput name="institution" placeholder="University" />
              </Field>
            </div>
            <Field label="Description">
              <TextArea name="description" rows={3} />
            </Field>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <input type="checkbox" name="is_published" defaultChecked />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </div>
      </div>
    </AdminCard>
  );
}

function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <AdminCard title="Experience">
      <div className="space-y-5">
        {items.map((x) => (
          <div key={x.id} className="rounded-md border border-gray-200 p-4">
            <div className="flex justify-end">
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="experience" />
                <input type="hidden" name="_id" value={x.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded text-xs font-medium text-red-600 transition hover:text-red-700"
                >
                  <i className="bi bi-trash" /> Delete
                </button>
              </AdminForm>
            </div>
            <AdminForm action={saveExperienceAction} successMessage="Saved.">
              <input type="hidden" name="_id" defaultValue={x.id} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Role">
                  <TextInput name="role" defaultValue={x.role} />
                </Field>
                <Field label="Organization">
                  <TextInput name="organization" defaultValue={x.organization} />
                </Field>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Period">
                  <TextInput name="period" defaultValue={x.period} />
                </Field>
                <div className="col-span-2">
                  <Field label="Description">
                    <TextArea name="description" rows={2} defaultValue={x.description} />
                  </Field>
                </div>
              </div>
              <Field label="Responsibilities (one per line)">
                <TextArea
                  name="responsibilities"
                  rows={3}
                  defaultValue={x.responsibilities.join("\n")}
                />
              </Field>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked={x.is_published} />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </div>
        ))}

        <div className="rounded-md border border-dashed border-gray-300 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Add experience
          </p>
          <AdminForm action={saveExperienceAction} successMessage="Added.">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Role">
                <TextInput name="role" placeholder="Software Engineer" />
              </Field>
              <Field label="Organization">
                <TextInput name="organization" placeholder="Company" />
              </Field>
            </div>
            <Field label="Period">
              <TextInput name="period" placeholder="2022 — Present" />
            </Field>
            <Field label="Description">
              <TextArea name="description" rows={2} />
            </Field>
            <Field label="Responsibilities (one per line)">
              <TextArea name="responsibilities" rows={3} />
            </Field>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                <input type="checkbox" name="is_published" defaultChecked />
                Published
              </label>
              <SubmitButton>Add</SubmitButton>
            </div>
          </AdminForm>
        </div>
      </div>
    </AdminCard>
  );
}

export default async function ResumePage() {
  const [education, experience] = await Promise.all([
    getEducation(),
    getExperience(),
  ]);

  return (
    <>
      <AdminPageHeader
        title="Resume"
        description="Education and work experience shown in the Resume section."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <EducationSection items={education} />
        <ExperienceSection items={experience} />
      </div>
    </>
  );
}