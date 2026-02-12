import { prisma } from "@/lib/db";
import type { AuditLog } from "@prisma/client";
import { requireAdmin } from "@/lib/auth-guard";
import { Card } from "@/components/ui/card";

export default async function AuditLogPage() {
  await requireAdmin();
  const logs: AuditLog[] = await prisma.auditLog.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Audit log</h1>
      </div>

      <div className="grid gap-4">
        {logs.map((log) => (
          <Card key={log.id}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{log.action}</p>
                <p className="text-xs text-muted">{log.entityType} {log.entityId ?? ""}</p>
              </div>
              <p className="text-xs text-muted">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
        {!logs.length ? (
          <Card>
            <p className="text-sm text-muted">No audit events yet.</p>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
