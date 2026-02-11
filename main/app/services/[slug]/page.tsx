import { notFound } from "next/navigation";
import { services } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const dbService = process.env.DATABASE_URL
    ? await prisma.service.findUnique({ where: { slug: params.slug } })
    : null;
  const fallback = services.find((item) => item.slug === params.slug);
  const faqs = Array.isArray(dbService?.faqsJson)
    ? (dbService.faqsJson as Array<{ question: string; answer: string }> )
    : [];
  const service = dbService
    ? {
        title: dbService.title,
        summary: dbService.excerpt || "",
        problem: "",
        solution: "",
        deliverables: [],
        deployments: [],
        faqs,
      }
    : fallback;

  if (!service) {
    notFound();
  }

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Service</p>
          <h1 className="mt-4 text-4xl font-semibold">{service.title}</h1>
          <p className="mt-4 text-sm text-muted">{service.summary}</p>
        </div>

        {service.problem && service.solution ? (
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-lg font-semibold">Problem</h2>
              <p className="mt-3 text-sm text-muted">{service.problem}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-lg font-semibold">Solution</h2>
              <p className="mt-3 text-sm text-muted">{service.solution}</p>
            </div>
          </section>
        ) : null}

        {service.deliverables?.length ? (
          <section className="rounded-2xl border border-border/60 bg-surface/70 p-6">
            <h2 className="text-lg font-semibold">Deliverables</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {service.deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {service.deployments?.length ? (
          <section className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <h2 className="text-lg font-semibold">Typical deployments</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {service.deployments.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {service.faqs?.length ? (
          <section className="rounded-2xl border border-border/60 bg-surface/70 p-6">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <p className="text-sm font-semibold">{faq.question}</p>
                  <p className="mt-2 text-sm text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-border/60 bg-background/50 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Next step</p>
          <h2 className="mt-3 text-2xl font-semibold">Talk to a field tech</h2>
          <p className="mt-3 text-sm text-muted">
            We will map your comms path, assess hardware, and provide a clear deployment plan.
          </p>
          <button className="mt-6 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-2">
            Request a Quote
          </button>
        </section>
      </div>
    </main>
  );
}
