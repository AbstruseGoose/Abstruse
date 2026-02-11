import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  icon: z.string().optional(),
  order: z.coerce.number().int().min(0).default(0),
  published: z.coerce.boolean().optional(),
  contentBlocksJson: z.string().min(2),
  faqsJson: z.string().min(2),
});

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  body: z.string().min(10),
  tags: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.coerce.boolean().optional(),
});

export const pageSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  published: z.coerce.boolean().optional(),
  blocksJson: z.string().min(2),
});
