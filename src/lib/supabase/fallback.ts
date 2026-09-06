import type {
  SiteSettings,
  ThemeSettings,
  Profile,
  NavItem,
  SocialLink,
  SkillCategory,
  Skill,
  Service,
  PortfolioCategory,
  PortfolioItem,
  Education,
  Experience,
} from "@/types/site";

export const fallbackProfile: Profile = {
  name: "Hridoy Hussain",
  role: "Full-Stack Developer & AI/ML Engineer",
  typed_items: ["Full-Stack Developer", "AI/ML Engineer", "Freelance Developer"],
  subtitle:
    "I build reliable full-stack web applications with Laravel, Vue.js and Next.js, and integrate modern AI/ML features that work in production — from REST APIs and admin dashboards to computer vision and AI automation.",
  cv_url: "",
  email: "your.email@example.com",
  phone: "",
  city: "Dhaka, Bangladesh",
  degree: "B.Sc. in CSE, ULAB",
  availability: "Available",
  github_handle: "github.com/hridoy8098",
  github_url: "https://github.com/hridoy8098",
  linkedin_handle: "linkedin.com/in/hridoy-hussain-1610a5331",
  linkedin_url: "https://linkedin.com/in/hridoy-hussain-1610a5331",
  photo_url: "/my-profile-img.jpg",
  hero_bg_url: "/hero-bg.jpg",
  about_headline: "Full-Stack Developer & AI/ML Engineer",
  about_intro:
    "I build complete products end-to-end — Laravel/FastAPI backends, Vue.js/Next.js frontends, and AI/ML features designed to work reliably in production.",
  about_body: [
    "I completed my B.Sc. in Computer Science & Engineering at the University of Liberal Arts Bangladesh (ULAB), building a strong foundation in algorithms, databases, software engineering and machine learning.",
    "Since graduating, I've worked as a full-stack and AI/ML developer across independent and freelance projects — Laravel and Vue.js web platforms, FastAPI backends, Next.js applications, REST APIs, admin dashboards and AI/ML integrations such as AI assistants, computer vision pipelines and ML-powered tools. My focus is on shipping clean, maintainable products where the AI features add real value, not just a demo.",
  ],
  resume_summary:
    "Full-Stack Developer & AI/ML Engineer — building complete products for independent and freelance clients, from Laravel and FastAPI backends to Vue.js and Next.js frontends, with production-focused AI features.",
  resume_bullets: ["Dhaka, Bangladesh", "github.com/hridoy8098", "B.Sc. in CSE, ULAB"],
  facts: [
    { label: "Degree", value: "B.Sc. in CSE, ULAB" },
    { label: "Focus", value: "Full-Stack + AI/ML" },
    { label: "City", value: "Dhaka, Bangladesh" },
    { label: "GitHub", value: "github.com/hridoy8098" },
    { label: "LinkedIn", value: "hridoy-hussain" },
    { label: "Freelance", value: "Available" },
  ],
};

export const fallbackNav: NavItem[] = [
  { id: 1, section_id: "hero", label: "Home", icon: "bi-house", position: 1, is_published: true },
  { id: 2, section_id: "about", label: "About", icon: "bi-person", position: 2, is_published: true },
  { id: 3, section_id: "skills", label: "Skills", icon: "bi-lightbulb", position: 3, is_published: true },
  { id: 4, section_id: "resume", label: "Resume", icon: "bi-file-earmark-text", position: 4, is_published: true },
  { id: 5, section_id: "portfolio", label: "Portfolio", icon: "bi-images", position: 5, is_published: true },
  { id: 6, section_id: "services", label: "Services", icon: "bi-hdd-stack", position: 6, is_published: true },
  { id: 7, section_id: "contact", label: "Contact", icon: "bi-envelope", position: 7, is_published: true },
];

export const fallbackSocials: SocialLink[] = [
  { id: 1, label: "GitHub", icon: "bi-github", url: "https://github.com/hridoy8098", position: 1, is_published: true },
  { id: 2, label: "LinkedIn", icon: "bi-linkedin", url: "https://linkedin.com/in/hridoy-hussain-1610a5331", position: 2, is_published: true },
];

