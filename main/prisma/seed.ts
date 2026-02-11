import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
import { homeBlocks, servicesBlocks } from "../lib/page-blocks";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const name = process.env.SEED_ADMIN_NAME || "Abstruse Admin";
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD.");
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return;
  }

  const passwordHash = await argon2.hash(password);

  await prisma.user.create({
    data: {
      email,
      name,
      role: "ADMIN",
      passwordHash,
      mfaEnabled: false,
    },
  });

  await prisma.page.upsert({
    where: { slug: "home" },
    update: { title: "Home", blocksJson: homeBlocks, published: true },
    create: { title: "Home", slug: "home", blocksJson: homeBlocks, published: true },
  });

  await prisma.page.upsert({
    where: { slug: "services" },
    update: { title: "Services", blocksJson: servicesBlocks, published: true },
    create: { title: "Services", slug: "services", blocksJson: servicesBlocks, published: true },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
