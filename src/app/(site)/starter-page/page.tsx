import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Starter Page - Hridoy Hussain",
  description: "Use this page as a starter for your own custom pages.",
};

export default function StarterPage() {
  return (
    <>
      <PageHeader title="Starter Page" current="Starter Page" />
      <section className="py-[60px] desk:py-[80px]">
        <div className="mx-auto max-w-[1200px] px-[12px]">
          <SectionTitle title="Starter Section" subtitle="Get started building here." />
          <p className="text-body">
            Use this page as a starter for your own custom pages. It inherits
            the shared sidebar, header and footer from the site layout.
          </p>
        </div>
      </section>
    </>
  );
}