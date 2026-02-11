export default function AboutPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">About</p>
          <h1 className="mt-4 text-4xl font-semibold">Field-proven engineering</h1>
          <p className="mt-4 text-sm text-muted">
            Abstruse Networks, LLC is a full-stack technology integrator and applied
            engineering shop rooted in field deployments. We build and integrate anything
            required to keep systems stable: networks, power, sensors, software, and the
            documentation to maintain it.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <h2 className="text-xl font-semibold">Service area</h2>
            <p className="mt-3 text-sm text-muted">East Tennessee + surrounding.</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <h2 className="text-xl font-semibold">Partners + certifications</h2>
            <p className="mt-3 text-sm text-muted">
              Central Station support, Telguard, and major hardware vendors.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-surface/70 p-6">
          <h2 className="text-xl font-semibold">Values</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="text-sm font-semibold">Ownership</p>
              <p className="mt-2 text-sm text-muted">We build it, we support it, we stand behind it.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="text-sm font-semibold">Uptime</p>
              <p className="mt-2 text-sm text-muted">Redundancy, testing, and real-world validation.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/40 p-4">
              <p className="text-sm font-semibold">Documentation</p>
              <p className="mt-2 text-sm text-muted">Clear diagrams and handoffs for every system.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
