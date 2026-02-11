import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function PostsAdminPage() {
  await requireAdmin();
  const posts = await prisma.post.findMany({ orderBy: [{ createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Projects / Lab Log</h1>
        </div>
        <Link className={buttonVariants({ size: "lg" })} href="/admin/posts/new">
          Add post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-muted">/{post.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  {post.published ? "Published" : "Draft"}
                </span>
                <Link className={buttonVariants({ variant: "outline" })} href={`/admin/posts/${post.id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </Card>
        ))}
        {!posts.length ? (
          <Card>
            <p className="text-sm text-muted">No posts created yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
