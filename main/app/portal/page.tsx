import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const projects = [
  {
    name: "Rural site backhaul refresh",
    status: "In progress",
    update: "New tower mount scheduled for next week.",
  },
  {
    name: "Retail access control rollout",
    status: "Awaiting parts",
    update: "Controller shipment ETA 3 days.",
  },
];

export default async function ClientPortalPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-3xl border border-border/60 bg-surface/70 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Client Portal</p>
          <h1 className="mt-4 text-3xl font-semibold">Project status</h1>
          <p className="mt-2 text-sm text-muted">
            Live updates and asset visibility are rolling out soon.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.name} className="rounded-2xl border border-border/60 bg-background/40 p-6">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="mt-2 text-sm text-muted">Status: {project.status}</p>
              <p className="mt-4 text-sm">{project.update}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
