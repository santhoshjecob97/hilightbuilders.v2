import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Section, SectionHead } from "@/components/Reveal";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";

export default function Insights() {
  useSeo(
    "Insights — Interior Design Guides & Ideas | HILIGHT BUILDERS Chennai",
    "Practical guides on home interiors, modular kitchens, budgets, office planning and renovation from HILIGHT BUILDERS, Chennai.",
  );
  const { data: posts, isLoading } = trpc.content.posts.list.useQuery();

  return (
    <>
      <div className="pt-[72px]">
        <Section className="py-20 lg:py-28">
          <SectionHead
            eyebrow="Insights"
            title="Plan better, build smarter."
            copy="Practical notes on interiors, budgets and execution — written for homeowners and business owners, not for algorithms."
          />
          {isLoading ? (
            <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse bg-charcoal-deep" />
              ))}
            </div>
          ) : (
            <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {(posts ?? []).map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <Link to={`/insights/${post.slug}`} className="group block">
                    {post.coverImage && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-brand">
                      {post.category}
                    </p>
                    <h2 className="mt-3 font-display text-[20px] font-semibold leading-snug text-bone transition-colors group-hover:text-brand">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-ash">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ash group-hover:text-brand">
                      Read Article <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Section>
      </div>
      <CtaBand
        title="Reading is step zero."
        copy="When you're ready, step one is a consultation — tell us about your space."
      />
    </>
  );
}
