import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";
import argon2 from "argon2";
import { prisma } from "@/lib/db";

const acceptSchema = z.object({
  token: z.string().min(10),
  name: z.string().optional(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = acceptSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invite payload." }, { status: 400 });
  }

  const tokenHash = crypto.createHash("sha256").update(parsed.data.token).digest("hex");

  const invite = await prisma.inviteToken.findUnique({ where: { tokenHash } });

  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "Invite is invalid or expired." }, { status: 400 });
  }

  const passwordHash = await argon2.hash(parsed.data.password);
  const email = invite.email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: parsed.data.name || existing.name,
        passwordHash,
        role: invite.role,
        disabled: false,
        mfaEnabled: false,
        mfaSecretEncrypted: null,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email,
        name: parsed.data.name || null,
        role: invite.role,
        passwordHash,
        mfaEnabled: false,
      },
    });
  }

  await prisma.inviteToken.update({
    where: { id: invite.id },
    data: { usedAt: new Date() },
  });

  await prisma.auditLog.create({
    data: {
      action: "INVITE_ACCEPTED",
      entityType: "INVITE",
      entityId: invite.id,
      metaJson: { email: invite.email },
    },
  });

  return NextResponse.json({ ok: true });
}
