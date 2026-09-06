export interface Profile {
  name: string;
  role: string;
  typed_items: string[];
  subtitle: string;
  cv_url: string;
  email: string;
  phone: string;
  city: string;
  degree: string;
  availability: string;
  github_handle: string;
  github_url: string;
  linkedin_handle: string;
  linkedin_url: string;
  photo_url: string;
  hero_bg_url: string;
  about_headline: string;
  about_intro: string;
  about_body: string[];
  resume_summary: string;
  resume_bullets: string[];
  facts: Array<{ label: string; value: string }>;
}

export interface SocialLink {
  id: number;
  label: string;
  icon: string;
  url: string;
  position: number;
  is_published: boolean;
}

export interface NavItem {
  id: number;
  section_id: string;
  label: string;
  icon: string;
  position: number;
  is_published: boolean;
}

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  icon: string;
  position: number;
  is_published: boolean;
}

export interface SkillCategory {
  id: number;
  label: string;
  icon: string;
  skills: Skill[];
  position: number;
  is_published: boolean;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  points: string[];
  position: number;
  is_published: boolean;
}

export interface PortfolioCategory {
  id: number;
  value: string;
  label: string;
  position: number;
  is_published: boolean;
}

export interface ProjectSection {
  id: string;
  title: string;
  icon: string;
  items: string[];
}

export interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  categories: string[];
  description: string;
  image: string;
  screenshots: string[];
  technologies: string[];
  live_url: string;
  github_url: string;
  detail_category: string;
  detail_client: string;
  detail_date: string;
  detail_status: string;
  sections: ProjectSection[];
  is_featured: boolean;
  is_published: boolean;
  position: number;
  created_at: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  description: string;
  position: number;
  is_published: boolean;
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  period: string;
  responsibilities: string[];
  description: string;
  position: number;
  is_published: boolean;
}

export interface MessageRow {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
}

export interface ThemeSettings {
  accent: string;
  accent_dark: string;
  accent_soft: string;
  navy: string;
  navy_light: string;
  heading: string;
  body: string;
  light: string;
  navm: string;
  danger: string;
  success: string;
  hero_overlay_opacity: number;
  font_heading: string;
  font_body: string;
  font_nav: string;
  updated_at: string;
}

export interface MetaSettings {
  site_title: string;
  description: string;
  keywords: string[];
  og_title: string;
  og_description: string;
  og_image: string;
  canonical_url: string;
  lang: string;
  favicon_url: string;
  apple_icon_url: string;
}

export interface HeroSettings {
  hello_prefix: string;
  typed_prefix: string;
  primary_label: string;
  primary_link: string;
  cv_label: string;
  cv_soon_label: string;
  contact_label: string;
  contact_link: string;
}

export interface FooterSettings {
  copyright_text: string;
  show_credit: boolean;
  credit_html: string;
}

export interface SectionSubtitles {
  about: string;
  skills: string;
  resume: string;
  portfolio: string;
  services: string;
  contact: string;
}

export interface ResumeLabels {
  summary_heading: string;
  education_heading: string;
  experience_heading: string;
}

export interface ServiceDetailsSettings {
  page_title: string;
  heading: string;
  image_url: string;
  highlight_heading: string;
  highlight_body: string;
  paragraph: string;
  paragraph_2: string;
  checklist: string[];
  sidebar_heading: string;
}

export interface ContactSettings {
  name_label: string;
  email_label: string;
  subject_label: string;
  message_label: string;
  submit_label: string;
  sending_label: string;
  success_message: string;
  error_message: string;
  fieldErrorRequired: Record<string, string>;
  name_placeholder: string;
  email_placeholder: string;
  subject_placeholder: string;
  message_placeholder: string;
}

export interface SiteSettings {
  meta: MetaSettings;
  hero: HeroSettings;
  footer: FooterSettings;
  section_subtitles: SectionSubtitles;
  resume_labels: ResumeLabels;
  service_details: ServiceDetailsSettings;
  contact: ContactSettings;
}

export interface SiteData {
  profile: Profile;
  nav: NavItem[];
  socials: SocialLink[];
}