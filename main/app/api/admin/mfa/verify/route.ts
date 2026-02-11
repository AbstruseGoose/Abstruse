import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { decryptSecret, verifyTotp } from "@/lib/security";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const token = String(body?.token || "").trim();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (!user?.mfaSecretEncrypted) {
    return NextResponse.json({ error: "No MFA secret" }, { status: 400 });
  }

  const secret = decryptSecret(user.mfaSecretEncrypted);
  const valid = verifyTotp(token, secret);

  if (!valid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { mfaEnabled: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "MFA_ENABLED",
      entityType: "USER",
      entityId: user.id,
    },
  });

  return NextResponse.json({ ok: true });
}
