"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminInvitePage() {
  const [email, setEmail] = useState("jimpido3@gmail.com");
  const [role, setRole] = useState("ADMIN");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [sent, setSent] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setInviteUrl(null);
    setSent(null);

    const response = await fetch("/api/admin/invites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Failed to create invite.");
      return;
    }

    setInviteUrl(data.inviteUrl);
    setSent(Boolean(data.sent));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Invite admin</h1>
        </div>
        <Link href="/admin/users" className="text-xs uppercase tracking-[0.2em] text-muted">
          Back to users
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-border/60 bg-surface/70 p-6 space-y-4">
        <label className="block text-sm text-muted">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
            type="email"
            required
          />
        </label>
        <label className="block text-sm text-muted">
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground"
          >
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:bg-accent-2 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create invite"}
        </button>
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </form>

      {inviteUrl ? (
        <div className="rounded-3xl border border-border/60 bg-background/40 p-6 space-y-3">
          <p className="text-sm text-muted">
            Invite link {sent ? "sent via email." : "created (email not configured)."}
          </p>
          <p className="text-sm font-semibold break-all">{inviteUrl}</p>
          <div className="rounded-2xl border border-border/60 bg-surface/70 p-4 text-sm text-muted">
            <p className="font-semibold text-foreground">Login setup instructions</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>Open the invite link above.</li>
              <li>Set a password.</li>
              <li>Sign in at /auth/sign-in.</li>
              <li>Complete MFA setup at /admin/mfa (required).</li>
            </ol>
          </div>
        </div>
      ) : null}
    </div>
  );
}
