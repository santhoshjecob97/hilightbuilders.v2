import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal, Section } from "@/components/Reveal";
import { CtaBand } from "@/pages/Home";
import { useSeo } from "@/components/Layout";
import { trpc } from "@/providers/trpc";

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = trpc.content.posts.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug, retry: false },
  );

  useSeo(
    post ? `${post.title} | HILIGHT BUILDERS Insights` : "Insights | HILIGHT BUILDERS",
    post?.excerpt ?? "Interior design insights from HILIGHT BUILDERS, Chennai.",
  );

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center font-mono text-[12px] uppercase tracking-[0.3em] text-ash">Loading…</div>;
  }
  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="display-3 text-bone">Article not found.</p>
        <Link to="/insights" className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="pt-[72px]">
        <Section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">{post.category}</p>
            <h1 className="display-2 mt-5 text-bone">{post.title}</h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          {post.coverImage && (
            <Reveal className="mx-auto mt-12 max-w-5xl">
              <img src={post.coverImage} alt={post.title} className="aspect-[16/8] w-full object-cover" />
            </Reveal>
          )}
          <div className="mx-auto mt-14 max-w-3xl space-y-6">
            {(post.content ?? "").split(/\n+/).filter(Boolean).map((para, i) => (
              <p key={i} className="text-[16.5px] leading-[1.85] text-bone/85">
                {para}
              </p>
            ))}
            {post.sample && (
              <p className="border border-brand/30 bg-brand/5 p-4 font-mono text-[11px] leading-relaxed tracking-[0.06em] text-ash">
                Sample article — placeholder content demonstrating the Insights format, to be
                replaced with editorial approved by HILIGHT BUILDERS.
              </p>
            )}
            <Link to="/insights" className="btn-ghost mt-8">
              <ArrowLeft className="h-4 w-4" /> All Articles
            </Link>
          </div>
        </Section>
      </div>
      <CtaBand />
    </>
  );
}
