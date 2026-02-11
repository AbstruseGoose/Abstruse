import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/rbac";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/sign-in");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (!isAdmin(session.user.role)) {
    redirect("/portal");
  }
  return session;
}