export const fallbackSkillCategories: SkillCategory[] = [
  {
    id: 1,
    label: "Backend",
    icon: "bi-hdd-stack",
    position: 1,
    is_published: true,
    skills: [
      { id: 1, category_id: 1, name: "Laravel", icon: "bi-boxes", position: 1, is_published: true },
      { id: 2, category_id: 1, name: "PHP", icon: "bi-filetype-php", position: 2, is_published: true },
      { id: 3, category_id: 1, name: "Python", icon: "bi-filetype-py", position: 3, is_published: true },
      { id: 4, category_id: 1, name: "FastAPI", icon: "bi-lightning-charge-fill", position: 4, is_published: true },
      { id: 5, category_id: 1, name: "REST API", icon: "bi-diagram-3", position: 5, is_published: true },
      { id: 6, category_id: 1, name: "MySQL", icon: "bi-database-fill", position: 6, is_published: true },
    ],
  },
  {
    id: 2,
    label: "Frontend",
    icon: "bi-display",
    position: 2,
    is_published: true,
    skills: [
      { id: 7, category_id: 2, name: "HTML", icon: "bi-filetype-html", position: 1, is_published: true },
      { id: 8, category_id: 2, name: "CSS", icon: "bi-filetype-css", position: 2, is_published: true },
      { id: 9, category_id: 2, name: "JavaScript", icon: "bi-filetype-js", position: 3, is_published: true },
      { id: 10, category_id: 2, name: "Bootstrap", icon: "bi-bootstrap", position: 4, is_published: true },
      { id: 11, category_id: 2, name: "Vue.js", icon: "bi-code-square", position: 5, is_published: true },
      { id: 12, category_id: 2, name: "Next.js", icon: "bi-box-seam", position: 6, is_published: true },
    ],
  },
  {
    id: 3,
    label: "AI/ML",
    icon: "bi-cpu",
    position: 3,
    is_published: true,
    skills: [
      { id: 13, category_id: 3, name: "Machine Learning", icon: "bi-cpu-fill", position: 1, is_published: true },
      { id: 14, category_id: 3, name: "Computer Vision", icon: "bi-eye-fill", position: 2, is_published: true },
      { id: 15, category_id: 3, name: "YOLO", icon: "bi-bullseye", position: 3, is_published: true },
      { id: 16, category_id: 3, name: "CNN", icon: "bi-diagram-3-fill", position: 4, is_published: true },
      { id: 17, category_id: 3, name: "Transfer Learning", icon: "bi-arrow-repeat", position: 5, is_published: true },
      { id: 18, category_id: 3, name: "Grad-CAM", icon: "bi-search", position: 6, is_published: true },
      { id: 19, category_id: 3, name: "AI Integration", icon: "bi-plugin", position: 7, is_published: true },
      { id: 20, category_id: 3, name: "AI Automation", icon: "bi-robot", position: 8, is_published: true },
    ],
  },
  {
    id: 4,
    label: "Tools",
    icon: "bi-wrench-adjustable",
    position: 4,
    is_published: true,
    skills: [
      { id: 21, category_id: 4, name: "Git", icon: "bi-git", position: 1, is_published: true },
      { id: 22, category_id: 4, name: "GitHub", icon: "bi-github", position: 2, is_published: true },
      { id: 23, category_id: 4, name: "Docker", icon: "bi-box", position: 3, is_published: true },
      { id: 24, category_id: 4, name: "Hugging Face", icon: "bi-emoji-smile", position: 4, is_published: true },
      { id: 25, category_id: 4, name: "Vercel", icon: "bi-triangle-fill", position: 5, is_published: true },
      { id: 26, category_id: 4, name: "Cloudflare", icon: "bi-cloud-slash", position: 6, is_published: true },
    ],
  },
];

export const fallbackSkills: Skill[] = fallbackSkillCategories.flatMap((cat) => cat.skills);

export const fallbackCategories: PortfolioCategory[] = [
  { id: 1, value: "webapp", label: "Web App", position: 1, is_published: true },
  { id: 2, value: "ai", label: "AI/ML", position: 2, is_published: true },
  { id: 3, value: "fullstack", label: "Full Stack", position: 3, is_published: true },
];

