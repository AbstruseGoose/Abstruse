import argon2 from "argon2";
import crypto from "node:crypto";
import { authenticator } from "otplib";
import { requireEnv } from "./env";

const ALGO = "aes-256-gcm";
const IV_LENGTH = 12;

function getEncryptionKey() {
  const key = Buffer.from(requireEnv("MFA_ENCRYPTION_KEY"), "base64");
  if (key.length !== 32) {
    throw new Error("MFA_ENCRYPTION_KEY must be 32 bytes base64 encoded.");
  }
  return key;
}

export async function hashPassword(password: string) {
  return argon2.hash(password);
}

export async function verifyPassword(hash: string, password: string) {
  return argon2.verify(hash, password);
}

export function encryptSecret(plainText: string) {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv.toString("base64"), tag.toString("base64"), encrypted.toString("base64")].join(".");
}

export function decryptSecret(payload: string) {
  const [ivPart, tagPart, dataPart] = payload.split(".");
  if (!ivPart || !tagPart || !dataPart) {
    throw new Error("Invalid encrypted payload format.");
  }

  const key = getEncryptionKey();
  const iv = Buffer.from(ivPart, "base64");
  const tag = Buffer.from(tagPart, "base64");
  const encrypted = Buffer.from(dataPart, "base64");
  const decipher = crypto.createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

export function generateTotpSecret() {
  return authenticator.generateSecret();
}

export function verifyTotp(token: string, secret: string) {
  return authenticator.verify({ token, secret });
}
