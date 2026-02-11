import { notFound } from "next/navigation";
import { labPosts } from "@/lib/content";
import { prisma } from "@/lib/db";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const dbPost = process.env.DATABASE_URL
    ? await prisma.post.findUnique({ where: { slug: params.slug } })
    : null;
  const fallback = labPosts.find((item) => item.slug === params.slug);
  const post = dbPost
    ? {
        title: dbPost.title,
        excerpt: dbPost.excerpt || "",
        tags: dbPost.tags,
        body: dbPost.body,
      }
    : fallback
      ? { ...fallback, body: "" }
      : null;

  if (!post) {
    notFound();
  }

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Lab Log</p>
          <h1 className="mt-4 text-4xl font-semibold">{post.title}</h1>
          <p className="mt-4 text-sm text-muted">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/60 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {post.body ? (
          <section className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <h2 className="text-xl font-semibold">Project details</h2>
            <div className="mt-4 space-y-4 text-sm text-muted">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className="text-lg font-semibold text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-semibold text-foreground">{children}</h3>,
                  p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
                  a: ({ children, href }) => (
                    <a href={href} className="text-accent underline underline-offset-4">
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-surface/70 px-2 py-1 text-xs text-foreground">
                      {children}
                    </code>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </section>
        ) : (
          <>
            <section className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-xl font-semibold">What we learned</h2>
              <p className="mt-3 text-sm text-muted">
                Field conditions require margin. We validated power budgets, adjusted antenna
                alignment, and documented failure points for long-term stability.
              </p>
            </section>

            <section className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-xl font-semibold">Next steps</h2>
              <p className="mt-3 text-sm text-muted">
                We are building a hardened monitoring kit to reduce truck rolls and improve
                proactive alerting.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
