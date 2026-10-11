import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CommercialForm } from "@/components/EnquiryForms";
import { useSeo } from "@/components/Layout";
import { whatsappLink } from "@/config";

const SECTORS = [
  {
    img: "/images/office.jpg",
    title: "Corporate Offices",
    copy: "Workspaces planned around headcount, workflow and focus — from reception to meeting rooms.",
  },
  {
    img: "/images/retail.jpg",
    title: "Retail & Showrooms",
    copy: "Storefronts and displays that guide the eye, move stock and carry your brand.",
  },
  {
    img: "/images/restaurant.jpg",
    title: "Restaurants & Cafés",
    copy: "Dining atmospheres engineered for comfort, turnover and memorable evenings.",
  },
  {
    img: "/images/renovation.jpg",
    title: "Clinics, Salons & Gyms",
    copy: "Healthcare, wellness and fitness spaces built for hygiene, durability and flow.",
  },
];

const FACTORS = [
  ["Workflow first", "Layouts follow how your team and customers actually move — not a template."],
  ["Brand in the build", "Materials, lighting and detailing that carry your identity without gimmicks."],
  ["Customer experience", "Arrival, circulation, dwell zones and sightlines designed deliberately."],
  ["Space utilisation", "Every square foot justified — rent is too expensive for dead corners."],
  ["Durability", "Commercial-grade finishes chosen for footfall and maintenance reality."],
  ["Opening schedule", "Design, procurement and execution planned backwards from your opening date."],
];

export default function Commercial() {
  useSeo(
    "Commercial Interior Contractors in Chennai — Offices, Retail, Restaurants | HILIGHT BUILDERS",
    "Office, retail, restaurant, clinic and showroom interiors in Chennai. Planned around workflow, brand and your opening schedule. Discuss your commercial project.",
  );
  const wa = whatsappLink("commercial");

  return (
    <>
      <PageHero
        image="/images/office.jpg"
        alt="Modern commercial office interior with charcoal and wood palette"
        eyebrow="Commercial Interiors · Chennai"
        title="Spaces that work as hard as you do."
        copy="For business owners, founders, facility managers and retailers — offices, retail, clinics, restaurants and showrooms planned around workflow, brand, budget and your opening date."
        cta={{ to: "#enquiry", label: "Discuss Your Commercial Project" }}
      />

      {/* Sectors */}
      <Section className="py-24 lg:py-32">
        <SectionHead
          eyebrow="Sectors"
          title="Commercial spaces we build."
          copy="Each sector has its own enquiry path — tell us what you're building and we'll respond with relevant next steps."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 font-display text-[18px] font-semibold text-bone">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ash">{s.copy}</p>
                {wa.startsWith("http") ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand hover:text-bone"
                  >
                    Enquire on WhatsApp <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Link
                    to="#enquiry"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand hover:text-bone"
                  >
                    Enquire below <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Planning factors */}
      <Section className="bg-charcoal-deep py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              eyebrow="How We Plan"
              title="Commercial projects are planned around six realities."
              copy="A beautiful space that misses its opening date or fights its own workflow is a failed project. We plan around what actually decides success."
            />
          </div>
          <div className="space-y-0 border-t border-white/[0.07]">
            {FACTORS.map(([t, c], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="grid gap-1 border-b border-white/[0.07] py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <p className="font-display text-[16px] font-semibold text-bone">
                    <span className="mr-3 font-mono text-[11px] tracking-[0.2em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t}
                  </p>
                  <p className="text-[14px] leading-relaxed text-ash">{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Enquiry form */}
      <Section id="enquiry" className="py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHead
            eyebrow="Commercial Enquiry"
            title="Tell us about your project."
            copy="The more we know about your space, timeline and brand, the faster we can come back with a meaningful plan and estimate."
          />
          <Reveal delay={0.12}>
            <CommercialForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
