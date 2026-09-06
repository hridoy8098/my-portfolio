import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import { getSettings } from "@/lib/supabase/queries";
import { getAllPortfolioSlugs, getPortfolioItemBySlug, getPortfolioItems } from "@/lib/supabase/queries";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  const settings = await getSettings();
  const siteTitle = settings.meta.site_title.split(" - ")[0] ?? "Portfolio";
  if (!item) return { title: `Project - ${siteTitle}` };
  return {
    title: `${item.title} - ${siteTitle}`,
    description: item.description,
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const otherProjects = (await getPortfolioItems()).filter(
    (p) => p.slug !== slug
  );

  return (
    <>
      <PageHeader title="Project Details" current={item.title} />

      <section className="py-[60px] desk:py-[80px]">
        <div className="mx-auto max-w-[1200px] px-[12px]">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <Reveal>
                <h2 className="mb-2 text-2xl font-bold text-heading">
                  {item.title}
                </h2>
                <p className="mb-4 leading-relaxed text-body">
                  {item.description}
                </p>
                <div className="overflow-hidden rounded-[8px]">
                  <PortfolioGallery images={item.screenshots} />
                </div>
              </Reveal>
            </div>

            <div className="md:col-span-4">
              <Reveal delay={100}>
                <div className="rounded-[6px] bg-light p-5">
                  <h3 className="mb-3 text-lg font-bold text-heading">
                    Project information
                  </h3>
                  <ul className="list-none space-y-2 p-0 text-sm">
                    <li>
                      <strong className="inline-block w-[100px]">Category</strong>{" "}
                      {item.detail_category}
                    </li>
                    <li>
                      <strong className="inline-block w-[100px]">Client</strong>{" "}
                      {item.detail_client}
                    </li>
                    <li>
                      <strong className="inline-block w-[100px]">Date</strong>{" "}
                      {item.detail_date}
                    </li>
                    <li>
                      <strong className="inline-block w-[100px]">Status</strong>{" "}
                      {item.detail_status}
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-[6px] bg-light p-5">
                  <h3 className="mb-3 text-lg font-bold text-heading">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[50px] bg-white px-3 py-1.5 text-[13px] font-medium text-body ring-1 ring-accent/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {item.live_url ? (
                    <a
                      href={item.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[50px] bg-accent px-5 py-3 font-nav text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-dark"
                    >
                      <i className="bi bi-box-arrow-up-right" />
                      Live Demo
                    </a>
                  ) : (
                    <span
                      title="Live demo link will be added once the project is published."
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-[50px] bg-accent/40 px-5 py-3 font-nav text-sm font-semibold text-white no-underline"
                    >
                      <i className="bi bi-box-arrow-up-right" />
                      Live Demo
                      <span className="text-[12px] uppercase tracking-wide">(coming soon)</span>
                    </span>
                  )}

                  {item.github_url ? (
                    <a
                      href={item.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-[50px] border border-accent/40 px-5 py-3 font-nav text-sm font-semibold text-heading no-underline transition-colors hover:border-accent hover:bg-accent hover:text-white"
                    >
                      <i className="bi bi-github" />
                      GitHub Repository
                    </a>
                  ) : (
                    <span
                      title="Source code is private or not published yet."
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-[50px] border border-gray-300 px-5 py-3 font-nav text-sm font-semibold text-body/60 no-underline"
                    >
                      <i className="bi bi-github" />
                      GitHub Repository
                      <span className="text-[12px] uppercase tracking-wide">(private)</span>
                    </span>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-[50px] grid gap-6 md:grid-cols-2">
            {item.sections.map((section, index) => (
              <Reveal key={section.id} delay={(index % 2) * 100}>
                <div className="h-full rounded-[6px] bg-white p-[30px] shadow-[0_0_30px_rgba(1,41,82,0.08)]">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-heading">
                    <i className={`bi ${section.icon} text-accent`} />
                    {section.title}
                  </h3>
                  <ul className="mb-0 space-y-2 pl-5 [list-style:disc]">
                    {section.items.map((text) => (
                      <li
                        key={text}
                        className="text-[15px] leading-relaxed text-body"
                      >
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {otherProjects.length > 0 && (
            <div className="mt-[60px]">
              <Reveal>
                <h3 className="mb-5 text-[22px] font-bold text-heading">
                  Other Projects
                </h3>
              </Reveal>
              <div className="grid gap-6 md:grid-cols-3">
                {otherProjects.map((project, index) => (
                  <Reveal key={project.slug} delay={index * 100}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group block h-full overflow-hidden rounded-[6px] bg-white shadow-[0_0_30px_rgba(1,41,82,0.08)] no-underline"
                    >
                      <div className="overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="mb-1 text-[16px] font-bold text-heading">
                          {project.title}
                        </h4>
                        <p className="mb-0 line-clamp-2 text-[13px] leading-relaxed text-body">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}