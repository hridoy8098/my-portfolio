import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import { getSkillIcon } from "@/lib/skillIcons";
import type { SkillCategory } from "@/types/site";

export default function Skills({
  categories,
  subtitle,
}: {
  categories: SkillCategory[];
  subtitle: string;
}) {
  return (
    <section id="skills" className="bg-light py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="Skills" subtitle={subtitle} />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 2) * 100}>
              <div className="flex h-full flex-col rounded-[6px] bg-white p-[26px] shadow-[0_0_30px_rgba(1,41,82,0.08)]">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[6px] bg-accent-soft text-xl text-accent">
                      <i className={`bi ${category.icon}`} />
                    </span>
                    <div>
                      <h3 className="mb-0 text-[20px] font-bold text-heading">
                        {category.label}
                      </h3>
                      <p className="mb-0 text-[12px] text-body/70">
                        {category.skills.length}{" "}
                        {category.skills.length === 1 ? "skill" : "skills"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {category.skills.map((skill) => (
                    <SkillTile key={skill.id} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillTile({ name, icon }: { name: string; icon: string }) {
  const resolvedIcon = getSkillIcon(name, icon);

  return (
    <span
      title={name}
      className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-[6px] bg-light px-2 py-3 ring-1 ring-accent/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:ring-accent/30"
    >
      <i
        className={`bi ${resolvedIcon} text-[20px] leading-none text-accent transition-transform duration-300 group-hover:scale-110`}
      />
      <span className="w-full truncate text-center text-[13px] font-medium leading-tight text-heading">
        {name}
      </span>
    </span>
  );
}