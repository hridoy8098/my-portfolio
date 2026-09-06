import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import ScrollTop from "@/components/layout/ScrollTop";
import Preloader from "@/components/layout/Preloader";
import { getSettings, getSiteData } from "@/lib/supabase/queries";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, siteData] = await Promise.all([
    getSettings(),
    getSiteData(),
  ]);

  return (
    <>
      <SiteNav
        profile={siteData.profile}
        nav={siteData.nav}
        socials={siteData.socials}
      />
      <main className="desk:ml-[300px]">{children}</main>
      <Footer profile={siteData.profile} footer={settings.footer} />
      <ScrollTop />
      <Preloader />
    </>
  );
}