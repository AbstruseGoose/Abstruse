"use client";

import { useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { Button } from "@/components/ui/button";

async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

type RichTextEditorProps = {
  name: string;
  initialValue?: string;
};

export function RichTextEditor({ name, initialValue = "" }: RichTextEditorProps) {
  const [markdown, setMarkdown] = useState(initialValue);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: false,
        transformCopiedText: true,
        transformPastedText: true,
      }),
    ],
    content: "",
    onUpdate({ editor }) {
      const next = editor.storage.markdown.getMarkdown();
      setMarkdown(next);
    },
  });

  useEffect(() => {
    if (!editor) return;
    let cancelled = false;

    markdownToHtml(initialValue).then((html) => {
      if (cancelled) return;
      editor.commands.setContent(html, false);
      setMarkdown(initialValue);
    });

    return () => {
      cancelled = true;
    };
  }, [editor, initialValue]);

  const toolbar = useMemo(() => {
    if (!editor) return null;
    return (
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Numbered
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Quote
        </Button>
        <Button type="button" variant="outline" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code
        </Button>
      </div>
    );
  }, [editor]);

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={markdown} />
      {toolbar}
      <div className="rounded-2xl border border-border/60 bg-background/60 p-4">
        <EditorContent editor={editor} className="prose prose-invert max-w-none text-sm" />
      </div>
    </div>
  );
}