export const fallbackPortfolio: PortfolioItem[] = [
  {
    id: 1,
    slug: "atlas-learn",
    title: "Atlas Learn (EduAmy)",
    categories: ["ai", "webapp", "fullstack"],
    description:
      "AI-powered English learning platform with an AI tutor named Amy, Duolingo-style gamification, and bKash/Nagad payment integration. Built with a FastAPI backend and Vue.js/Next.js frontends.",
    image: "/portfolio/app-1.jpg",
    screenshots: ["/portfolio/app-1.jpg", "/portfolio/app-2.jpg", "/portfolio/app-3.jpg"],
    technologies: ["FastAPI", "Python", "Vue.js", "Next.js", "MySQL", "REST API", "AI Integration"],
    live_url: "",
    github_url: "",
    detail_category: "AI Learning Platform",
    detail_client: "Independent / Freelance",
    detail_date: "Ongoing",
    detail_status: "In development",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: "bi-grid-1x2",
        items: [
          "Atlas Learn is an AI-powered English learning platform. It ships an AI tutor named Amy that gives learners real-time feedback, a Duolingo-style gamified lesson loop, and local payment support (bKash/Nagad) so learners in Bangladesh can access it easily.",
          "The backend is a FastAPI REST API, and the frontend is built with Vue.js and Next.js. The platform is designed as a complete product — auth, lessons, progress tracking, payments and admin tooling.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        icon: "bi-patch-question",
        items: [
          "Most English-learning products are either static content apps or global platforms with no local payment methods relevant to Bangladesh.",
          "Learners rarely get interactive, on-demand feedback while they practise, so progress stalls without a teacher.",
          "Existing tools separate learning content, gamification and payments into disconnected experiences.",
        ],
      },
      {
        id: "solution",
        title: "Solution",
        icon: "bi-lightbulb",
        items: [
          "Built a single end-to-end platform where an AI tutor (Amy) provides instant feedback inside a gamified learning experience.",
          "Designed a FastAPI backend that both Vue.js and Next.js frontends share, keeping the API contract consistent.",
          "Integrated bKash/Nagad payment flow plus progress tracking and admin dashboard capabilities.",
        ],
      },
      {
        id: "features",
        title: "Features",
        icon: "bi-collection",
        items: [
          "AI tutor chat with contextual English feedback",
          "Lesson structure with Duolingo-style gamification",
          "Learner progress and streak tracking",
          "bKash/Nagad payment integration",
          "User authentication and account management",
          "Admin dashboard for content and payments",
        ],
      },
      {
        id: "contribution",
        title: "My Contribution",
        icon: "bi-person-workspace",
        items: [
          "Full-stack development across backend and frontend",
          "FastAPI REST API design and implementation",
          "AI tutor integration into the learning flow",
          "Frontend implementation with Vue.js and Next.js",
          "Payment integration architecture (bKash/Nagad)",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        icon: "bi-tornado",
        items: [
          "Keeping AI tutor responses snappy inside a real-time learning UX",
          "Maintaining one API contract across two different frontends",
          "Designing a database schema that can grow with new content types",
        ],
      },
      {
        id: "results",
        title: "Results",
        icon: "bi-graph-up-arrow",
        items: [
          "A working end-to-end platform that connects AI tutoring, gamification and local payments",
          "A clean separation between the FastAPI API and both frontends, making the product easier to extend",
          "An ongoing product with clear headroom for more lessons, languages and AI features",
        ],
      },
    ],
    is_featured: true,
    is_published: true,
    position: 1,
    created_at: "",
  },
  {
    id: 2,
    slug: "ml-platform",
    title: "ML Platform",
    categories: ["ai"],
    description:
      "Kaggle-style machine learning platform with 13+ ML workflow tabs, including a computer vision module with CNN transfer learning and Grad-CAM visualizations. Deployed on Hugging Face Spaces.",
    image: "/portfolio/product-1.jpg",
    screenshots: ["/portfolio/product-1.jpg", "/portfolio/product-2.jpg", "/portfolio/product-3.jpg"],
    technologies: ["Python", "FastAPI", "Machine Learning", "Computer Vision", "CNN", "Transfer Learning", "Grad-CAM", "Hugging Face"],
    live_url: "",
    github_url: "",
    detail_category: "AI/ML Platform",
    detail_client: "Independent / Freelance",
    detail_date: "Completed",
    detail_status: "Deployed",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: "bi-grid-1x2",
        items: [
          "A Kaggle-style machine learning platform deployed on Hugging Face Spaces. It provides 13+ workflow tabs covering the full ML pipeline — from data loading and preprocessing to training, evaluation and insight.",
          "The platform includes a dedicated computer vision module built around CNN transfer learning, backed by Grad-CAM heatmaps so results are explainable, not just a number.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        icon: "bi-patch-question",
        items: [
          "ML workflows usually live scattered across notebooks, making it hard to reuse, compare or present results in one place.",
          "Computer vision model outcomes can feel like a black box — users see accuracy numbers but not why a model makes a decision.",
        ],
      },
      {
        id: "solution",
        title: "Solution",
        icon: "bi-lightbulb",
        items: [
          "Built a single web application that organises the ML pipeline into clear, reusable workflow tabs.",
          "Added a computer vision module with CNN transfer learning and Grad-CAM visualizations so predictions are interpretable.",
          "Deployed the platform on Hugging Face Spaces to make it shareable and instantly accessible in a browser.",
        ],
      },
      {
        id: "features",
        title: "Features",
        icon: "bi-collection",
        items: [
          "13+ workflow tabs covering the ML pipeline",
          "Computer vision module with CNN transfer learning",
          "Grad-CAM heatmap visualizations for explainability",
          "Reusable data, training and evaluation steps",
          "Hosted on Hugging Face Spaces for instant access",
        ],
      },
      {
        id: "contribution",
        title: "My Contribution",
        icon: "bi-person-workspace",
        items: [
          "End-to-end design, build and deployment",
          "Computer vision pipeline using transfer learning",
          "Grad-CAM integration for model interpretability",
          "Organizing 13+ workflows into one usable interface",
          "Deployment and hosting on Hugging Face Spaces",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        icon: "bi-tornado",
        items: [
          "Keeping 13+ workflows coherent inside a single UI",
          "Working within the resource limits of a hosted Spaces deployment",
          "Balancing general-purpose tools with depth in each workflow",
        ],
      },
      {
        id: "results",
        title: "Results",
        icon: "bi-graph-up-arrow",
        items: [
          "A deployed, accessible ML platform useful for demos, teaching and quick experiments",
          "Explainable computer vision results through Grad-CAM instead of opaque accuracy numbers",
          "A reusable structure that makes adding new ML workflows straightforward",
        ],
      },
    ],
    is_featured: false,
    is_published: true,
    position: 2,
    created_at: "",
  },
  {
    id: 3,
    slug: "encrypttechbd",
    title: "EncryptTechBD",
    categories: ["fullstack", "webapp"],
    description:
      "Migrated a single-page sci-fi/HUD style website into a structured Laravel Blade project, with a full admin panel and a clean MySQL database schema.",
    image: "/portfolio/branding-1.jpg",
    screenshots: ["/portfolio/branding-1.jpg", "/portfolio/branding-2.jpg", "/portfolio/branding-3.jpg"],
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "Admin Dashboard"],
    live_url: "",
    github_url: "",
    detail_category: "Full Stack / Migration",
    detail_client: "Client website migration",
    detail_date: "Completed",
    detail_status: "Deployed",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: "bi-grid-1x2",
        items: [
          "EncryptTechBD originally existed as a single-page, sci-fi/HUD style promotional site. I migrated it into a structured Laravel Blade project so the business could manage content without touching code.",
          "The migration kept the distinctive sci-fi/HUD visual identity while adding a full admin panel, a MySQL database schema and maintainable Blade templates.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        icon: "bi-patch-question",
        items: [
          "A single-page site means every content change requires editing code.",
          "No admin panel, no data layer and no clean separation between structure, styling and content.",
          "The sci-fi/HUD visual style is hard to maintain if all markup lives in one page.",
        ],
      },
      {
        id: "solution",
        title: "Solution",
        icon: "bi-lightbulb",
        items: [
          "Restructured the site into a modular Laravel project with reusable Blade components and partials.",
          "Designed a MySQL schema for the content the site needs, and built an admin panel to manage it.",
          "Preserved the original HUD/sci-fi styling through the template layer for consistency.",
        ],
      },
      {
        id: "features",
        title: "Features",
        icon: "bi-collection",
        items: [
          "Structured Laravel Blade frontend",
          "Full admin panel for content management",
          "MySQL database schema backing the content",
          "Reusable layout, partials and components",
          "Responsive design retaining the sci-fi/HUD identity",
        ],
      },
      {
        id: "contribution",
        title: "My Contribution",
        icon: "bi-person-workspace",
        items: [
          "Restructured the fragile single page into a maintainable Laravel project",
          "Built the admin panel and database schema",
          "Ported the existing design into clean Blade templates",
          "Set up the data models and relationships the site needs",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        icon: "bi-tornado",
        items: [
          "Preserving the original visual identity during a complete rebuild",
          "Translating a heavy single-page layout into modular, reusable components",
          "Designing a schema that fits the content without over-engineering",
        ],
      },
      {
        id: "results",
        title: "Results",
        icon: "bi-graph-up-arrow",
        items: [
          "A maintainable Laravel project that replaced a fragile single page",
          "Admin-managed content so updates no longer require code changes",
          "A solid structural foundation for adding new sections and features later",
        ],
      },
    ],
    is_featured: false,
    is_published: true,
    position: 3,
    created_at: "",
  },
  {
    id: 4,
    slug: "fish-farm-monitoring",
    title: "Fish Farm Monitoring (Capstone)",
    categories: ["fullstack", "ai"],
    description:
      "Scoped IoT + ML system for fish farm sustainability monitoring — FastAPI backend, ML prediction models, a Vue.js dashboard and Telegram alerts.",
    image: "/portfolio/books-1.jpg",
    screenshots: ["/portfolio/books-1.jpg", "/portfolio/books-2.jpg", "/portfolio/books-3.jpg"],
    technologies: ["FastAPI", "Python", "Vue.js", "Machine Learning", "REST API", "IoT", "Telegram API"],
    live_url: "",
    github_url: "",
    detail_category: "IoT + ML System",
    detail_client: "University Capstone",
    detail_date: "2025",
    detail_status: "Scoped / planned",
    sections: [
      {
        id: "overview",
        title: "Overview",
        icon: "bi-grid-1x2",
        items: [
          "A scoped IoT + ML system for monitoring fish farm sustainability. It is designed to ingest sensor data from ponds, apply ML prediction models, and surface actionable insights through a Vue.js dashboard and Telegram alerts.",
          "The architecture uses a FastAPI backend to collect and serve data, ML models for prediction, and a dashboard + chat alerts for real-time monitoring.",
        ],
      },
      {
        id: "problem",
        title: "Problem",
        icon: "bi-patch-question",
        items: [
          "Water quality in fish farms is often monitored manually and reactively — problems are noticed only after they become visible.",
          "Without prediction, farmers cannot anticipate changing conditions before they impact yield.",
          "Monitoring data is commonly trapped in dashboards that nobody checks continuously.",
        ],
      },
      {
        id: "solution",
        title: "Solution",
        icon: "bi-lightbulb",
        items: [
          "Designed a system that continuously ingests sensor readings into a FastAPI backend.",
          "Applied ML prediction models to detect and forecast unfavourable conditions.",
          "Pushed alerts to Telegram so farmers get notified proactively instead of having to watch a dashboard.",
          "Provided a Vue.js dashboard for rich, on-demand analysis.",
        ],
      },
      {
        id: "features",
        title: "Features",
        icon: "bi-collection",
        items: [
          "IoT sensor data ingestion pipeline",
          "ML models for water-quality prediction",
          "Vue.js dashboard for monitoring and history",
          "Telegram alerts for real-time notifications",
          "FastAPI REST API connecting every layer",
        ],
      },
      {
        id: "contribution",
        title: "My Contribution",
        icon: "bi-person-workspace",
        items: [
          "Scoped the full system architecture (IoT → backend → ML → dashboard → alerts)",
          "Designed the FastAPI backend and REST API layer",
          "Planned the ML prediction model approach",
          "Structured the Vue.js dashboard and alert flow",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        icon: "bi-tornado",
        items: [
          "Hardware and sensor reliability constraints in real farm environments",
          "Limited historical data for training reliable prediction models",
          "Integrating real-time sensor data, ML and notifications into one flow",
        ],
      },
      {
        id: "results",
        title: "Results",
        icon: "bi-graph-up-arrow",
        items: [
          "A well-documented, scoped architecture ready for prototype implementation",
          "A clear data flow from pond sensors through to proactive Telegram alerts",
          "A strong foundation for a working capstone prototype with ML-driven monitoring",
        ],
      },
    ],
    is_featured: false,
    is_published: true,
    position: 4,
    created_at: "",
  },
];

