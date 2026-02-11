import Link from "next/link";
import { createPost } from "../actions";
import { buttonVariants, Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { requireAdmin } from "@/lib/auth-guard";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">New lab post</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/posts">
          Back
        </Link>
      </div>

      <Card>
        <form action={createPost} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required placeholder="LoRa pasture tracking" />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required placeholder="lora-pasture-tracking" />
            </label>
          </div>

          <label className="text-sm text-muted">
            Excerpt
            <Input name="excerpt" placeholder="Short summary for listing." />
          </label>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Body (Markdown)</p>
            <RichTextEditor name="body" initialValue="## Overview\n\nWrite the lab log entry here." />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-muted">
              Tags (comma separated)
              <Input name="tags" placeholder="LoRa, Homestead Tech" />
            </label>
            <label className="text-sm text-muted">
              Featured image URL
              <Input name="featuredImage" placeholder="https://..." />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input name="published" type="checkbox" className="h-4 w-4" />
              Published
            </label>
          </div>

          <Button type="submit" size="lg">
            Create post
          </Button>
        </form>
      </Card>
    </div>
  );
}
