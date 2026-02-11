import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function ServicesAdminPage() {
  await requireAdmin();
  const services = (await prisma.service.findMany({ orderBy: [{ order: "asc" }] })) as Array<{
    id: string;
    title: string;
    slug: string;
    published: boolean;
  }>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Services</h1>
        </div>
        <Link className={buttonVariants({ size: "lg" })} href="/admin/services/new">
          Add service
        </Link>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{service.title}</h2>
                <p className="text-sm text-muted">/{service.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  {service.published ? "Published" : "Draft"}
                </span>
                <Link className={buttonVariants({ variant: "outline" })} href={`/admin/services/${service.id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </Card>
        ))}
        {!services.length ? (
          <Card>
            <p className="text-sm text-muted">No services created yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
