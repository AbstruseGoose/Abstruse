import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/rbac";
import { z } from "zod";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendAdminInviteEmail } from "@/lib/email";

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["ADMIN", "EDITOR"]).default("ADMIN"),
});

function resolveBaseUrl() {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "";
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = inviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invite payload." }, { status: 400 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  const invite = await prisma.inviteToken.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role,
      tokenHash,
      expiresAt,
      createdById: session.user.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "INVITE_CREATED",
      entityType: "INVITE",
      entityId: invite.id,
      metaJson: { email: parsed.data.email, role: parsed.data.role },
    },
  });

  const baseUrl = resolveBaseUrl();
  const inviteUrl = baseUrl ? `${baseUrl}/auth/invite/${token}` : `/auth/invite/${token}`;
  const sent = await sendAdminInviteEmail({ to: parsed.data.email, inviteUrl });

  return NextResponse.json({ inviteUrl, sent });
}
