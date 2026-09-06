import { getSettings } from "@/lib/supabase/queries";
import {
  saveMetaSettings,
  saveHeroSettings,
  saveFooterSettings,
  saveSectionSubtitles,
  saveResumeLabels,
  saveServiceDetailsSettings,
  saveContactSettings,
} from "@/lib/actions/settings";
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

function SectionIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    meta: "bi-search",
    hero: "bi-house-door-fill",
    subtitles: "bi-textarea-t",
    footer: "bi-layout-text-window-reverse",
    resume: "bi-file-earmark-text-fill",
    service: "bi-briefcase-fill",
    contact: "bi-envelope-fill",
  };
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-500/20">
      <i className={`bi ${icons[name] ?? "bi-gear"}`} />
    </span>
  );
}

function CardHeader({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <SectionIcon name={icon} />
      <div>
        <h2 className="text-[15px] font-semibold text-[var(--admin-text)]">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-[13px] text-[var(--admin-text-muted)]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default async function SettingsPage() {
  const s = await getSettings();
  const lines = (arr: string[] | undefined) => arr?.join("\n") ?? "";

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Global text content and labels. Array fields (keywords, checklist, etc.) accept one item per line."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard
          title={<CardHeader icon="meta" title="Meta" description="SEO and browser tab settings." />}
        >
          <AdminForm action={saveMetaSettings}>
            <Field label="Site title" htmlFor="site_title">
              <TextInput id="site_title" name="site_title" defaultValue={s.meta.site_title} />
            </Field>
            <Field label="Description">
              <TextArea name="description" rows={2} defaultValue={s.meta.description} />
            </Field>
            <Field label="Keywords (one per line)">
              <TextArea name="keywords" rows={3} defaultValue={lines(s.meta.keywords)} />
            </Field>
            <Field label="OG title">
              <TextInput name="og_title" defaultValue={s.meta.og_title} />
            </Field>
            <Field label="OG description">
              <TextArea name="og_description" rows={2} defaultValue={s.meta.og_description} />
            </Field>
            <Field label="OG image URL">
              <MediaPicker name="og_image" value={s.meta.og_image} folders={["og", "media"]} />
            </Field>
            <Field label="Canonical URL">
              <TextInput name="canonical_url" defaultValue={s.meta.canonical_url} placeholder="https://…" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Language">
                <TextInput name="lang" defaultValue={s.meta.lang} />
              </Field>
              <Field label="Favicon URL">
                <MediaPicker name="favicon_url" value={s.meta.favicon_url} />
              </Field>
            </div>
            <Field label="Apple icon URL">
              <MediaPicker name="apple_icon_url" value={s.meta.apple_icon_url} />
            </Field>
            <SubmitButton>Save meta</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard
          title={<CardHeader icon="hero" title="Hero" description="Hero section button labels and links." />}
        >
          <AdminForm action={saveHeroSettings}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hello prefix">
                <TextInput name="hello_prefix" defaultValue={s.hero.hello_prefix} />
              </Field>
              <Field label="Typed prefix">
                <TextInput name="typed_prefix" defaultValue={s.hero.typed_prefix} />
              </Field>
            </div>
            <Field label="Primary button label">
              <TextInput name="primary_label" defaultValue={s.hero.primary_label} />
            </Field>
            <Field label="Primary button link">
              <TextInput name="primary_link" defaultValue={s.hero.primary_link} placeholder="https://… or #about" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="CV button label">
                <TextInput name="cv_label" defaultValue={s.hero.cv_label} />
              </Field>
              <Field label="CV coming-soon text">
                <TextInput name="cv_soon_label" defaultValue={s.hero.cv_soon_label} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Contact button label">
                <TextInput name="contact_label" defaultValue={s.hero.contact_label} />
              </Field>
              <Field label="Contact button target">
                <TextInput name="contact_link" defaultValue={s.hero.contact_link} placeholder="#contact" />
              </Field>
            </div>
            <SubmitButton>Save hero</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard
          title={
            <CardHeader
              icon="subtitles"
              title="Section subtitles"
              description="One-line subtitle under each section title."
            />
          }
        >
          <AdminForm action={saveSectionSubtitles}>
            {(["about", "skills", "resume", "portfolio", "services", "contact"] as const).map(
              (k) => (
                <Field key={k} label={`${k[0].toUpperCase()}${k.slice(1)}`}>
                  <TextArea
                    name={k}
                    rows={2}
                    defaultValue={s.section_subtitles[k] ?? ""}
                  />
                </Field>
              )
            )}
            <SubmitButton>Save subtitles</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard title={<CardHeader icon="footer" title="Footer" />}>
          <AdminForm action={saveFooterSettings}>
            <Field label="Copyright text">
              <TextInput name="copyright_text" defaultValue={s.footer.copyright_text} />
            </Field>
            <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--admin-text)]">
              <input
                type="checkbox"
                name="show_credit"
                defaultChecked={s.footer.show_credit}
                className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-accent)] focus:ring-[var(--admin-accent)]"
              />
              Show credit line
            </label>
            <Field label="Credit HTML (if shown)">
              <TextArea name="credit_html" rows={2} defaultValue={s.footer.credit_html} />
            </Field>
            <SubmitButton>Save footer</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard title={<CardHeader icon="resume" title="Resume labels" />}>
          <AdminForm action={saveResumeLabels}>
            <Field label="Summary heading">
              <TextInput name="summary_heading" defaultValue={s.resume_labels.summary_heading} />
            </Field>
            <Field label="Education heading">
              <TextInput name="education_heading" defaultValue={s.resume_labels.education_heading} />
            </Field>
            <Field label="Experience heading">
              <TextInput name="experience_heading" defaultValue={s.resume_labels.experience_heading} />
            </Field>
            <SubmitButton>Save labels</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard
          title={
            <CardHeader
              icon="service"
              title="Service details page"
              description="Content for the single service-details page (no per-service pages)."
            />
          }
        >
          <AdminForm action={saveServiceDetailsSettings}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Page title">
                <TextInput name="page_title" defaultValue={s.service_details.page_title} />
              </Field>
              <Field label="Sidebar heading">
                <TextInput name="sidebar_heading" defaultValue={s.service_details.sidebar_heading} />
              </Field>
            </div>
            <Field label="Heading">
              <TextInput name="heading" defaultValue={s.service_details.heading} />
            </Field>
            <Field label="Image URL">
              <MediaPicker
                name="image_url"
                value={s.service_details.image_url}
                folders={["services", "media"]}
              />
            </Field>
            <Field label="Highlight heading">
              <TextInput name="highlight_heading" defaultValue={s.service_details.highlight_heading} />
            </Field>
            <Field label="Highlight body">
              <TextArea name="highlight_body" rows={3} defaultValue={s.service_details.highlight_body} />
            </Field>
            <Field label="Paragraph">
              <TextArea name="paragraph" rows={3} defaultValue={s.service_details.paragraph} />
            </Field>
            <Field label="Paragraph 2">
              <TextArea name="paragraph_2" rows={3} defaultValue={s.service_details.paragraph_2} />
            </Field>
            <Field label="Checklist (one per line)">
              <TextArea name="checklist" rows={4} defaultValue={lines(s.service_details.checklist)} />
            </Field>
            <SubmitButton>Save service details</SubmitButton>
          </AdminForm>
        </AdminCard>

        <AdminCard
          title={
            <CardHeader
              icon="contact"
              title="Contact form"
              description="Labels, placeholders and validation messages."
            />
          }
        >
          <AdminForm action={saveContactSettings}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name label">
                <TextInput name="name_label" defaultValue={s.contact.name_label} />
              </Field>
              <Field label="Name placeholder">
                <TextInput name="name_placeholder" defaultValue={s.contact.name_placeholder} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Email label">
                <TextInput name="email_label" defaultValue={s.contact.email_label} />
              </Field>
              <Field label="Email placeholder">
                <TextInput name="email_placeholder" defaultValue={s.contact.email_placeholder} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Subject label">
                <TextInput name="subject_label" defaultValue={s.contact.subject_label} />
              </Field>
              <Field label="Subject placeholder">
                <TextInput name="subject_placeholder" defaultValue={s.contact.subject_placeholder} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Message label">
                <TextInput name="message_label" defaultValue={s.contact.message_label} />
              </Field>
              <Field label="Message placeholder">
                <TextInput name="message_placeholder" defaultValue={s.contact.message_placeholder} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Submit label">
                <TextInput name="submit_label" defaultValue={s.contact.submit_label} />
              </Field>
              <Field label="Sending label">
                <TextInput name="sending_label" defaultValue={s.contact.sending_label} />
              </Field>
            </div>
            <Field label="Success message">
              <TextArea name="success_message" rows={2} defaultValue={s.contact.success_message} />
            </Field>
            <Field label="Error message">
              <TextArea name="error_message" rows={2} defaultValue={s.contact.error_message} />
            </Field>
            <AdminCard title={<CardHeader icon="contact" title="Per-field required errors" />}>
              <div className="grid grid-cols-1 gap-4">
                {(["name", "email", "subject", "message"] as const).map((k) => (
                  <Field key={k} label={`${k} required error`}>
                    <TextInput
                      name={`fieldError_${k}`}
                      defaultValue={s.contact.fieldErrorRequired[k] ?? ""}
                    />
                  </Field>
                ))}
              </div>
            </AdminCard>
            <SubmitButton>Save contact</SubmitButton>
          </AdminForm>
        </AdminCard>
      </div>
    </>
  );
}
