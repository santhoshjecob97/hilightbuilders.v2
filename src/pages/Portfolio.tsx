import { useState } from "react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { ProjectCard, type ProjectCardData } from "@/components/ProjectCard";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";
import { PROJECT_CATEGORIES } from "@contracts/leads";
import { PROJECTS } from "@/data/projects";

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

export default function Portfolio() {
  useSeo(
    "Project Portfolio — Interiors & Construction in Chennai | HILIGHT BUILDERS",
    "Explore residential and commercial interior projects, modular kitchens and construction by HILIGHT BUILDERS, Chennai.",
  );
  const [category, setCategory] = useState<string>("all");

  const queryResult = trpc.content.projects.list.useQuery(
    {
      ...(category !== "all" ? { category: category as never } : {}),
    },
    { retry: false }
  );

  const sourceProjects = (queryResult.data && queryResult.data.length > 0)
    ? (queryResult.data as unknown as typeof PROJECTS)
    : PROJECTS;

  const projects = sourceProjects.filter((p) => {
    return category === "all" || p.category === category;
  }) as (ProjectCardData & { sample?: boolean })[];

  return (
    <>
      <div className="pt-[72px]">
        <Section className="py-20 lg:py-28">
          <SectionHead
            eyebrow="Portfolio"
            title="Spaces Designed & Delivered."
            copy="Explore residential and commercial interiors, modular kitchens, bespoke living spaces, and turnkey construction delivered by HILIGHT BUILDERS across Chennai."
          />

          {/* Filters */}
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col gap-6 hairline-t pt-8">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {["all", ...PROJECT_CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`min-h-[44px] border px-4 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      category === c
                        ? "border-brand bg-brand text-charcoal font-semibold"
                        : "border-white/15 text-ash hover:border-white/40 hover:text-bone"
                    }`}
                  >
                    {c === "all" ? "All" : CATEGORY_LABELS[c]}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Grid — asymmetric staggered rhythm */}
          {queryResult.isLoading && projects.length === 0 ? (
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
