import { BlockRenderer } from "@/components/blocks";
import { loadPageBlocks } from "@/lib/page-builder";
import { homeBlocks } from "@/lib/page-blocks";

export const dynamic = "force-dynamic";

export default async function Home() {
  const blocks = await loadPageBlocks("home", homeBlocks);
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <BlockRenderer blocks={blocks} />
      </div>
    </main>
  );
}
