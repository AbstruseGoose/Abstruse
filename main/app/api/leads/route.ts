import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

const leadSchema = z.object({
  type: z.enum(["contact", "quote"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
  serviceInterest: z.string().optional(),
  notes: z.string().optional(),
  hp: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rate = await rateLimit(ip);

  if (!rate.success) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  if (parsed.data.hp) {
    return NextResponse.json({ ok: true });
  }

  await prisma.lead.create({
    data: {
      type: parsed.data.type === "contact" ? "CONTACT" : "QUOTE",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      serviceInterest: parsed.data.serviceInterest || null,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json({ ok: true });
}
