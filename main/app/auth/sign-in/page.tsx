"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      mfaCode: mfaCode || undefined,
      callbackUrl: "/admin",
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials or MFA code.");
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-surface/70 p-8 shadow-[0_30px_60px_rgba(4,10,18,0.45)]">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">Admin Access</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Secure sign-in</h1>
        <p className="mt-3 text-sm text-muted">
          MFA is required for admin and editor accounts.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="password"
              required
            />
          </label>

          <label className="block text-sm text-muted">
            MFA Code
            <input
              value={mfaCode}
              onChange={(event) => setMfaCode(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="text"
              inputMode="numeric"
              placeholder="123456"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black transition hover:bg-accent-2 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