export const fallbackServices: Service[] = [
  {
    id: 1,
    icon: "bi-briefcase",
    title: "Full-Stack Web Development",
    description:
      "Complete web applications built end-to-end — Laravel/FastAPI backends, Vue.js/Next.js frontends and a database design that scales with the product.",
    points: ["Laravel + FastAPI backends", "Vue.js + Next.js frontends", "Database architecture & security"],
    position: 1,
    is_published: true,
  },
  {
    id: 2,
    icon: "bi-cpu",
    title: "AI/ML Integration",
    description:
      "Adding real AI value to products — AI assistants and tutors, recommendation systems, computer vision features and ML-powered tools.",
    points: ["AI assistants & chatbots", "Computer vision (YOLO/CNN)", "Explainable ML (Grad-CAM)"],
    position: 2,
    is_published: true,
  },
  {
    id: 3,
    icon: "bi-magic",
    title: "AI Automation",
    description:
      "Automating repetitive workflows with AI so teams spend less time on manual tasks and more time on the work that matters.",
    points: ["Workflow & task automation", "LLM-driven pipelines", "Integrations with existing tools"],
    position: 3,
    is_published: true,
  },
  {
    id: 4,
    icon: "bi-plug",
    title: "REST API Development",
    description:
      "Clean, documented and maintainable REST APIs that power web apps, dashboards, mobile clients and third-party integrations.",
    points: ["API design & versioning", "Authentication & authorization", "FastAPI / Laravel APIs"],
    position: 4,
    is_published: true,
  },
  {
    id: 5,
    icon: "bi-speedometer2",
    title: "Admin Dashboard Development",
    description:
      "Custom admin dashboards for content, orders, users, analytics and more — so clients can run their own product confidently.",
    points: ["Custom admin panels", "Content & user management", "Reports & analytics views"],
    position: 5,
    is_published: true,
  },
  {
    id: 6,
    icon: "bi-binoculars",
    title: "Freelance Web Development",
    description:
      "Available for freelance work — website migrations, custom platforms, admin panels and ongoing maintenance for small businesses.",
    points: ["Website migrations", "Custom platforms", "Ongoing maintenance"],
    position: 6,
    is_published: true,
  },
];

