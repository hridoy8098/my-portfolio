# Hridoy Hussain — Portfolio

A fully dynamic, single-page portfolio site with a complete admin dashboard. Every piece of content — profile, skills, services, projects, resume, theme colors, fonts, and site settings — is stored in **Supabase** and editable from `/admin` without touching a single line of code.

> Public site is server-rendered with ISR (`revalidate = 3600`) and never exposes write keys.

---

## ✨ Features

**Public site** (`/`)
- Hero with typed.js animation, profile photo & background image from Supabase Storage
- About, Skills (icon tiles, auto-detected from skill names), Resume, Portfolio (filterable + case-study pages), Services, Contact form
- Services / Projects detail pages
- Smart, responsive sidebar navigation (desktop) + hamburger drawer (mobile)
- Lightweight reveal-on-scroll (AOS-style, custom hook)
- Preloader, scroll-to-top, theme presets (multiple font combinations)

**Admin panel** (`/admin`)
- Auth-gated dashboard (`/admin/login`)
- Full CRUD for every content type:
  - Profile (basic info, hero, about, resume summary, social links)
  - Skills & skill groups
  - Services
  - Portfolio projects & categories
  - Resume (education & experience)
  - Nav items
  - Messages (from the contact form)
  - Media library
- Site settings (SEO/meta, hero buttons, section subtitles, footer, contact labels)
- Theme editor (accent color, fonts, layout)
- **Media library picker** — browse already-uploaded images or upload a new one directly from any image field (no copy-paste of URLs)

**Database** — Supabase (Postgres) + Supabase Storage for public images.

---

## 🧰 Tech Stack

- **Next.js 16** (App Router) — React 19, TypeScript
- **Tailwind CSS v4**
- **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`)
- **Bootstrap Icons**
- **Swiper** (portfolio galleries), **typed.js** (hero typing effect)
- **Resend** (optional contact-form email)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- A Supabase project (free tier is fine)

### 2. Install & run

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open http://localhost:3000 — the site works even without env vars by falling back to bundled demo content.

### 3. Environment variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-only
ADMIN_EMAIL=your-admin-email                      # used by db:seed
ADMIN_PASSWORD=your-admin-password                # used by db:seed
```

> ⚠️ Never commit `.env.local`. Service-role key must only be used server-side.

### 4. Set up the database

Run `supabase/schema.sql` (and the migrations in `supabase/migrations/`) in the Supabase SQL Editor, then seed demo content + the admin user:

```bash
npm run db:seed
```

To push the bundled `public/` images into Supabase Storage and rewrite local image URLs to storage URLs:

```bash
npm run db:upload
```

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages (/, projects/[slug], service-details, …)
│   ├── admin/           # Admin panel (panel pages + login)
│   └── api/             # /api/contact, /api/media/upload, /api/media/list
├── components/
│   ├── admin/           # AdminForm, MediaPicker, MediaManager, UI primitives…
│   ├── layout/          # Sidebar, MobileHeader, Footer, Preloader, ScrollTop…
│   ├── sections/        # Hero, About, Skills, Resume, Portfolio, Services, Contact
│   └── ui/              # SectionTitle, Reveal, PageHeader…
├── lib/
│   ├── supabase/        # queries, admin/public/ssr clients, demo fallback data
│   ├── actions/         # Server actions (auth, collections, settings, account)
│   ├── skillIcons.ts    # Auto-detect a bootstrap icon from a skill name
│   └── fonts.ts / theme-css.ts
└── proxy.ts             # Guards /admin
```

---

## 📦 Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Start dev server                              |
| `npm run build`      | Production build                              |
| `npm run start`      | Start production server                       |
| `npm run lint`       | Run ESLint                                    |
| `npm run db:seed`    | Upsert demo content + admin user into Supabase|
| `npm run db:upload`  | Upload `/public` images to Supabase Storage   |

---

## 🔐 Security Notes

- Service-role key is only used in server-side Admin helpers / actions.
- RLS is enabled; the public site only reads with the anon (public) client.
- Admin routes are protected by a session proxy (`src/proxy.ts`).

---

## ☁️ Deployment

1. Push to GitHub, then import into **Vercel** (or Netlify).
2. Set the env vars above in the platform's environment settings.
3. Build command: `npm run build` • Output: default (Next.js).

---

## 📄 License

ISC