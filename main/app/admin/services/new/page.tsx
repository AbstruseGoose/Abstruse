import Link from "next/link";
import { createService } from "../actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlockEditor } from "@/components/admin/block-editor";
import { requireAdmin } from "@/lib/auth-guard";

const defaultBlocks = [
  { id: "service-hero", type: "hero", data: { title: "Service headline", subtitle: "Short service summary." } },
  { id: "service-grid", type: "featureGrid", data: { title: "Deliverables", items: [] } },
];

const defaultFaqs = JSON.stringify(
  [{ question: "What is included?", answer: "Define scope, install, and support." }],
  null,
  2
);

export default async function NewServicePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">New service</h1>
        </div>
        <Link className={buttonVariants({ variant: "outline" })} href="/admin/services">
          Back
        </Link>
      </div>

      <Card>
        <form action={createService} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Title
              <Input name="title" required placeholder="WISP / Rural Connectivity" />
            </label>
            <label className="text-sm text-muted">
              Slug
              <Input name="slug" required placeholder="wisp-rural-connectivity" />
            </label>
          </div>

          <label className="text-sm text-muted">
            Excerpt
            <Input name="excerpt" placeholder="Short summary for listings." />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-muted">
              Icon
              <Input name="icon" placeholder="wifi" />
            </label>
            <label className="text-sm text-muted">
              Order
              <Input name="order" type="number" defaultValue={0} />
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input name="published" type="checkbox" className="h-4 w-4" />
              Published
            </label>
          </div>

          <div className="text-sm text-muted">
            <p className="text-sm text-muted">Content blocks</p>
            <BlockEditor name="contentBlocksJson" initialBlocks={defaultBlocks} />
          </div>

          <label className="text-sm text-muted">
            FAQs JSON
            <Textarea name="faqsJson" defaultValue={defaultFaqs} />
          </label>

          <Button type="submit" size="lg">
            Create service
          </Button>
        </form>
      </Card>
    </div>
  );
}
