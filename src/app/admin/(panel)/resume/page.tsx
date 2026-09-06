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
    <AdminCard title={<div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20"><i className="bi bi-mortarboard-fill text-[13px]" /></span><h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Education</h2></div>}>
      <div className="space-y-4">
        {items.map((e) => (
          <div key={e.id} className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] font-medium text-[var(--admin-text-soft)]"><i className="bi bi-mortarboard" />{e.degree || 'Untitled'}</span>
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="education" />
                <input type="hidden" name="_id" value={e.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                >
                  <i className="bi bi-trash text-[11px]" /> Delete
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
                <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                  <input type="checkbox" name="is_published" defaultChecked={e.is_published} className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </div>
        ))}

        <div className="rounded-xl border border-dashed border-[var(--admin-border)] p-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-text-soft)]">
            <i className="bi bi-plus-circle" />
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
              <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
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
    <AdminCard title={<div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20"><i className="bi bi-briefcase-fill text-[13px]" /></span><h2 className="text-[15px] font-semibold text-[var(--admin-text)]">Experience</h2></div>}>
      <div className="space-y-4">
        {items.map((x) => (
          <div key={x.id} className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[12px] font-medium text-[var(--admin-text-soft)]"><i className="bi bi-briefcase" />{x.role || 'Untitled'} · {x.organization || '—'}</span>
              <AdminForm action={deleteRowAction} successMessage="Deleted.">
                <input type="hidden" name="_table" value="experience" />
                <input type="hidden" name="_id" value={x.id} />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-medium text-rose-600 transition hover:bg-rose-500/10 dark:text-rose-400"
                >
                  <i className="bi bi-trash text-[11px]" /> Delete
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Field label="Period">
                  <TextInput name="period" defaultValue={x.period} />
                </Field>
                <div className="md:col-span-2">
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
                <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                  <input type="checkbox" name="is_published" defaultChecked={x.is_published} className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
                  Published
                </label>
                <SubmitButton>Save</SubmitButton>
              </div>
            </AdminForm>
          </div>
        ))}

        <div className="rounded-xl border border-dashed border-[var(--admin-border)] p-4">
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--admin-text-soft)]">
            <i className="bi bi-plus-circle" />
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
              <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
                <input type="checkbox" name="is_published" defaultChecked className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]" />
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