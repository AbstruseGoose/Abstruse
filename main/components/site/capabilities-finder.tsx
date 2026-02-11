"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const options = [
  { label: "I need internet", tag: "WISP / Rural Connectivity" },
  { label: "I need phones", tag: "Voice / SIP Trunks / PBX" },
  { label: "I need cameras", tag: "Security & Access" },
  { label: "I need panel comms", tag: "Fire & Burg Panel Communications" },
  { label: "I need tracking", tag: "LoRa Asset + Animal Monitoring" },
  { label: "I need POS", tag: "POS + Business Software" },
  { label: "I need a custom build", tag: "Custom Engineering Lab" },
];

type ServiceItem = {
  title: string;
  slug: string;
  summary: string;
};

export function CapabilitiesFinder({ services }: { services: ServiceItem[] }) {
  const [selection, setSelection] = useState<string | null>(null);

  const match = useMemo(() => {
    if (!selection) return services.slice(0, 3);
    return services.filter((service) => service.title === selection);
  }, [selection, services]);

  return (
    <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Capabilities finder</p>
      <h2 className="mt-4 text-3xl font-semibold">Tell us what you need</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.label}
            onClick={() => setSelection(option.tag)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
              selection === option.tag
                ? "border-accent text-accent"
                : "border-border/60 text-muted hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
        <button
          onClick={() => setSelection(null)}
          className="rounded-full border border-border/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {match.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="rounded-2xl border border-border/60 bg-background/40 p-5 transition hover:border-accent/60"
          >
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-muted">{service.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
