import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";
import { site, whatsappLink } from "@/config";

/* ---------------------------------- hero ---------------------------------- */

/** Architectural line-drawing that draws itself in (bottom-right accent). */
function HeroDrawing() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="pointer-events-none absolute -right-6 bottom-24 hidden w-[300px] opacity-40 md:block lg:right-10"
      aria-hidden="true"
    >
      {[
        "M20 200 L20 80 L120 80 L120 200",
        "M120 120 L240 120 L240 200",
        "M20 80 L70 40 L170 40 L120 80",
        "M170 40 L290 40 L240 120",
        "M240 120 L290 40 L290 160 L240 200",
        "M20 200 L300 200",
        "M45 200 L45 110 L70 110 L70 200",
        "M145 200 L145 145 L175 145 L175 200",
        "M200 200 L200 145 L222 145 L222 200",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#F5F3EF"
          strokeWidth="1"
          strokeDasharray="1200"
          strokeDashoffset="1200"
          style={{ animation: `line-draw 2.4s ${0.3 + i * 0.25}s ease-out forwards` }}
        />
      ))}
      <path
        d="M20 214 L300 214"
        fill="none"
        stroke="#F39800"
        strokeWidth="1.5"
        strokeDasharray="1200"
        strokeDashoffset="1200"
        style={{ animation: "line-draw 1.8s 2.6s ease-out forwards" }}
      />
    </svg>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
  };
  const line = {
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Cinematic backdrop with scroll parallax */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        <img
          src="/images/hero.jpg"
          alt="Modern villa at dusk designed and delivered by HILIGHT BUILDERS"
          className="h-[112%] w-full scale-[1.06] object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />
      <HeroDrawing />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-24 pt-40 sm:px-8 lg:px-12"
        style={reduce ? undefined : { y: contentY, opacity: fade }}
      >
        <motion.p
          className="eyebrow"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {site.city}
        </motion.p>

        <motion.h1
          className="display-1 mt-6 max-w-5xl text-bone"
          variants={stagger}
          initial={reduce ? undefined : "hidden"}
          animate="show"
        >
          {["Spaces That Inspire.", "Built on Trust."].map((text) => (
            <span key={text} className="block overflow-hidden pb-1">
              <motion.span className="block" variants={line}>
                {text.includes("Trust") ? (
                  <>
                    Built on <span className="text-brand">Trust.</span>
                  </>
                ) : (
                  text
                )}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-7 max-w-xl text-[16px] leading-relaxed text-bone/75"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Residential and commercial design, interiors and turnkey execution tailored to your
          space, requirements and budget.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <Link to="/contact#consultation" className="btn-primary">
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/portfolio" className="btn-ghost">
            Explore Our Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">Scroll</span>
        <span className="h-8 w-px overflow-hidden bg-white/20">
          <motion.span
            className="block h-full w-full bg-brand"
            animate={reduce ? undefined : { y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
      </div>
    </div>
  );
}

/* --------------------------------- marquee --------------------------------- */

const TICKER = [
  "Residential Interiors",
  "Commercial Interiors",
  "Construction",
  "Renovation",
  "Turnkey Solutions",
];

function Marquee() {
  const row = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden py-5 hairline-t hairline-b" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-10">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-[15px] font-medium uppercase tracking-[0.22em] text-bone/60">
              {item}
            </span>
            <span className="h-2 w-2 rotate-45 bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ path selector ------------------------------ */

function PathSelector() {
  const paths = [
    {
      to: "/residential-interiors",
      img: "/images/living-room.jpg",
      alt: "Premium residential living room interior",
      kicker: "For Homeowners",
      title: "Residential Interiors",
      copy: "Complete home interiors, kitchens, bedrooms and renovations — planned room by room.",
    },
    {
      to: "/commercial-interiors",
      img: "/images/office.jpg",
      alt: "Modern commercial office interior",
      kicker: "For Businesses",
      title: "Commercial Interiors",
      copy: "Offices, retail, clinics and restaurants — planned around brand, workflow and opening day.",
    },
  ];
  return (
    <Section className="py-24 lg:py-32">
      <div className="grid gap-6 md:grid-cols-2">
        {paths.map((p, i) => (
          <Reveal key={p.to} delay={i * 0.12}>
            <Link to={p.to} className="group relative block overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden lg:aspect-[16/11]">
                <img
                  src={p.img}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 lg:p-10">
                <p className="eyebrow">{p.kicker}</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="display-3 text-bone">{p.title}</h3>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/25 text-bone transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-charcoal">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-bone/70">{p.copy}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- intro ---------------------------------- */

function Intro() {
  return (
    <Section className="py-24 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            eyebrow="Hilight Builders"
            title="Design and execution, coordinated under one roof."
            copy="HILIGHT BUILDERS is a Chennai-based design and build studio for residential and commercial spaces. We bring design intent, material clarity and site execution together — so what is drawn is what gets built."
          />
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-5 hairline-t pt-8">
              {[
                ["Transparent scope", "Detailed scope and estimate before work begins — no vague allowances."],
                ["Single point of contact", "One coordinated team from consultation to handover."],
                ["Documented process", "A defined design-to-handover journey you can track."],
              ].map(([t, c]) => (
                <div key={t} className="flex gap-5">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-brand" />
                  <div>
                    <p className="font-display font-semibold text-bone">{t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ash">{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <Link to="/about" className="btn-ghost mt-10">
              About the Studio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="relative">
          <div className="overflow-hidden">
            <img
              src="/images/blueprint.jpg"
              alt="Architectural drawings and material samples on a designer's desk"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden border border-brand/40 bg-charcoal px-6 py-5 md:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand">
              {site.tagline}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ----------------------------- featured projects ---------------------------- */

function FeaturedProjects() {
  const { data } = trpc.content.projects.list.useQuery({ featured: true });
  const projects = (data ?? []).slice(0, 4) as (ProjectCardData & { sample: boolean })[];

  return (
    <Section className="py-24 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Selected Work"
          title="Spaces we're shaping."
          copy="A preview of current concepts and design directions. Completed project photography is published as projects are handed over and approved."
        />
        <Reveal delay={0.15}>
          <Link to="/portfolio" className="btn-ghost">
            Full Portfolio <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      {projects.length > 0 && (
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <ProjectCard project={p} index={i} aspect="aspect-[3/4]" />
            </div>
          ))}
        </div>
      )}
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-ash/60">
        Concept visualisations are labelled — they represent design direction, not completed sites.
      </p>
    </Section>
  );
}

/* --------------------------------- services -------------------------------- */

const SERVICES = [
  {
    n: "01",
    title: "Residential Interiors",
    copy: "Complete home interiors, modular kitchens, wardrobes and room-by-room design.",
    to: "/residential-interiors",
  },
  {
    n: "02",
    title: "Commercial Interiors",
    copy: "Offices, retail, restaurants, clinics and showrooms built around your brand.",
    to: "/commercial-interiors",
  },
  {
    n: "03",
    title: "Construction",
    copy: "Residential construction and design-build coordination with transparent scope.",
    to: "/construction",
  },
  {
    n: "04",
    title: "Renovation",
    copy: "Homes and commercial spaces reworked with minimal disruption.",
    to: "/construction",
  },
  {
    n: "05",
    title: "Turnkey Solutions",
    copy: "One accountable team from first sketch to final handover.",
    to: "/process",
  },
];

function Services() {
  return (
    <Section className="py-24 lg:py-32">
      <SectionHead eyebrow="What We Do" title="Core services." />
      <div className="mt-14 border-t border-white/[0.07]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <Link
              to={s.to}
              className="group grid items-center gap-2 border-b border-white/[0.07] py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_2fr_48px] md:gap-8 md:py-9"
            >
              <span className="font-mono text-[12px] tracking-[0.3em] text-brand">{s.n}</span>
              <h3 className="font-display text-[22px] font-semibold text-bone transition-colors group-hover:text-brand md:text-[28px]">
                {s.title}
              </h3>
              <p className="max-w-md text-[14px] leading-relaxed text-ash md:justify-self-end md:text-right">
                {s.copy}
              </p>
              <ArrowUpRight className="hidden h-6 w-6 text-ash transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand md:block" />
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* --------------------------------- process --------------------------------- */

const HOME_STEPS = [
  {
    n: "PHASE 01",
    title: "Consultation",
    copy: "We listen first — requirements, budget band, timeline and how you use your space.",
  },
  {
    n: "PHASE 02",
    title: "Design",
    copy: "Concepts, layouts and material direction, refined with your feedback.",
  },
  {
    n: "PHASE 03",
    title: "Estimation",
    copy: "A detailed scope and transparent estimate you can interrogate, line by line.",
  },
  {
    n: "PHASE 04",
    title: "Execution",
    copy: "Procurement, site work and quality checks coordinated by one team.",
  },
  {
    n: "PHASE 05",
    title: "Handover",
    copy: "Snag-list review, documentation and a space ready to live or work in.",
  },
];

function Process() {
  return (
    <Section className="bg-charcoal-deep py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="Design to Handover"
            title="A process you can follow, start to finish."
            copy="Every project moves through five clear phases. The exact stages depend on your contracted scope — the full twelve-step journey is documented on our process page."
          />
          <Reveal delay={0.2}>
            <Link to="/process" className="btn-primary mt-10">
              See the Full Process <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <ProcessTimeline steps={HOME_STEPS} />
      </div>
    </Section>
  );
}

/* ---------------------------------- why us --------------------------------- */

const WHY = [
  {
    title: "Scope before promises",
    copy: "You see exactly what is included, what is optional and what it costs — before committing.",
  },
  {
    title: "Design that respects budget",
    copy: "Material and finish choices are mapped to your budget band from day one.",
  },
  {
    title: "Coordinated execution",
    copy: "Carpentry, electrical, painting and finishing sequenced by one accountable team.",
  },
  {
    title: "Honest labelling",
    copy: "Concept renders are labelled as concepts. Completed work is shown only after handover.",
  },
];

function WhyUs() {
  return (
    <Section className="py-24 lg:py-32">
      <SectionHead eyebrow="Why Hilight" title="Built on trust, measured in handovers." />
      <div className="mt-14 grid gap-px bg-white/[0.07] hairline sm:grid-cols-2 lg:grid-cols-4">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.07} className="bg-charcoal">
            <div className="flex h-full flex-col p-8">
              <span className="font-mono text-[12px] tracking-[0.3em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-[19px] font-semibold leading-snug text-bone">
                {w.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ash">{w.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- CTA band -------------------------------- */

export function CtaBand({
  title = "Let's talk about your space.",
  copy = "Book a consultation — we'll understand your requirements, walk you through our process and outline the next steps.",
  primary = { to: "/contact#consultation", label: "Book a Consultation" },
}: {
  title?: string;
  copy?: string;
  primary?: { to: string; label: string };
}) {
  const wa = whatsappLink("general");
  return (
    <Section className="py-24 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden border border-brand/30 bg-gradient-to-br from-charcoal-deep to-charcoal px-7 py-14 md:px-14 lg:px-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rotate-45 border-[28px] border-brand/10"
            aria-hidden
          />
          <p className="eyebrow">Start a Conversation</p>
          <h2 className="display-2 mt-5 max-w-2xl text-bone">{title}</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ash">{copy}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={primary.to} className="btn-primary">
              {primary.label} <ArrowRight className="h-4 w-4" />
            </Link>
            {wa.startsWith("http") ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-track="whatsapp">
                WhatsApp Us
              </a>
            ) : (
              <Link to={wa} className="btn-ghost" data-track="whatsapp">
                WhatsApp Us
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function Home() {
  useSeo(
    "HILIGHT BUILDERS — Interior Designers & Turnkey Contractors in Chennai",
    "Residential and commercial interiors, construction and turnkey solutions in Chennai. Spaces that inspire, built on trust. Book a consultation with HILIGHT BUILDERS.",
  );
  return (
    <>
      <Hero />
      <Marquee />
      <PathSelector />
      <Intro />
      <FeaturedProjects />
      <Services />
      <Process />
      <WhyUs />
      <CtaBand />
    </>
  );
}
