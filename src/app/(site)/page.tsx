import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Resume from "@/components/sections/Resume";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import {
  getProfile,
  getSkillCategories,
  getPortfolioItems,
  getPortfolioCategories,
  getServices,
  getEducation,
  getExperience,
  getSettings,
  getSocialLinks,
} from "@/lib/supabase/queries";

export const revalidate = 3600;

export default async function HomePage() {
  const [
    profile,
    categories,
    portfolioItems,
    categoriesPortfolio,
    services,
    education,
    experience,
    settings,
    socials,
  ] = await Promise.all([
    getProfile(),
    getSkillCategories(),
    getPortfolioItems(),
    getPortfolioCategories(),
    getServices(),
    getEducation(),
    getExperience(),
    getSettings(),
    getSocialLinks(),
  ]);

  const subtitles = settings.section_subtitles;

  return (
    <>
      <Hero profile={profile} heroSettings={settings.hero} />
      <About profile={profile} subtitle={subtitles.about} />
      <Skills categories={categories} subtitle={subtitles.skills} />
      <Resume
        profile={profile}
        education={education}
        experience={experience}
        subtitle={subtitles.resume}
        resumeLabels={settings.resume_labels}
      />
      <Portfolio
        items={portfolioItems}
        categories={categoriesPortfolio}
        subtitle={subtitles.portfolio}
      />
      <Services services={services} subtitle={subtitles.services} />
      <Contact
        profile={profile}
        socials={socials}
        subtitle={subtitles.contact}
        contactLabels={settings.contact}
      />
    </>
  );
}