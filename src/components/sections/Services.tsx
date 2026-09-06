import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import type { Service } from "@/types/site";

export default function Services({
  services,
  subtitle,
}: {
  services: Service[];
  subtitle: string;
}) {
  return (
    <section id="services" className="py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="Services" subtitle={subtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 2) * 100}>
              <div className="flex h-full flex-col gap-4 rounded-[6px] bg-white p-[22px] shadow-[0_0_30px_rgba(1,41,82,0.08)] sm:flex-row sm:p-[30px]">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[6px] bg-accent-soft text-2xl text-accent">
                  <i className={`bi ${service.icon}`} />
                </div>
                <div>
                  <h4 className="text-[20px] font-bold text-heading">
                    {service.title}
                  </h4>
                  <p className="mb-3 text-[15px] leading-relaxed text-body">
                    {service.description}
                  </p>
                  <ul className="mb-0 list-none space-y-1 p-0">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-[14px] text-body"
                      >
                        <i className="bi bi-check-circle text-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}