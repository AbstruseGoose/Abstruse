"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type BlockEditorValue = Array<{ id: string; type: string; data: unknown }>;

type BlockEditorProps = {
  name: string;
  initialBlocks: BlockEditorValue;
};

const blockTypes = [
  "hero",
  "featureGrid",
  "splitSection",
  "faq",
  "cta",
  "testimonials",
  "gallery",
  "stats",
  "logoCloud",
  "steps",
  "contactStrip",
  "projectCards",
];

function createDefaultBlock(type: string) {
  switch (type) {
    case "hero":
      return { title: "Headline", subtitle: "Short summary." };
    case "featureGrid":
      return { title: "Feature grid", items: [] };
    case "splitSection":
      return { title: "Section title", body: "Section copy", bullets: [] };
    case "faq":
      return { title: "FAQ", items: [{ question: "Question", answer: "Answer" }] };
    case "cta":
      return { title: "CTA title", body: "CTA body", cta: { label: "Contact", href: "/contact" } };
    case "testimonials":
      return { title: "Testimonials", items: [{ quote: "Quote", name: "Name" }] };
    case "gallery":
      return { title: "Gallery", items: [{ label: "Image caption" }] };
    case "stats":
      return { title: "Stats", items: [{ label: "Label", value: "Value" }] };
    case "logoCloud":
      return { title: "Logo cloud", logos: ["Partner"] };
    case "steps":
      return { title: "Steps", items: [{ title: "Step", description: "Description" }] };
    case "contactStrip":
      return {
        title: "Ready to talk?",
        body: "Add a short CTA.",
        phone: "(865) 555-0199",
        email: "hello@abstruse.local",
      };
    case "projectCards":
      return { title: "Projects", items: [{ title: "Project", description: "Details" }] };
    default:
      return { title: "Block" };
  }
}

function sanitizeBlocks(blocks: unknown): BlockEditorValue {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.map((block) => ({
    id: String((block as { id?: string }).id || crypto.randomUUID()),
    type: String((block as { type?: string }).type || "hero"),
    data: (block as { data?: unknown }).data ?? {},
  }));
}

export function BlockEditor({ name, initialBlocks }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<BlockEditorValue>(() => sanitizeBlocks(initialBlocks));
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const entries = sanitizeBlocks(initialBlocks).map((block) => [
      block.id,
      JSON.stringify(block.data, null, 2),
    ]);
    return Object.fromEntries(entries);
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const jsonValue = useMemo(() => JSON.stringify(blocks), [blocks]);

  function updateDraft(id: string, value: string) {
    setDrafts((prev) => ({ ...prev, [id]: value }));
    try {
      const parsed = JSON.parse(value);
      setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, data: parsed } : block)));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch {
      setErrors((prev) => ({ ...prev, [id]: "Invalid JSON" }));
    }
  }

  function updateType(id: string, type: string) {
    const data = createDefaultBlock(type);
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, type, data } : block)));
    setDrafts((prev) => ({ ...prev, [id]: JSON.stringify(data, null, 2) }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function addBlock(type: string) {
    const id = crypto.randomUUID();
    const data = createDefaultBlock(type);
    setBlocks((prev) => [...prev, { id, type, data }]);
    setDrafts((prev) => ({ ...prev, [id]: JSON.stringify(data, null, 2) }));
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function moveBlock(id: string, direction: "up" | "down") {
    setBlocks((prev) => {
      const index = prev.findIndex((block) => block.id === id);
      if (index === -1) return prev;
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const updated = [...prev];
      const [item] = updated.splice(index, 1);
      updated.splice(target, 0, item);
      return updated;
    });
  }

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      return;
    }

    setBlocks((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(dragIndex, 1);
      updated.splice(index, 0, item);
      return updated;
    });
    setDragIndex(null);
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={jsonValue} />
      <div className="flex flex-wrap items-center gap-3">
        <select
          className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground"
          defaultValue="hero"
          onChange={(event) => addBlock(event.target.value)}
        >
          {blockTypes.map((type) => (
            <option key={type} value={type}>
              Add {type}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted">Drag blocks or use the arrows to reorder.</span>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="rounded-2xl border border-border/60 bg-background/40 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">Block</span>
                <select
                  value={block.type}
                  onChange={(event) => updateType(block.id, event.target.value)}
                  className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground"
                >
                  {blockTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => moveBlock(block.id, "up")}>
                  Move up
                </Button>
                <Button type="button" variant="outline" onClick={() => moveBlock(block.id, "down")}>
                  Move down
                </Button>
                <Button type="button" variant="outline" onClick={() => removeBlock(block.id)}>
                  Remove
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs uppercase tracking-[0.2em] text-muted">Block data (JSON)</label>
              <Textarea
                className="mt-2"
                value={drafts[block.id] ?? "{}"}
                onChange={(event) => updateDraft(block.id, event.target.value)}
              />
              {errors[block.id] ? (
                <p className="mt-2 text-xs text-red-300">{errors[block.id]}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
