"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "@/types/site";
import { cn } from "@/lib/cn";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

export default function Portfolio({
  items,
  categories,
  subtitle,
}: {
  items: PortfolioItem[];
  categories: PortfolioCategory[];
  subtitle: string;
}) {
  const [filter, setFilter] = useState<string | null>(null);

  const filters = useMemo(
    () => [
      { key: null as string | null, label: "All" },
      ...categories.map((c) => ({ key: c.value, label: c.label })),
    ],
    [categories]
  );

  const filteredItems = filter
    ? items.filter((item) => item.categories.includes(filter))
    : items;

  return (
    <section id="portfolio" className="bg-light py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="Featured Projects" subtitle={subtitle} />
        </Reveal>

        <Reveal>
          <ul className="mb-6 flex list-none flex-wrap gap-x-3 gap-y-2 p-0">
            {filters.map((f) => (
              <li key={f.label}>
                <button
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "cursor-pointer whitespace-nowrap rounded-[8px] px-3 py-1.5 text-sm transition-colors",
                    filter === f.key
                      ? "bg-accent text-white"
                      : "bg-white text-heading hover:bg-accent hover:text-white"
                  )}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 desk:grid-cols-3">
          {filteredItems.map((item) => (
            <Reveal key={item.slug}>
              <ProjectCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] bg-white shadow-[0_0_30px_rgba(1,41,82,0.08)]">
      <div className="relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={400}
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <span className="absolute left-4 top-4 rounded-[50px] bg-navy/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-white">
          {item.detail_category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-[18px] font-bold text-heading">{item.title}</h3>
        <p className="mb-4 line-clamp-3 text-[14px] leading-relaxed text-body">
          {item.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {item.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-[50px] bg-light px-2.5 py-1 text-[12px] font-medium text-body ring-1 ring-accent/10"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 5 && (
            <span className="rounded-[50px] bg-accent-soft px-2.5 py-1 text-[12px] font-medium text-accent-dark">
              +{item.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {item.live_url ? (
            <a
              href={item.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[50px] bg-accent px-4 py-2 text-[13px] font-semibold text-white no-underline transition-colors hover:bg-accent-dark"
            >
              <i className="bi bi-box-arrow-up-right" />
              Live Demo
            </a>
          ) : (
            <span
              title="Live demo link will be added once the project is published."
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-[50px] bg-accent/40 px-4 py-2 text-[13px] font-semibold text-white no-underline"
            >
              <i className="bi bi-box-arrow-up-right" />
              Live Demo
              <span className="text-[11px] uppercase tracking-wide">(soon)</span>
            </span>
          )}

          {item.github_url ? (
            <a
              href={item.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[50px] border border-accent/40 px-4 py-2 text-[13px] font-semibold text-heading no-underline transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <i className="bi bi-github" />
              GitHub
            </a>
          ) : (
            <span
              title="Source code is private or not published yet."
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-[50px] border border-gray-300 px-4 py-2 text-[13px] font-semibold text-body/60 no-underline"
            >
              <i className="bi bi-github" />
              GitHub
              <span className="text-[11px] uppercase tracking-wide">(private)</span>
            </span>
          )}

          <Link
            href={`/projects/${item.slug}`}
            className="inline-flex items-center gap-1.5 px-2 py-2 text-[13px] font-semibold text-accent no-underline transition-colors hover:text-accent-dark"
          >
            Case Study
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </article>
  );
}