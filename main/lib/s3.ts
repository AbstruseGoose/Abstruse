import { S3Client } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";

export const s3Client = new S3Client({
  region: env.S3_REGION || "us-east-1",
  endpoint: env.S3_ENDPOINT,
  forcePathStyle: env.S3_FORCE_PATH_STYLE === "true",
  credentials: env.S3_ACCESS_KEY_ID
    ? {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY || "",
      }
    : undefined,
});

export function getPublicUrl(key: string) {
  if (env.S3_PUBLIC_URL) {
    return `${env.S3_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  }
  if (env.S3_ENDPOINT && env.S3_BUCKET) {
    return `${env.S3_ENDPOINT.replace(/\/$/, "")}/${env.S3_BUCKET}/${key}`;
  }
  return key;
}
