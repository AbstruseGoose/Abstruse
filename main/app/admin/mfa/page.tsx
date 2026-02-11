"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MfaSetupPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSetup() {
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/admin/mfa/setup", { method: "POST" });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Unable to start MFA setup.");
      return;
    }

    setQr(data.qr);
  }

  async function handleVerify() {
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/admin/mfa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error || "Unable to verify MFA.");
      return;
    }

    setMessage("MFA enabled successfully.");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">MFA setup</h1>
        <p className="mt-2 text-sm text-muted">
          Scan the QR code with Google Authenticator or a compatible app.
        </p>
      </div>

      <Card className="space-y-4">
        <Button type="button" onClick={handleSetup} disabled={loading}>
          {loading ? "Working..." : "Generate QR"}
        </Button>

        {qr ? (
          <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
            <Image
              src={qr}
              alt="MFA QR code"
              width={220}
              height={220}
              className="mx-auto"
              unoptimized
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="text-sm text-muted">Verification code</label>
          <Input value={token} onChange={(event) => setToken(event.target.value)} placeholder="123456" />
        </div>

        <Button type="button" variant="outline" onClick={handleVerify} disabled={loading}>
          Verify and enable
        </Button>

        {message ? <p className="text-sm text-muted">{message}</p> : null}
      </Card>
    </div>
  );
}
