"use server";

import { prisma } from "@/lib/db";
import { serviceSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function createService(formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = serviceSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid service payload.");
  }

  const contentBlocks = parseJson(parsed.data.contentBlocksJson);
  const faqs = parseJson(parsed.data.faqsJson);

  if (!contentBlocks || !faqs) {
    throw new Error("Invalid JSON for content blocks or FAQs.");
  }

  await prisma.service.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      icon: parsed.data.icon || null,
      order: parsed.data.order,
      published: Boolean(parsed.data.published),
      contentBlocksJson: contentBlocks,
      faqsJson: faqs,
    },
  });

  revalidatePath("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = serviceSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("Invalid service payload.");
  }

  const contentBlocks = parseJson(parsed.data.contentBlocksJson);
  const faqs = parseJson(parsed.data.faqsJson);

  if (!contentBlocks || !faqs) {
    throw new Error("Invalid JSON for content blocks or FAQs.");
  }

  await prisma.service.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      icon: parsed.data.icon || null,
      order: parsed.data.order,
      published: Boolean(parsed.data.published),
      contentBlocksJson: contentBlocks,
      faqsJson: faqs,
    },
  });

  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
}
