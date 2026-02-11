import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSiteSettings } from "./actions";

export default async function SettingsAdminPage() {
  await requireAdmin();
  const setting = await prisma.siteSetting.findUnique({ where: { key: "company" } });
  const value = (setting?.valueJson as Record<string, string> | null) ?? {};

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Site settings</h1>
      </div>

      <Card>
        <form action={updateSiteSettings} className="space-y-4">
          <label className="text-sm text-muted">
            Company name
            <Input name="companyName" defaultValue={value.companyName ?? ""} />
          </label>
          <label className="text-sm text-muted">
            Phone
            <Input name="phone" defaultValue={value.phone ?? ""} />
          </label>
          <label className="text-sm text-muted">
            Email
            <Input name="email" defaultValue={value.email ?? ""} />
          </label>
          <label className="text-sm text-muted">
            Service area
            <Input name="serviceArea" defaultValue={value.serviceArea ?? ""} />
          </label>
          <Button type="submit" size="lg">Save settings</Button>
        </form>
      </Card>
    </div>
  );
}
