"use server";

import { prisma } from "@/lib/db";
import { pageSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

function parseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function createPage(formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = pageSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid page payload.");
  }

  const blocks = parseJson(parsed.data.blocksJson);
  if (!blocks) {
    throw new Error("Invalid JSON for blocks.");
  }

  await prisma.page.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      published: Boolean(parsed.data.published),
      blocksJson: blocks,
    },
  });

  revalidatePath("/admin/pages");
}

export async function updatePage(id: string, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = pageSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid page payload.");
  }

  const blocks = parseJson(parsed.data.blocksJson);
  if (!blocks) {
    throw new Error("Invalid JSON for blocks.");
  }

  await prisma.page.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      published: Boolean(parsed.data.published),
      blocksJson: blocks,
    },
  });

  revalidatePath("/admin/pages");
}

export async function deletePage(id: string) {
  await requireAdmin();
  await prisma.page.delete({ where: { id } });
  revalidatePath("/admin/pages");
}
