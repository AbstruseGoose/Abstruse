import Link from "next/link";
import { createPage } from "../actions";
import { buttonVariants, Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlockEditor } from "@/components/admin/block-editor";
import { requireAdmin } from "@/lib/auth-guard";

const defaultBlocks = [
  { id: "block-hero", type: "hero", data: { title: "Page headline", subtitle: "Short summary." } },
  { id: "block-features", type: "featureGrid", data: { title: "Feature grid", items: [] } },
];

export default async function NewPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">New page</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/pages">
          Back
        </Link>
      </div>

      <Card>
        <form action={createPage} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required placeholder="About" />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required placeholder="about" />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            <input name="published" type="checkbox" className="h-4 w-4" />
            Published
          </label>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Blocks</p>
            <BlockEditor name="blocksJson" initialBlocks={defaultBlocks} />
          </div>

          <Button type="submit" size="lg">
            Create page
          </Button>
        </form>
      </Card>
    </div>
  );
}
