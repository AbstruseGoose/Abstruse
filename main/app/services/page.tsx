import Link from "next/link";
import { services } from "@/lib/content";
import { CapabilitiesFinder } from "@/components/site/capabilities-finder";
import { BlockRenderer } from "@/components/blocks";
import { loadPageBlocks } from "@/lib/page-builder";
import { servicesBlocks } from "@/lib/page-blocks";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const blocks = await loadPageBlocks("services", servicesBlocks);
  const serviceList: Array<{ title: string; slug: string; summary: string }> =
    process.env.DATABASE_URL
      ? ((await prisma.service.findMany({
          where: { published: true },
          orderBy: [{ order: "asc" }],
        })) as Array<{ title: string; slug: string; excerpt: string | null }>).map((service) => ({
          title: service.title,
          slug: service.slug,
          summary: service.excerpt || "",
        }))
      : services.map((service) => ({
          title: service.title,
          slug: service.slug,
          summary: service.summary,
        }));

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <BlockRenderer blocks={blocks} />

        <CapabilitiesFinder services={serviceList} />

        <div className="grid gap-6 md:grid-cols-2">
          {serviceList.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-2xl border border-border/60 bg-background/40 p-6 transition hover:border-accent/60"
            >
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm text-muted">{service.summary}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent">Explore service</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
