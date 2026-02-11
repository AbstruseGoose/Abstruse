import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { updatePost, deletePost } from "../actions";
import { notFound } from "next/navigation";

export default async function PostEditPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const post = await prisma.post.findUnique({ where: { id: params.id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit post</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/posts">
          Back
        </Link>
      </div>

      <Card>
        <form action={updatePost.bind(null, post.id)} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required defaultValue={post.title} />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required defaultValue={post.slug} />
            </label>
          </div>

          <label className="text-sm text-muted">
            Excerpt
            <Input name="excerpt" defaultValue={post.excerpt ?? ""} />
          </label>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Body (Markdown)</p>
            <RichTextEditor name="body" initialValue={post.body} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-muted">
              Tags (comma separated)
              <Input name="tags" defaultValue={post.tags.join(", ")} />
            </label>
            <label className="text-sm text-muted">
              Featured image URL
              <Input name="featuredImage" defaultValue={post.featuredImage ?? ""} />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input name="published" type="checkbox" className="h-4 w-4" defaultChecked={post.published} />
              Published
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">Save changes</Button>
            <Button formAction={deletePost.bind(null, post.id)} variant="outline">
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
