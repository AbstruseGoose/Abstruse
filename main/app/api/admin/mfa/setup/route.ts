import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { encryptSecret, generateTotpSecret } from "@/lib/security";
import { authenticator } from "otplib";
import QRCode from "qrcode";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = generateTotpSecret();
  const otpauth = authenticator.keyuri(session.user.email ?? "user", "Abstruse Networks", secret);
  const qr = await QRCode.toDataURL(otpauth);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      mfaSecretEncrypted: encryptSecret(secret),
      mfaEnabled: false,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      action: "MFA_SETUP_REQUESTED",
      entityType: "USER",
      entityId: session.user.id,
    },
  });

  return NextResponse.json({ otpauth, qr });
}
