import { getProfile, getSocialLinks } from "@/lib/supabase/queries";
import { saveProfileAction } from "@/lib/actions/settings";
import { saveSocialLinkAction } from "@/lib/actions/collections";
import { AdminForm } from "@/components/admin/AdminForm";
import { MediaPicker } from "@/components/admin/MediaPicker";
import {
  AdminPageHeader,
  AdminCard,
  Field,
  TextInput,
  TextArea,
  SubmitButton,
} from "@/components/admin/ui";

export default async function ProfilePage() {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()]);
  const lines = (arr: string[] | undefined) => arr?.join("\n") ?? "";
  const facts = (profile.facts ?? [])
    .map((f) => `${f.label}::${f.value}`)
    .join("\n");

  return (
    <>
      <AdminPageHeader
        title="Profile"
        description="Basic info, hero, about and social links."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard title="Basic info">
          <AdminForm action={saveProfileAction}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name">
                <TextInput name="name" defaultValue={profile.name} />
              </Field>
              <Field label="Role">
                <TextInput name="role" defaultValue={profile.role} />
              </Field>
            </div>
            <Field label="Typed items (one per line)">
              <TextArea name="typed_items" rows={2} defaultValue={lines(profile.typed_items)} />
            </Field>
            <Field label="Hero subtitle">
              <TextArea name="subtitle" rows={2} defaultValue={profile.subtitle} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email">
                <TextInput name="email" defaultValue={profile.email} />
              </Field>
              <Field label="Phone">
                <TextInput name="phone" defaultValue={profile.phone} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City">
                <TextInput name="city" defaultValue={profile.city} />
              </Field>
              <Field label="Degree">
                <TextInput name="degree" defaultValue={profile.degree} />
              </Field>
            </div>
            <Field label="Availability">
              <TextInput name="availability" defaultValue={profile.availability} />
            </Field>
            <SubmitButton>Save basic info</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard title="Social & links">
          <AdminForm action={saveProfileAction}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="GitHub handle">
                <TextInput name="github_handle" defaultValue={profile.github_handle} />
              </Field>
              <Field label="GitHub URL">
                <TextInput name="github_url" defaultValue={profile.github_url} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="LinkedIn handle">
                <TextInput name="linkedin_handle" defaultValue={profile.linkedin_handle} />
              </Field>
              <Field label="LinkedIn URL">
                <TextInput name="linkedin_url" defaultValue={profile.linkedin_url} />
              </Field>
            </div>
            <Field label="Photo URL">
              <MediaPicker name="photo_url" value={profile.photo_url} />
            </Field>
            <Field label="Hero background URL">
              <MediaPicker name="hero_bg_url" value={profile.hero_bg_url} folders={["hero", "media"]} />
            </Field>
            <Field label="CV file URL" hint="Link to your PDF/resume file.">
              <TextInput name="cv_url" defaultValue={profile.cv_url} placeholder="https://…" />
            </Field>
            <SubmitButton>Save links</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard title="About" description="Content shown in the About section.">
          <AdminForm action={saveProfileAction}>
            <Field label="About headline">
              <TextInput name="about_headline" defaultValue={profile.about_headline} />
            </Field>
            <Field label="About intro">
              <TextArea name="about_intro" rows={2} defaultValue={profile.about_intro} />
            </Field>
            <Field label="About body (one paragraph per line)">
              <TextArea name="about_body" rows={4} defaultValue={lines(profile.about_body)} />
            </Field>
            <Field label="Facts (each line: Label::value)">
              <TextArea name="facts" rows={4} defaultValue={facts} />
            </Field>
            <SubmitButton>Save about</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard title="Resume summary">
          <AdminForm action={saveProfileAction}>
            <Field label="Summary">
              <TextArea name="resume_summary" rows={4} defaultValue={profile.resume_summary} />
            </Field>
            <Field label="Summary bullets (one per line)">
              <TextArea name="resume_bullets" rows={3} defaultValue={lines(profile.resume_bullets)} />
            </Field>
            <SubmitButton>Save summary</SubmitButton>
          </AdminForm>
        </AdminCard>
      </div>

      <div className="mt-6">
        <AdminCard
          title="Social links"
          description="Shown in the sidebar, nav and contact section."
        >
          <div className="space-y-6">
            {socials.map((s) => (
              <AdminForm key={s.id} action={saveSocialLinkAction} successMessage="Saved.">
                <input type="hidden" name="_id" defaultValue={s.id} />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                  <Field label="Label">
                    <TextInput name="label" defaultValue={s.label} />
                  </Field>
                  <Field label="Bootstrap icon class">
                    <TextInput name="icon" defaultValue={s.icon} placeholder="bi-github" />
                  </Field>
                </div>
                <Field label="URL">
                  <TextInput name="url" defaultValue={s.url} />
                </Field>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                    <input type="checkbox" name="is_published" defaultChecked={s.is_published} />
                    Published
                  </label>
                  <div className="flex gap-2">
                    <SubmitButton>Save</SubmitButton>
                  </div>
                </div>
              </AdminForm>
            ))}

            <AdminForm action={saveSocialLinkAction} successMessage="Added.">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Add new social link
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Label">
                  <TextInput name="label" placeholder="GitHub" />
                </Field>
                <Field label="Bootstrap icon class">
                  <TextInput name="icon" placeholder="bi-github" />
                </Field>
              </div>
              <Field label="URL">
                <TextInput name="url" placeholder="https://…" />
              </Field>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-700">
                  <input type="checkbox" name="is_published" defaultChecked />
                  Published
                </label>
                <SubmitButton>Add</SubmitButton>
              </div>
            </AdminForm>
          </div>
        </AdminCard>
      </div>
    </>
  );
}