export const fallbackEducation: Education[] = [
  {
    id: 1,
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "University of Liberal Arts Bangladesh (ULAB)",
    description:
      "Built a strong foundation in algorithms, data structures, databases, software engineering and machine learning — directly applied to my full stack and AI/ML work.",
    position: 1,
    is_published: true,
  },
];

export const fallbackExperience: Experience[] = [
  {
    id: 1,
    role: "Full-Stack & AI/ML Developer",
    organization: "Independent Projects / Freelance",
    period: "Ongoing",
    responsibilities: [
      "Full-stack web application development from scope to deployment",
      "Backend development with Laravel and FastAPI",
      "Frontend development with Vue.js and Next.js",
      "AI/ML integration and AI automation feature work",
      "REST API design, development and integration",
      "Database architecture and schema design",
      "Admin dashboard design and development",
      "Deployment and production setup",
    ],
    description:
      "Working as a solo developer on independent and freelance projects, I take products from scope and architecture through to deployment, covering the full stack and the AI/ML layer.",
    position: 1,
    is_published: true,
  },
];

export const fallbackTheme: ThemeSettings = {
  accent: "#149ddd",
  accent_dark: "#0f7fae",
  accent_soft: "#d7eefb",
  navy: "#040b14",
  navy_light: "#151f2b",
  heading: "#050d18",
  body: "#272829",
  light: "#f4fafd",
  navm: "#a8a9b4",
  danger: "#df1529",
  success: "#059652",
  hero_overlay_opacity: 30,
  font_heading: "raleway",
  font_body: "roboto",
  font_nav: "poppins",
  updated_at: "",
};

