import { prisma } from "@/lib/db";
import type { ContentBlock } from "@/components/blocks";

export async function loadPageBlocks(slug: string, fallback: ContentBlock[]) {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  const page = await prisma.page.findUnique({ where: { slug } });

  if (page?.published && Array.isArray(page.blocksJson)) {
    return page.blocksJson as ContentBlock[];
  }

  return fallback;
}
