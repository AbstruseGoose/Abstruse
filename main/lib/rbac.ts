export function isAdmin(role?: string | null) {
  return role === "ADMIN" || role === "EDITOR";
}

export function isClient(role?: string | null) {
  return role === "CLIENT";
}
