import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function MediaAdminPage() {
  await requireAdmin();
  const media = (await prisma.media.findMany({ orderBy: [{ createdAt: "desc" }] })) as Array<{
    id: string;
    filename: string;
    mime: string;
    size: number;
    url: string;
  }>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Media library</h1>
      </div>

      <Card>
        <form method="POST" action="/api/admin/media" encType="multipart/form-data" className="space-y-4">
          <label className="text-sm text-muted">
            File
            <Input name="file" type="file" accept="image/*" required />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-muted">
              Alt text
              <Input name="alt" />
            </label>
            <label className="text-sm text-muted">
              Tags (comma separated)
              <Input name="tags" />
            </label>
          </div>
          <Button type="submit" size="lg">Upload</Button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {media.map((item) => (
          <Card key={item.id}>
            <p className="text-sm font-semibold">{item.filename}</p>
            <p className="mt-2 text-xs text-muted">{item.mime} • {(item.size / 1024).toFixed(1)} KB</p>
            <p className="mt-2 text-xs text-muted">{item.url}</p>
          </Card>
        ))}
        {!media.length ? (
          <Card>
            <p className="text-sm text-muted">No media uploaded yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
