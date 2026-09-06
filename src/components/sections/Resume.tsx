import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import type { Profile, Education, Experience, ResumeLabels } from "@/types/site";

export default function Resume({
  profile,
  education,
  experience,
  subtitle,
  resumeLabels,
}: {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  subtitle: string;
  resumeLabels: ResumeLabels;
}) {
  return (
    <section id="resume" className="py-[45px] desk:py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[15px] sm:px-6">
        <Reveal>
          <SectionTitle title="Resume" subtitle={subtitle} />
        </Reveal>

        <div className="grid gap-x-6 md:grid-cols-2">
          {/* Left column */}
          <div>
            <Reveal>
              <h3 className="mb-5 mt-5 text-[22px] font-bold text-heading sm:text-[26px]">
                {resumeLabels.summary_heading}
              </h3>
              <div className="relative mt-[-2px] border-l-2 pl-5 [border-left-color:color-mix(in_srgb,var(--color-accent),transparent_60%)]">
                <Dot />
                <h4 className="text-lg font-semibold text-heading">
                  {profile.name}
                </h4>
                <p className="mb-0 italic">
                  <em>{profile.resume_summary}</em>
                </p>
                <ul className="mb-0 mt-2 space-y-1 pl-5 text-[14px]">
                  {profile.resume_bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <h3 className="mb-5 mt-5 text-[22px] font-bold text-heading sm:text-[26px]">
                {resumeLabels.education_heading}
              </h3>
              {education.map((ed) => (
                <div
                  key={ed.id}
                  className="relative mt-[-2px] border-l-2 pl-5 [border-left-color:color-mix(in_srgb,var(--color-accent),transparent_60%)]"
                >
                  <Dot />
                  <h4 className="text-lg font-semibold text-heading">
                    {ed.degree}
                  </h4>
                  <p className="mb-2 rounded-[4px] bg-accent-soft px-3 py-1.5 font-heading text-sm font-semibold uppercase text-heading">
                    <em>{ed.institution}</em>
                  </p>
                  <p className="mb-0">{ed.description}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right column */}
          <div>
            <Reveal delay={100}>
              <h3 className="mb-5 mt-5 text-[22px] font-bold text-heading sm:text-[26px]">
                {resumeLabels.experience_heading}
              </h3>
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="relative mt-[-2px] border-l-2 pl-5 [border-left-color:color-mix(in_srgb,var(--color-accent),transparent_60%)]"
                >
                  <Dot />
                  <h4 className="text-lg font-semibold text-heading">
                    {exp.role}
                  </h4>
                  <p className="mb-2 rounded-[4px] bg-accent-soft px-3 py-1.5 font-heading text-sm font-semibold uppercase text-heading">
                    <em>
                      {exp.organization} · {exp.period}
                    </em>
                  </p>
                  <p className="mb-3">{exp.description}</p>
                  <ul className="mb-0 space-y-2 pl-5 text-[14px]">
                    {exp.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-accent bg-white"
      style={{ borderColor: "var(--color-accent)" }}
    />
  );
}