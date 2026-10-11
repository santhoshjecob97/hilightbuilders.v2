import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ResidentialForm } from "@/components/EnquiryForms";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";
import { PROJECTS } from "@/data/projects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STYLES = [
  {
    img: "/images/living-room.jpg",
    title: "Warm Minimal",
    copy: "Natural woods, quiet palettes and layered light — spaces that breathe.",
  },
  {
    img: "/images/bedroom.jpg",
    title: "Contemporary Comfort",
    copy: "Soft textiles, tailored storage and calm, hotel-like bedrooms.",
  },
  {
    img: "/images/kitchen.jpg",
    title: "Modern Craft",
    copy: "Handleless kitchens, honest materials and detailing that lasts.",
  },
];

const ROOMS = [
  ["Complete Home Interiors", "End-to-end design and execution for apartments, villas and independent houses."],
  ["Living Rooms", "Layouts, media walls, lighting and furniture coordination for how you actually host."],
  ["Modular Kitchens", "Work-triangle planning, shutter finishes, hardware and counters matched to your cooking."],
  ["Bedrooms", "Wardrobes, headboards, lighting and calm material palettes for real rest."],
  ["Wardrobes & Storage", "Lofts, walk-ins and utility storage planned to the centimetre."],
  ["TV & Pooja Units", "Custom units that respect both your media and your traditions."],
  ["Lighting & False Ceilings", "Cove, task and accent lighting layered with clean ceiling design."],
  ["Home Offices", "Focused, ergonomic work corners that disappear after hours."],
  ["Renovation", "Older homes reworked — structure, services and finishes upgraded together."],
];

const MATERIALS = [
  ["Shutters & Surfaces", "Laminates, acrylic, membrane, veneer and PU — chosen for use, not just looks."],
  ["Counters & Stone", "Quartz and granite options with honest maintenance guidance."],
  ["Hardware", "Soft-close systems and fittings that decide how your kitchen feels daily."],
  ["Lighting", "Warm-to-neutral layering planned room by room."],
];

const FAQS = [
  {
    q: "How much do home interiors cost in Chennai?",
    a: "Cost depends on scope, materials and finishes. After understanding your requirements we prepare a detailed, line-item estimate mapped to your budget band — so you decide where to invest and where to save before work begins.",
  },
  {
    q: "How long does a full home interior project take?",
    a: "Timelines depend on scope and site readiness. During the design stage we share a realistic schedule covering design, procurement and execution, and we keep you updated as work progresses.",
  },
  {
    q: "Can you work with my existing furniture?",
    a: "Yes. We routinely design around pieces you want to keep, and plan new furniture and storage to complement them.",
  },
  {
    q: "Do you take up partial work — only a kitchen or wardrobes?",
    a: "Yes. Room-by-room scopes are welcome. You can start with a kitchen or wardrobes and extend later.",
  },
  {
    q: "How do I share my floor plan?",
    a: "Mention it in the enquiry form — our team will collect your floor plan when we connect, and use it for the first layout discussion.",
  },
];

export default function Residential() {
  useSeo(
    "Home Interiors in Chennai — Residential Interior Designers | HILIGHT BUILDERS",
    "Complete home interiors, modular kitchens, wardrobes and renovation in Chennai. Transparent estimates and a defined design-to-handover process. Book a consultation.",
  );
  const { data } = trpc.content.projects.list.useQuery({ category: "residential" }, { retry: false });
  const fallback = trpc.content.projects.list.useQuery(undefined, { enabled: !data, retry: false });
  const residentialStatic = PROJECTS.filter((p) =>
    ["residential", "kitchens", "living-rooms", "bedrooms"].includes(p.category)
  );
  const projects = (((data?.length ? data : fallback.data) && (data?.length || fallback.data?.length) ? (data?.length ? data : fallback.data) : residentialStatic) ?? [])
    .filter((p) => ["residential", "kitchens", "living-rooms", "bedrooms"].includes(p.category))
    .slice(0, 3) as ProjectCardData[];

  return (
    <>
      <PageHero
        image="/images/living-room.jpg"
        alt="Premium residential living room interior in warm minimal style"
        eyebrow="Residential Interiors · Chennai"
        title="Homes designed around how you live."
        copy="For apartment owners, villa owners and new homeowners — complete interiors, room-by-room services and renovation, with transparent scope and a defined process."
        cta={{ to: "#consultation", label: "Discuss Your Home Interiors" }}
      />

      {/* Interior styles */}
      <Section className="py-24 lg:py-32">
        <SectionHead
          eyebrow="Interior Styles"
          title="Directions we love to build."
          copy="Every home is custom — these are starting points we refine around your taste, budget and the light your home gets."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STYLES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 font-display text-[20px] font-semibold text-bone">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ash">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Room by room */}
      <Section className="bg-charcoal-deep py-24 lg:py-32">
        <SectionHead
          eyebrow="Room by Room"
          title="Services for every corner of your home."
        />
        <div className="mt-14 grid gap-px bg-white/[0.07] hairline sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map(([t, c], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06} className="bg-charcoal-deep">
              <div className="h-full p-7">
                <span className="font-mono text-[11px] tracking-[0.3em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-bone">{t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ash">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Materials */}
      <Section className="py-24 lg:py-32">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden">
              <img
                src="/images/wardrobe.jpg"
                alt="Premium wardrobe interior with warm wood and integrated lighting"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <SectionHead
              eyebrow="Materials & Finishes"
              title="Honest guidance on what goes into your home."
              copy="We walk you through material options with samples in hand — what lasts, what needs care, and what fits your budget."
            />
            <div className="mt-10 space-y-6 hairline-t pt-8">
              {MATERIALS.map(([t, c], i) => (
                <Reveal key={t} delay={i * 0.06}>
                  <div className="flex gap-5">
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-brand" />
                    <div>
                      <p className="font-display font-semibold text-bone">{t}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-ash">{c}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Featured residential projects */}
      {projects.length > 0 && (
        <Section className="pb-24">
          <SectionHead eyebrow="Selected Work" title="Residential design directions." />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section className="py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHead
            eyebrow="FAQ"
            title="Questions homeowners ask us."
            copy="Straight answers before you commit to anything."
          />
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                  <AccordionTrigger className="min-h-[56px] text-left font-display text-[16px] font-semibold text-bone hover:text-brand hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] leading-relaxed text-ash">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* Consultation form */}
      <Section id="consultation" className="bg-charcoal-deep py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHead
            eyebrow="Book a Consultation"
            title="Tell us about your home."
            copy="Share a few details and our team will call you to schedule a consultation. No obligation — just a clear conversation about scope, budget and next steps."
          />
          <Reveal delay={0.12}>
            <ResidentialForm />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Prefer to talk it through first?"
        copy="Send us a WhatsApp message or drop an email — we'll take it from there."
        primary={{ to: "/contact", label: "Contact Us" }}
      />
    </>
  );
}
