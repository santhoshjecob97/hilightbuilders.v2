import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  status: "completed" | "in_progress" | "concept";
  location?: string | null;
  coverImage?: string | null;
  sample?: boolean;
};

/** Portfolio card — image mask reveal, hover zoom, mono meta. */
export function ProjectCard({
  project,
  index = 0,
  aspect = "aspect-[4/3]",
}: {
  project: ProjectCardData;
  index?: number;
  aspect?: string;
}) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link to={`/portfolio/${project.slug}`} className="group block">
        <div className={`relative overflow-hidden bg-charcoal-deep ${aspect}`}>
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.3em] text-ash">
              Image coming soon
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-white/25 bg-charcoal/50 text-bone opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[18px] font-semibold leading-snug text-bone transition-colors group-hover:text-brand">
              {project.title}
            </h3>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
              {project.category.replace("-", " ")}
              {project.location ? ` · ${project.location}` : ""}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
