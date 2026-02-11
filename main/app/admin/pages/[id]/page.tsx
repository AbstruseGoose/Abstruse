import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlockEditor } from "@/components/admin/block-editor";
import { updatePage, deletePage } from "../actions";
import { notFound } from "next/navigation";

export default async function PageEditPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const page = await prisma.page.findUnique({ where: { id: params.id } });

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit page</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/pages">
          Back
        </Link>
      </div>

      <Card>
        <form action={updatePage.bind(null, page.id)} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required defaultValue={page.title} />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required defaultValue={page.slug} />
            </label>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            <input name="published" type="checkbox" className="h-4 w-4" defaultChecked={page.published} />
            Published
          </label>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Blocks</p>
            <BlockEditor name="blocksJson" initialBlocks={page.blocksJson as Array<{ id: string; type: string; data: unknown }>} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">Save changes</Button>
            <Button formAction={deletePage.bind(null, page.id)} variant="outline">
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
