import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import type { Profile, SocialLink, ContactSettings } from "@/types/site";

function handleFrom(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

export default function Contact({
  profile,
  socials,
  subtitle,
  contactLabels,
}: {
  profile: Profile;
  socials: SocialLink[];
  subtitle: string;
  contactLabels: ContactSettings;
}) {
  const infoItems = [
    { icon: "bi-geo-alt", label: "Location", value: profile.city },
    {
      icon: "bi-lightning-charge",
      label: "Availability",
      value: `${profile.availability} for freelance projects`,
    },
    ...socials.map((s) => ({
      icon: s.icon,
      label: s.label,
      href: s.url,
      value: handleFrom(s.url),
    })),
  ];

  return (
    <section id="contact" className="py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="Contact" subtitle={subtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            {infoItems.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <div className="mb-4 flex items-center gap-4 last:mb-0">
                  <i
                    className={`bi ${item.icon} hidden h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[50px] text-lg text-accent sm:flex`}
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-accent), transparent 85%)",
                    }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-heading">
                      {item.label}
                    </h3>
                    {"href" in item && item.href ? (
                      <p className="mb-0 break-all">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          {item.value}
                        </a>
                      </p>
                    ) : (
                      <p className="mb-0">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-7">
            <Reveal delay={100}>
              <ContactForm labels={contactLabels} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}