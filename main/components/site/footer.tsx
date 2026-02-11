export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Abstruse Networks, LLC</p>
          <p className="mt-3 text-sm text-muted">East Tennessee + surrounding</p>
        </div>
        <div className="text-sm text-muted">
          <p>(865) 555-0199</p>
          <p>hello@abstruse.local</p>
        </div>
      </div>
    </footer>
  );
}
