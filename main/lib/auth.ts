import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./db";
import { decryptSecret, verifyPassword, verifyTotp } from "./security";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mfaCode: { label: "MFA Code", type: "text" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        const mfaCode = credentials?.mfaCode?.trim();

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || user.disabled) {
          return null;
        }

        const passwordOk = await verifyPassword(user.passwordHash, password);
        if (!passwordOk) {
          return null;
        }

        if (user.mfaEnabled) {
          if (!user.mfaSecretEncrypted || !mfaCode) {
            return null;
          }

          const secret = decryptSecret(user.mfaSecretEncrypted);
          const validTotp = verifyTotp(mfaCode, secret);
          if (!validTotp) {
            return null;
          }
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "LOGIN",
            entityType: "USER",
            entityId: user.id,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          mfaEnabled: user.mfaEnabled,
          mustChangePassword: user.mustChangePassword,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as unknown as {
          id?: string;
          role?: string;
          mfaEnabled?: boolean;
          mustChangePassword?: boolean;
        };
        token.id = typedUser.id ?? token.id;
        token.role = typedUser.role;
        token.mfaEnabled = typedUser.mfaEnabled;
        token.mustChangePassword = typedUser.mustChangePassword;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.mfaEnabled = Boolean(token.mfaEnabled);
        session.user.mustChangePassword = Boolean(token.mustChangePassword);
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};
