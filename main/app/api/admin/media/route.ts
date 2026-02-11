import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdmin } from "@/lib/rbac";
import { s3Client, getPublicUrl } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
const maxBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!env.S3_BUCKET) {
    return NextResponse.json({ error: "S3 bucket not configured." }, { status: 400 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const alt = String(formData.get("alt") || "");
  const tagsRaw = String(formData.get("tags") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });
  }

  if (file.size > maxBytes) {
    return NextResponse.json({ error: "File too large." }, { status: 400 });
  }

  const key = `media/${uuidv4()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    })
  );

  const url = getPublicUrl(key);

  const media = await prisma.media.create({
    data: {
      key,
      url,
      filename: file.name,
      mime: file.type,
      size: file.size,
      alt: alt || null,
      tags: tagsRaw
        ? tagsRaw.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [],
    },
  });

  return NextResponse.json({ ok: true, media });
}
