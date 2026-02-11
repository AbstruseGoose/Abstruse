import Link from "next/link";

type BlockBase = {
  id?: string;
  type: string;
};

type HeroBlock = BlockBase & {
  type: "hero";
  data: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
};

type FeatureGridBlock = BlockBase & {
  type: "featureGrid";
  data: {
    title?: string;
    items: { title: string; description: string }[];
  };
};

type SplitSectionBlock = BlockBase & {
  type: "splitSection";
  data: {
    title: string;
    body: string;
    bullets?: string[];
  };
};

type FaqBlock = BlockBase & {
  type: "faq";
  data: {
    title?: string;
    items: { question: string; answer: string }[];
  };
};

type CtaBlock = BlockBase & {
  type: "cta";
  data: {
    title: string;
    body: string;
    cta: { label: string; href: string };
  };
};

type TestimonialsBlock = BlockBase & {
  type: "testimonials";
  data: {
    title?: string;
    items: { quote: string; name: string; role?: string }[];
  };
};

type GalleryBlock = BlockBase & {
  type: "gallery";
  data: {
    title?: string;
    items: { label: string }[];
  };
};

type StatsBlock = BlockBase & {
  type: "stats";
  data: {
    title?: string;
    items: { label: string; value: string }[];
  };
};

type LogoCloudBlock = BlockBase & {
  type: "logoCloud";
  data: {
    title?: string;
    logos: string[];
  };
};

type StepsBlock = BlockBase & {
  type: "steps";
  data: {
    title?: string;
    items: { title: string; description: string }[];
  };
};

type ContactStripBlock = BlockBase & {
  type: "contactStrip";
  data: {
    title: string;
    body: string;
    phone: string;
    email: string;
  };
};

type ProjectCardsBlock = BlockBase & {
  type: "projectCards";
  data: {
    title?: string;
    items: { title: string; description: string }[];
  };
};

export type ContentBlock =
  | HeroBlock
  | FeatureGridBlock
  | SplitSectionBlock
  | FaqBlock
  | CtaBlock
  | TestimonialsBlock
  | GalleryBlock
  | StatsBlock
  | LogoCloudBlock
  | StepsBlock
  | ContactStripBlock
  | ProjectCardsBlock;

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-12">
      {blocks.map((block, index) => (
        <section key={block.id ?? `${block.type}-${index}`}>
          {renderBlock(block)}
        </section>
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case "hero":
      return (
        <div className="rounded-[32px] border border-border/60 bg-surface/80 p-8 shadow-[0_40px_80px_rgba(4,10,18,0.5)] md:p-14">
          {block.data.eyebrow ? (
            <p className="text-xs uppercase tracking-[0.4em] text-muted">{block.data.eyebrow}</p>
          ) : null}
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            {block.data.title}
          </h1>
          {block.data.subtitle ? (
            <p className="mt-6 max-w-2xl text-base text-muted md:text-lg">
              {block.data.subtitle}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {block.data.primaryCta ? (
              <Link
                href={block.data.primaryCta.href}
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-2"
              >
                {block.data.primaryCta.label}
              </Link>
            ) : null}
            {block.data.secondaryCta ? (
              <Link
                href={block.data.secondaryCta.href}
                className="rounded-xl border border-border/70 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
              >
                {block.data.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      );
    case "featureGrid":
      return (
        <div>
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {block.data.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-surface/60 p-6">
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "splitSection":
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-surface/70 p-6">
            <h2 className="text-2xl font-semibold">{block.data.title}</h2>
            <p className="mt-4 text-sm text-muted">{block.data.body}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <ul className="space-y-3 text-sm text-muted">
              {block.data.bullets?.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "faq":
      return (
        <div className="rounded-2xl border border-border/60 bg-surface/70 p-6">
          {block.data.title ? (
            <h2 className="text-2xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-4 space-y-4">
            {block.data.items.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-border/60 bg-background/40 p-4">
                <p className="text-sm font-semibold">{faq.question}</p>
                <p className="mt-2 text-sm text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "cta":
      return (
        <div className="rounded-[28px] border border-border/60 bg-surface/80 p-8">
          <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          <p className="mt-3 text-sm text-muted">{block.data.body}</p>
          <Link
            href={block.data.cta.href}
            className="mt-6 inline-flex rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent-2"
          >
            {block.data.cta.label}
          </Link>
        </div>
      );
    case "testimonials":
      return (
        <div>
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {block.data.items.map((item) => (
              <div key={item.quote} className="rounded-2xl border border-border/60 bg-background/40 p-6">
                <p className="text-lg">{item.quote}</p>
                <p className="mt-4 text-sm text-muted">{item.name}</p>
                {item.role ? <p className="text-xs text-muted">{item.role}</p> : null}
              </div>
            ))}
          </div>
        </div>
      );
    case "gallery":
      return (
        <div>
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {block.data.items.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/60 bg-surface/60 p-6">
                <p className="text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "stats":
      return (
        <div>
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {block.data.items.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border/60 bg-background/40 p-6">
                <p className="text-3xl font-semibold">{item.value}</p>
                <p className="mt-2 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "logoCloud":
      return (
        <div className="rounded-2xl border border-border/60 bg-surface/70 p-6">
          {block.data.title ? (
            <h2 className="text-2xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-muted">
            {block.data.logos.map((logo) => (
              <span key={logo} className="rounded-full border border-border/60 px-4 py-2">
                {logo}
              </span>
            ))}
          </div>
        </div>
      );
    case "steps":
      return (
        <div className="rounded-[32px] border border-border/60 bg-surface/70 p-8">
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {block.data.items.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 bg-background/40 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "contactStrip":
      return (
        <div className="rounded-[32px] border border-border/60 bg-surface/80 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">{block.data.title}</h2>
              <p className="mt-3 text-sm text-muted">{block.data.body}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/40 px-6 py-4 text-sm">
              <p className="text-muted">Phone</p>
              <p className="mt-1 text-lg font-semibold">{block.data.phone}</p>
              <p className="mt-3 text-muted">Email</p>
              <p className="mt-1 text-lg font-semibold">{block.data.email}</p>
            </div>
          </div>
        </div>
      );
    case "projectCards":
      return (
        <div>
          {block.data.title ? (
            <h2 className="text-3xl font-semibold">{block.data.title}</h2>
          ) : null}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {block.data.items.map((project) => (
              <article key={project.title} className="rounded-2xl border border-border/60 bg-surface/60 p-6">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm text-muted">{project.description}</p>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-accent">Read more</p>
              </article>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
