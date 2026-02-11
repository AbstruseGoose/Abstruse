import Link from "next/link";

const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Services", href: "/admin/services" },
  { label: "Projects", href: "/admin/posts" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Media", href: "/admin/media" },
  { label: "Users", href: "/admin/users" },
  { label: "Audit", href: "/admin/audit" },
  { label: "MFA", href: "/admin/mfa" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border/60 bg-background/70 px-6 py-8 md:flex">
      <p className="text-xs uppercase tracking-[0.3em] text-muted">Admin</p>
      <div className="mt-6 flex flex-1 flex-col gap-3 text-sm text-muted">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-3 py-2 transition hover:bg-surface hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <Link
        href="/auth/sign-in"
        className="rounded-xl border border-border/60 px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-foreground"
      >
        Switch account
      </Link>
    </aside>
  );
}