export const fallbackSettings: SiteSettings = {
  meta: {
    site_title: "Hridoy Hussain - Full-Stack Developer & AI/ML Engineer",
    description:
      "Portfolio of Hridoy Hussain — Full-Stack Developer & AI/ML Engineer working with Laravel, Vue.js, Next.js, FastAPI and AI/ML integration.",
    keywords: [
      "full stack developer",
      "laravel",
      "vue.js",
      "nextjs",
      "fastapi",
      "ai integration",
      "ai automation",
      "bangladesh",
    ],
    og_title: "Hridoy Hussain - Full-Stack Developer & AI/ML Engineer",
    og_description:
      "Solo developer building full stack web apps and AI-powered products.",
    og_image: "",
    canonical_url: "https://hridoy.dev",
    lang: "en",
    favicon_url: "/icon.png",
    apple_icon_url: "",
  },
  hero: {
    hello_prefix: "Hello, I'm",
    typed_prefix: "I'm a",
    primary_label: "View My Work",
    primary_link: "/#portfolio",
    cv_label: "Download CV",
    cv_soon_label: "(soon)",
    contact_label: "Contact Me",
    contact_link: "/#contact",
  },
  footer: {
    copyright_text: "All Rights Reserved",
    show_credit: true,
    credit_html:
      "Designed by <a href=\"https://bootstrapmade.com/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"no-underline\">BootstrapMade</a> · Distributed by <a href=\"https://themewagon.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"no-underline\">ThemeWagon</a>",
  },
  section_subtitles: {
    about:
      "A CSE graduate specializing in full-stack web development and AI/ML integration — building products end-to-end, from database to dashboard.",
    skills:
      "My tech stack organized by area — backend, frontend, AI/ML and the tools I use every day",
    resume:
      "My professional experience and education as a full-stack & AI/ML developer",
    portfolio:
      "A selection of projects I've built — from full-stack web platforms to AI/ML-powered products",
    services: "What I can help you build — from full-stack products to AI/ML integration and automation",
    contact: "Have a project in mind or want to discuss a collaboration? Send me a message.",
  },
  resume_labels: {
    summary_heading: "Summary",
    education_heading: "Education",
    experience_heading: "Professional Experience",
  },
  service_details: {
    page_title: "Service Details",
    sidebar_heading: "Services",
    heading: "Full stack platforms with production-ready AI features",
    image_url: "/services.jpg",
    highlight_heading: "A complete product partner",
    highlight_body:
      "From scoping to deployment, I handle the full build — backend, frontend, AI features and the automation glue that ties it together.",
    paragraph:
      "I build complete products end-to-end — Laravel/FastAPI backends, Vue.js/Next.js frontends, and AI features that actually work in production. Every project starts with a clear scope: data model, API design, UI structure and the AI pieces that make the product feel smart.",
    paragraph_2:
      "Whether it's an AI tutor, a recommendation engine, or replacing manual workflows with AI automation, I focus on shipping features that are reliable, measurable and maintainable.",
    checklist: [
      "End-to-end development with Laravel, Vue.js, Next.js and FastAPI",
      "AI assistants, chatbots and ML-powered product features",
      "AI automation to cut repetitive manual workflows",
      "Website migrations and maintainable admin panels",
    ],
  },
  contact: {
    name_label: "Name",
    email_label: "Email",
    subject_label: "Subject",
    message_label: "Message",
    submit_label: "Send Message",
    sending_label: "Sending...",
    success_message: "Thanks! Your message has been sent. I'll get back to you soon.",
    error_message:
      "Something went wrong while sending your message. Please try again, or contact me directly on LinkedIn.",
    name_placeholder: "Your name",
    email_placeholder: "you@example.com",
    subject_placeholder: "What is this about?",
    message_placeholder: "Tell me about your project or question...",
    fieldErrorRequired: {
      name_required: "Please enter your name.",
      name_min: "Name must be at least 2 characters.",
      email_required: "Please enter your email.",
      email_invalid: "Please enter a valid email address.",
      subject_required: "Please add a subject.",
      subject_min: "Subject must be at least 3 characters.",
      message_required: "Please write a message.",
      message_min: "Message must be at least 10 characters.",
    },
  },
};