export default function ContactPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold">Request a quote or talk to a tech</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            We respond fast for comms outages, field installs, and custom engineering requests.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <form className="rounded-2xl border border-border/60 bg-background/40 p-6" method="POST" action="/api/leads">
            <h2 className="text-xl font-semibold">Contact us</h2>
            <input type="hidden" name="type" value="contact" />
            <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="mt-4 space-y-4 text-sm text-muted">
              <label className="block">
                Name
                <input
                  name="name"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  type="text"
                  required
                />
              </label>
              <label className="block">
                Email
                <input
                  name="email"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  type="email"
                  required
                />
              </label>
              <label className="block">
                Phone
                <input
                  name="phone"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  type="tel"
                />
              </label>
              <label className="block">
                Message
                <textarea
                  name="message"
                  className="mt-2 min-h-[120px] w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  required
                />
              </label>
            </div>
            <button className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-accent-2">
              Send message
            </button>
            <p className="mt-3 text-xs text-muted">
              Spam protection and rate limiting are active.
            </p>
          </form>

          <form className="rounded-2xl border border-border/60 bg-surface/70 p-6" method="POST" action="/api/leads">
            <h2 className="text-xl font-semibold">Request a quote</h2>
            <input type="hidden" name="type" value="quote" />
            <input type="text" name="hp" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="mt-4 space-y-4 text-sm text-muted">
              <label className="block">
                Company / Site
                <input
                  name="name"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  type="text"
                  required
                />
              </label>
              <label className="block">
                Email
                <input
                  name="email"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                  type="email"
                  required
                />
              </label>
              <label className="block">
                Service type
                <select
                  name="serviceInterest"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                >
                  <option value="Voice / PBX">Voice / PBX</option>
                  <option value="WISP / Connectivity">WISP / Connectivity</option>
                  <option value="Security / Access">Security / Access</option>
                  <option value="Fire / Burg Comms">Fire / Burg Comms</option>
                  <option value="LoRa Monitoring">LoRa Monitoring</option>
                  <option value="POS / Software">POS / Software</option>
                  <option value="Custom Engineering">Custom Engineering</option>
                </select>
              </label>
              <label className="block">
                Urgency
                <select
                  name="notes"
                  className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                >
                  <option value="Planning">Planning</option>
                  <option value="Active project">Active project</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </label>
              <label className="block">
                Notes
                <textarea
                  name="message"
                  className="mt-2 min-h-[100px] w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                />
              </label>
            </div>
            <button className="mt-6 w-full rounded-xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-background">
              Request quote
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
