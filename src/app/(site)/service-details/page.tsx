import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { getServices, getSettings } from "@/lib/supabase/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteTitle = settings.meta.site_title.split(" - ")[0] ?? "Portfolio";
  return {
    title: `${settings.service_details.page_title} - ${siteTitle}`,
    description: "Details of the services offered.",
  };
}

export default async function ServiceDetailsPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSettings(),
  ]);
  const d = settings.service_details;

  return (
    <>
      <PageHeader title={d.page_title} current={d.page_title} />

      <section className="py-[60px] desk:py-[80px]">
        <div className="mx-auto max-w-[1200px] px-[12px]">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <div className="rounded-[6px]">
                  <ul className="list-none space-y-2 p-0">
                    {services.map((service, index) => (
                      <li key={service.id}>
                        <div
                          className={`block rounded-[4px] px-4 py-3 ${
                            index === 0
                              ? "bg-accent text-white"
                              : "bg-white text-heading shadow-[0_0_30px_rgba(1,41,82,0.08)]"
                          }`}
                        >
                          {service.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h4 className="font-bold text-heading">
                    {d.highlight_heading}
                  </h4>
                  <p className="text-[15px] leading-relaxed text-body">
                    {d.highlight_body}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-8">
              <Reveal delay={100}>
                <Image
                  src={d.image_url}
                  alt="Services"
                  width={900}
                  height={500}
                  className="aspect-[16/9] w-full rounded-[6px] object-cover"
                  sizes="(min-width: 768px) 66vw, 100vw"
                />
                <h3 className="mt-4 text-xl font-bold text-heading">
                  {d.heading}
                </h3>
                <p className="leading-relaxed text-body">{d.paragraph}</p>
                <ul className="space-y-2 pl-5 text-body">
                  {d.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="bi bi-check-circle mt-1 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="leading-relaxed text-body">{d.paragraph_2}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}