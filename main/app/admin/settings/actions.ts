"use server";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { revalidatePath } from "next/cache";

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  const payload = {
    companyName: String(formData.get("companyName") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    serviceArea: String(formData.get("serviceArea") || ""),
  };

  await prisma.siteSetting.upsert({
    where: { key: "company" },
    update: { valueJson: payload },
    create: { key: "company", valueJson: payload },
  });

  revalidatePath("/admin/settings");
}
