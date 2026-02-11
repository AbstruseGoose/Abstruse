import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Card } from "@/components/ui/card";

export default async function LeadsAdminPage() {
  await requireAdmin();
  const leads = await prisma.lead.findMany({ orderBy: [{ createdAt: "desc" }] });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Leads</h1>
      </div>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{lead.name}</h2>
                <p className="text-sm text-muted">{lead.email}</p>
                {lead.phone ? <p className="text-sm text-muted">{lead.phone}</p> : null}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {lead.type} • {lead.status}
              </div>
            </div>
            {lead.message ? <p className="mt-4 text-sm">{lead.message}</p> : null}
            {lead.serviceInterest ? (
              <p className="mt-3 text-sm text-muted">Interest: {lead.serviceInterest}</p>
            ) : null}
          </Card>
        ))}
        {!leads.length ? (
          <Card>
            <p className="text-sm text-muted">No leads yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
