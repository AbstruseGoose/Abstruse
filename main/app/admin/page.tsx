import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  if (session.user.role === "CLIENT") {
    redirect("/portal");
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Admin Console</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">
            This area will host content blocks, services, projects, and site settings.
          </p>
        </div>
      </div>
    </main>
  );
}
