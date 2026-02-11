import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlockEditor } from "@/components/admin/block-editor";
import { updateService, deleteService } from "../actions";
import { notFound } from "next/navigation";

export default async function ServiceEditPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const service = await prisma.service.findUnique({ where: { id: params.id } });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Edit service</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/services">
          Back
        </Link>
      </div>

      <Card>
        <form action={updateService.bind(null, service.id)} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required defaultValue={service.title} />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required defaultValue={service.slug} />
            </label>
          </div>

          <label className="text-sm text-muted">
            Excerpt
            <Input name="excerpt" defaultValue={service.excerpt ?? ""} />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-muted">
              Icon
              <Input name="icon" defaultValue={service.icon ?? ""} />
            </label>
            <label className="text-sm text-muted">
              Order
              <Input name="order" type="number" defaultValue={service.order} />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input name="published" type="checkbox" className="h-4 w-4" defaultChecked={service.published} />
              Published
            </label>
          </div>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Content blocks</p>
            <BlockEditor
              name="contentBlocksJson"
              initialBlocks={service.contentBlocksJson as Array<{ id: string; type: string; data: unknown }>}
            />
          </div>

          <label className="text-sm text-muted">
            FAQs JSON
            <Textarea name="faqsJson" defaultValue={JSON.stringify(service.faqsJson, null, 2)} />
          </label>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg">Save changes</Button>
            <Button formAction={deleteService.bind(null, service.id)} variant="outline">
              Delete
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
