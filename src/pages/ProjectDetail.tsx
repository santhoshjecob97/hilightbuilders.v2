import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal, Section } from "@/components/Reveal";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";
import { PROJECTS } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: dbProject, isLoading } = trpc.content.projects.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug, retry: false },
  );
  const staticProject = PROJECTS.find((p) => p.slug === slug);
  const project = dbProject ?? staticProject;

  useSeo(
    project ? `${project.title} | HILIGHT BUILDERS` : "Project | HILIGHT BUILDERS",
    project?.concept?.slice(0, 150) ?? "Interior design and construction project by HILIGHT BUILDERS, Chennai.",
  );

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center font-mono text-[12px] uppercase tracking-[0.3em] text-ash">Loading…</div>;
  }
  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="display-3 text-bone">Project not found.</p>
        <Link to="/portfolio" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-[60svh] items-end overflow-hidden pt-[72px]">
        {project.coverImage && (
          <img src={project.coverImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-8 lg:px-12">
          <p className="eyebrow capitalize">{project.category.replace("-", " ")}</p>
          <h1 className="display-1 mt-4 max-w-4xl !text-[clamp(2rem,5.5vw,4.2rem)] text-bone">
            {project.title}
          </h1>
        </div>
      </div>

      <Section className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <dl className="space-y-6 hairline-t pt-8">
              {[
                ["Project Type", project.category.replace("-", " ")],
                ["Location", project.location],
                ["Area", project.area],
              ]
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-ash">{k}</dt>
                    <dd className="mt-1.5 font-display text-[16px] font-semibold capitalize text-bone">{v}</dd>
                  </div>
                ))}
            </dl>
          </Reveal>
          <div className="space-y-10">
            {project.scope && (
              <Reveal>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand">Scope</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-bone/85">{project.scope}</p>
              </Reveal>
            )}
            {project.concept && (
              <Reveal delay={0.08}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand">Design Concept</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-bone/85">{project.concept}</p>
              </Reveal>
            )}
            {project.materials && (
              <Reveal delay={0.16}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand">Material Direction</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-bone/85">{project.materials}</p>
              </Reveal>
            )}
          </div>
        </div>
        <Reveal className="mt-16">
          <Link to="/portfolio" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" /> All Projects
          </Link>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
