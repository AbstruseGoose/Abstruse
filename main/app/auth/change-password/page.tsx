"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Unable to change password.");
      return;
    }

    setMessage("Password updated. You can continue to the admin console.");
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-surface/70 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Security</p>
        <h1 className="mt-4 text-3xl font-semibold">Change your password</h1>
        <p className="mt-3 text-sm text-muted">
          For security, please set a new password before continuing.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm text-muted">
            Current password (leave blank if prompted)
            <input
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="password"
            />
          </label>
          <label className="block text-sm text-muted">
            New password
            <input
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              type="password"
              required
              minLength={8}
            />
          </label>
          <label className="block text-sm text-muted">
            Confirm new password
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
