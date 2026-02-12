import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "jimpido3@gmail.com";
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Abstruse Admin";

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required.");
  }

  const passwordHash = await argon2.hash(password);
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name,
        role: "ADMIN",
        passwordHash,
        mustChangePassword: true,
        disabled: false,
        mfaEnabled: false,
        mfaSecretEncrypted: null,
      },
    });
  } else {
    await prisma.user.create({
      data: {
        email,
        name,
        role: "ADMIN",
        passwordHash,
        mustChangePassword: true,
        mfaEnabled: false,
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      action: "ADMIN_BOOTSTRAPPED",
      entityType: "USER",
      metaJson: { email },
    },
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
