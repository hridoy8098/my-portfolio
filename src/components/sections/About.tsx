import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import type { Profile } from "@/types/site";

export default function About({
  profile,
  subtitle,
}: {
  profile: Profile;
  subtitle: string;
}) {
  const factsLeft = profile.facts.slice(0, 3);
  const factsRight = profile.facts.slice(3);

  return (
    <section id="about" className="py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="About" subtitle={subtitle} />
        </Reveal>

        <Reveal delay={100}>
          <div className="grid gap-6 justify-center md:grid-cols-12">
            <div className="flex justify-center md:col-span-4 md:justify-start">
              <Image
                src={profile.photo_url}
                alt={profile.name}
                width={340}
                height={340}
                className="w-full max-w-[320px] object-cover sm:max-w-[340px]"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>

            <div className="md:col-span-8">
              <h2 className="text-lg font-bold text-heading sm:text-xl">
                {profile.about_headline}
              </h2>
              <p className="mb-6 mt-4 italic">{profile.about_intro}</p>

              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                <ul className="list-none space-y-5 p-0">
                  {factsLeft.map((f) => (
                    <li key={f.label} className="flex items-center gap-2">
                      <i className="bi bi-chevron-right shrink-0 text-accent" />
                      <strong className="mr-2 inline-block shrink-0 font-semibold">
                        {f.label}:
                      </strong>
                      <span className="break-words">{f.value}</span>
                    </li>
                  ))}
                </ul>
                <ul className="list-none space-y-5 p-0">
                  {factsRight.map((f) => (
                    <li key={f.label} className="flex items-center gap-2">
                      <i className="bi bi-chevron-right shrink-0 text-accent" />
                      <strong className="mr-2 inline-block shrink-0 font-semibold">
                        {f.label}:
                      </strong>
                      <span className="break-words">{f.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {profile.about_body.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "mt-6" : "mt-4"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}