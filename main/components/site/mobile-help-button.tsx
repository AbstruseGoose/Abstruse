import Link from "next/link";

export function MobileHelpButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition hover:bg-accent-2 md:hidden"
    >
      Request Help
    </Link>
  );
}
