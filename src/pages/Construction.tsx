import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { GeneralForm } from "@/components/EnquiryForms";
import { useSeo } from "@/components/Layout";

const SERVICES = [
  {
    n: "01",
    title: "Residential Construction",
    copy: "Ground-up construction of homes, coordinated with our design team so structure and interiors work together.",
    scope: "Scope: execution and coordination of construction work as per approved drawings and contracted scope.",
  },
  {
    n: "02",
    title: "Design & Build Coordination",
    copy: "Your architects and engineers design; we coordinate execution on site and keep drawings, materials and timelines aligned.",
    scope: "Scope: on-site coordination between your design consultants and execution teams. Architectural and structural design services are provided by your appointed consultants.",
  },
  {
    n: "03",
    title: "Renovation",
    copy: "Homes and commercial spaces upgraded — layout changes, services, finishes — with careful protection of what stays.",
    scope: "Scope: demolition, rework and finishing as per agreed scope, with site protection and staged execution.",
  },
  {
    n: "04",
    title: "Interior Execution",
    copy: "Carpentry, electrical, plumbing, painting and finishing executed from finalised interior drawings.",
    scope: "Scope: trade execution against approved interior drawings and material selections.",
  },
  {
    n: "05",
    title: "Project Coordination",
    copy: "Scheduling, procurement and vendor coordination so trades arrive in the right order, with the right materials.",
    scope: "Scope: scheduling, procurement coordination and site reporting for the contracted work.",
  },
  {
    n: "06",
    title: "Handover Management",
    copy: "Snag-list review, corrections, cleaning and documentation before keys change hands.",
    scope: "Scope: snag-list closure and handover documentation for work executed by HILIGHT BUILDERS.",
  },
];

export default function Construction() {
  useSeo(
    "Construction & Turnkey Solutions in Chennai | HILIGHT BUILDERS",
    "Residential construction, renovation and turnkey interior execution in Chennai with transparent scope and coordinated handover. Discuss your construction project.",
  );

  return (
    <>
      <PageHero
        image="/images/construction.jpg"
        alt="Residential construction site at golden hour"
        eyebrow="Construction & Turnkey · Chennai"
        title="From foundation to final handover."
        copy="Residential construction, renovation and turnkey interior execution — with scope, responsibilities and schedules documented before work begins."
        cta={{ to: "#enquiry", label: "Discuss Your Construction Project" }}
      />

      <Section className="py-24 lg:py-32">
        <SectionHead
          eyebrow="Services & Scope"
          title="What we take responsibility for — stated clearly."
          copy="Every engagement defines scope in writing. Architectural and structural design, where required, is performed by your appointed architects and engineers; we coordinate and execute."
        />
        <div className="mt-14 grid gap-px bg-white/[0.07] hairline md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.06} className="bg-charcoal">
              <div className="flex h-full flex-col p-8">
                <span className="font-mono text-[12px] tracking-[0.3em] text-brand">{s.n}</span>
                <h3 className="mt-5 font-display text-[19px] font-semibold text-bone">{s.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ash">{s.copy}</p>
                <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.04em] text-ash/70">
                  {s.scope}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-charcoal-deep py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Turnkey Advantage"
              title="One accountable team, one timeline."
              copy="When design, procurement and execution are coordinated by the same team, decisions get faster and finger-pointing disappears. You get a single point of contact, documented scope and staged updates until handover."
            />
            <Reveal delay={0.18}>
              <div className="mt-10 grid gap-px bg-white/[0.07] hairline sm:grid-cols-2">
                {[
                  ["Single contract", "One agreement covering the full contracted scope."],
                  ["Staged updates", "Progress documented and shared at defined milestones."],
                  ["Quality checks", "Stage-wise checks before the next trade begins."],
                  ["Clean handover", "Snag-list closure before we call it done."],
                ].map(([t, c]) => (
                  <div key={t} className="bg-charcoal-deep p-6">
                    <p className="font-display text-[15px] font-semibold text-bone">{t}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ash">{c}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="overflow-hidden">
              <img
                src="/images/renovation.jpg"
                alt="Interior renovation in progress with craftsmanship detail"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="enquiry" className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHead
            eyebrow="Project Enquiry"
            title="Tell us what you're building."
            copy="Share the plot or property details and your timeline — we'll schedule a discussion and a site visit where needed."
          />
          <Reveal delay={0.12}>
            <GeneralForm defaultType="construction" cta="Discuss Your Construction Project" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
