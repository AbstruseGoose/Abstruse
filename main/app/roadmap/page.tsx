export default function RoadmapPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Roadmap</p>
          <h1 className="mt-4 text-4xl font-semibold">What we are building now</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            This feed will be editable in the admin panel. For now, here is what is active.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Active</p>
            <h2 className="mt-3 text-xl font-semibold">Rugged LoRa gateway kit</h2>
            <p className="mt-3 text-sm text-muted">
              Enclosure design, power management, and dashboard integration for remote sites.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background/40 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Queue</p>
            <h2 className="mt-3 text-xl font-semibold">POS offline-first sync</h2>
            <p className="mt-3 text-sm text-muted">
              Improving inventory sync resilience for intermittent connectivity.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
