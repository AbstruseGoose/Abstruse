import Link from "next/link";
import { labPosts, projectTags } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const posts = process.env.DATABASE_URL
    ? ((await prisma.post.findMany({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }],
      })) as Array<{ slug: string; title: string; excerpt: string | null; tags: string[] }>).map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        tags: post.tags,
      }))
    : labPosts;
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Projects / Lab Log</p>
          <h1 className="mt-4 text-4xl font-semibold">Field builds and applied engineering</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Practical deployments, lessons learned, and what we are building next.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted">
          {projectTags.map((tag) => (
            <span key={tag} className="rounded-full border border-border/60 px-4 py-2">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/projects/${post.slug}`}
              className="rounded-2xl border border-border/60 bg-background/40 p-6 transition hover:border-accent/60"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border/60 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
