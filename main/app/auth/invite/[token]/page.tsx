"use client";

import { useState } from "react";

export default function InviteAcceptPage({ params }: { params: { token: string } }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/invite/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: params.token, name, password }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Unable to accept invite.");
      return;
    }

    setMessage("Invite accepted. You can sign in now.");
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-surface/70 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin Invite</p>
        <h1 className="mt-4 text-3xl font-semibold">Set your password</h1>
        <p className="mt-3 text-sm text-muted">
          Finish your account setup, then sign in and complete MFA.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm text-muted">
            Name (optional)
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="text"
            />
          </label>
          <label className="block text-sm text-muted">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="password"
              required
              minLength={8}
            />
          </label>
          <label className="block text-sm text-muted">
            Confirm password
            <input
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="password"
              required
              minLength={8}
            />
          </label>

          {message ? <p className="text-sm text-muted">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-accent-2 disabled:opacity-60"
          >
            {loading ? "Working..." : "Accept invite"}
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-border/60 bg-background/40 p-4 text-sm text-muted">
          <p className="font-semibold text-foreground">Next steps</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Sign in at /auth/sign-in.</li>
            <li>Complete MFA setup at /admin/mfa.</li>
            <li>Start managing pages, services, and lab posts.</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
