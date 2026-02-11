import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateUserRole, toggleUserDisabled, resetUserMfa } from "./actions";

const roles = ["ADMIN", "EDITOR", "CLIENT"] as const;

export default async function UsersAdminPage() {
  await requireAdmin();
  const users = (await prisma.user.findMany({ orderBy: [{ createdAt: "desc" }] })) as Array<{
    id: string;
    name: string | null;
    email: string;
    role: (typeof roles)[number];
    mfaEnabled: boolean;
    disabled: boolean;
  }>;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
        <h1 className="mt-2 text-3xl font-semibold">Users</h1>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">{user.name ?? user.email}</h2>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">
                {user.mfaEnabled ? "MFA" : "No MFA"} • {user.disabled ? "Disabled" : "Active"}
              </div>
            </div>

            <form action={updateUserRole} className="flex flex-wrap items-center gap-3 text-sm">
              <input type="hidden" name="userId" value={user.id} />
              <label className="text-muted">Role</label>
              <select
                name="role"
                defaultValue={user.role}
                className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <Button type="submit" variant="outline">
                Update role
              </Button>
            </form>

            <div className="flex flex-wrap gap-3">
              <form action={toggleUserDisabled}>
                <input type="hidden" name="userId" value={user.id} />
                <Button type="submit" variant="outline">
                  {user.disabled ? "Enable" : "Disable"}
                </Button>
              </form>
              <form action={resetUserMfa}>
                <input type="hidden" name="userId" value={user.id} />
                <Button type="submit" variant="outline">
                  Reset MFA
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
