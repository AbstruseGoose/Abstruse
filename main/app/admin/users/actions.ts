"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";

const roles = ["ADMIN", "EDITOR", "CLIENT"] as const;

export async function updateUserRole(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "");

  if (!userId || !roles.includes(role as (typeof roles)[number])) {
    throw new Error("Invalid role update.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role: role as (typeof roles)[number] },
  });

  revalidatePath("/admin/users");
}

export async function toggleUserDisabled(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");

  if (!userId) {
    throw new Error("Missing user id.");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { disabled: !user.disabled },
  });

  revalidatePath("/admin/users");
}

export async function resetUserMfa(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("userId") || "");

  if (!userId) {
    throw new Error("Missing user id.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { mfaEnabled: false, mfaSecretEncrypted: null },
  });

  revalidatePath("/admin/users");
}
