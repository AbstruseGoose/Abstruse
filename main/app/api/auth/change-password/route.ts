import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/security";

const schema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  if (!user.mustChangePassword) {
    if (!parsed.data.currentPassword) {
      return NextResponse.json({ error: "Current password required." }, { status: 400 });
    }
    const valid = await verifyPassword(user.passwordHash, parsed.data.currentPassword);
    if (!valid) {
      return NextResponse.json({ error: "Current password incorrect." }, { status: 400 });
    }
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, mustChangePassword: false },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "PASSWORD_CHANGED",
      entityType: "USER",
      entityId: user.id,
    },
  });

  return NextResponse.json({ ok: true });
}
