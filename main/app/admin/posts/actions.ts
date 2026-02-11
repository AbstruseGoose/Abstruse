"use server";

import { prisma } from "@/lib/db";
import { postSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

function parseTags(raw?: string) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function createPost(formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid post payload.");
  }

  await prisma.post.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      tags: parseTags(parsed.data.tags),
      featuredImage: parsed.data.featuredImage || null,
      published: Boolean(parsed.data.published),
      publishedAt: parsed.data.published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData.entries());
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid post payload.");
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      body: parsed.data.body,
      tags: parseTags(parsed.data.tags),
      featuredImage: parsed.data.featuredImage || null,
      published: Boolean(parsed.data.published),
      publishedAt: parsed.data.published ? new Date() : null,
    },
  });

  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
}
