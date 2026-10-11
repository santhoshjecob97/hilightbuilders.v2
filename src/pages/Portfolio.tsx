import { useState } from "react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@contracts/leads";

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  kitchens: "Kitchens",
  "living-rooms": "Living Rooms",
  bedrooms: "Bedrooms",
  offices: "Offices",
  retail: "Retail",
  renovation: "Renovation",
};

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  concept: "Concept Visualisation",
};

export default function Portfolio() {
  useSeo(
    "Project Portfolio — Interiors & Construction in Chennai | HILIGHT BUILDERS",
    "Explore residential and commercial interior projects, work in progress and clearly labelled concept visualisations by HILIGHT BUILDERS, Chennai.",
  );
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const { data, isLoading } = trpc.content.projects.list.useQuery({
    ...(category !== "all" ? { category: category as never } : {}),
    ...(status !== "all" ? { status: status as never } : {}),
  });
  const projects = (data ?? []) as (ProjectCardData & { sample: boolean })[];

  return (
    <>
      <div className="pt-[72px]">
        <Section className="py-20 lg:py-28">
          <SectionHead
            eyebrow="Portfolio"
            title="Work, in progress and imagination — clearly labelled."
            copy="Every project carries an honest status: completed work, sites in progress, or concept visualisations that show design direction. Completed projects are published after handover and client approval."
          />

          {/* Filters */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col gap-6 hairline-t pt-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {["all", ...PROJECT_CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`min-h-[44px] border px-4 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      category === c
                        ? "border-brand bg-brand text-charcoal"
                        : "border-white/15 text-ash hover:border-white/40 hover:text-bone"
                    }`}
                  >
                    {c === "all" ? "All" : CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                {["all", ...PROJECT_STATUSES].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    aria-pressed={status === s}
                    className={`min-h-[44px] border px-4 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      status === s
                        ? "border-brand text-brand"
                        : "border-white/15 text-ash hover:border-white/40 hover:text-bone"
                    }`}
                  >
                    {s === "all" ? "Any Status" : STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Grid — asymmetric staggered rhythm */}
          {isLoading ? (
            <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse bg-charcoal-deep" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="mt-16 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-ash">
              No projects match these filters yet.
            </p>
          ) : (
            <div className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <div key={p.slug} className={i % 3 === 1 ? "lg:mt-14" : ""}>
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
      <CtaBand
        title="Want your space in this portfolio?"
        copy="Book a consultation and let's define what your project could become."
      />
    </>
  );
}
