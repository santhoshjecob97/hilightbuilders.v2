import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { site } from "@/config";

const PRINCIPLES = [
  {
    title: "Trust is built in writing",
    copy: "Scope, estimates and responsibilities are documented before work begins. Verbal promises don't survive a project; written ones do.",
  },
  {
    title: "Communication is a deliverable",
    copy: "You should never have to chase us for an update. We share progress at defined milestones and answer directly when you ask.",
  },
  {
    title: "Design serves the resident",
    copy: "A home that photographs well but lives badly is a failure. We design for your routines first, the camera second.",
  },
  {
    title: "Honesty over salesmanship",
    copy: "If a material won't last, we say so. If a timeline is unrealistic, we say that too — before you sign, not after.",
  },
];

export default function About() {
  useSeo(
    "About Us — HILIGHT BUILDERS | Interior Designers & Contractors, Chennai",
    "HILIGHT BUILDERS is a Chennai design-and-build studio founded by Mr. Srinivasan, delivering residential and commercial interiors with transparent scope.",
  );

  return (
    <>
      <PageHero
        image="/images/studio.jpg"
        alt="HILIGHT BUILDERS design studio with scale models and drawings"
        eyebrow="About Hilight Builders"
        title="Building trust. Creating legacies."
        copy="A Chennai-based design and build studio for residential and commercial spaces — where design intent and site execution answer to the same standard."
      />

      <Section className="py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              eyebrow="The Studio"
              title="One team from sketch to handover."
              copy="HILIGHT BUILDERS brings design coordination, material planning and execution under one roof. We work with homeowners, business owners and property decision-makers across Chennai who want their space handled professionally — with clear scope and honest communication."
            />
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed text-ash">
                We coordinate closely with your architects, engineers and consultants where they are
                appointed, and we never blur the line between what we design, what we coordinate and
                what we execute. That clarity is the foundation of every project we take on.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="overflow-hidden">
              <img
                src="/images/blueprint.jpg"
                alt="Drawings and material samples at the HILIGHT BUILDERS studio"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Leadership */}
      <Section className="bg-charcoal-deep py-24 lg:py-32">
        <SectionHead
          eyebrow="Leadership"
          title="The people behind the promise."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              name: site.founder,
              role: "Founder",
              copy: "Leads the studio's vision, client relationships, and the uncompromising standard every project is held to across design and site execution.",
            },
            {
              name: site.operations,
              role: "Business Operations",
              copy: "Runs project coordination, scheduling, and client communication — the operational backbone ensuring transparent handovers from consultation onward.",
            },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className="hairline bg-charcoal p-8 lg:p-10">
                <div className="flex h-16 w-16 items-center justify-center border border-brand/40 font-display text-[22px] font-bold text-brand">
                  {p.name.replace("Mr. ", "").charAt(0)}
                </div>
                <h3 className="mt-6 font-display text-[22px] font-semibold text-bone">{p.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-brand">
                  {p.role}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-ash">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Principles */}
      <Section className="py-24 lg:py-32">
        <SectionHead eyebrow="How We Work" title="Principles we don't negotiate." />
        <div className="mt-14 grid gap-px bg-white/[0.07] hairline md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="bg-charcoal">
              <div className="h-full p-8 lg:p-10">
                <span className="font-mono text-[12px] tracking-[0.3em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[20px] font-semibold text-bone">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Let's build something that lasts."
        copy="Meet the team, see our process and decide if we're the right fit for your project."
      />
    </>
  );
}
