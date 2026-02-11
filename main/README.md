# Abstruse Networks, LLC Platform

Production-ready web platform for Abstruse Networks, LLC. Includes a high-conversion marketing site, secure admin area with MFA, and a content system for services and lab posts.

## What is included

- Next.js App Router + TypeScript + TailwindCSS
- Prisma + PostgreSQL
- NextAuth credentials login with MFA (TOTP)
- Docker + docker-compose for app, Postgres, and MinIO
- Public marketing pages, services, projects, and roadmap
- Admin and client portal scaffolding

## Quick start (local)

1) Copy environment variables

```
cp .env.example .env
```

2) Install dependencies

```
npm install
```

3) Start the dev server

```
npm run dev
```

## Docker (dev-like)

```
docker compose up --build
```

## Environment variables

Required

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `MFA_ENCRYPTION_KEY` (base64-encoded 32 bytes)

Optional

- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`
- `S3_ENDPOINT`
- `S3_REGION`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_PUBLIC_URL`
- `S3_FORCE_PATH_STYLE`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

## Database

Generate Prisma client:

```
npm run prisma:generate
```

Run migrations:

```
npm run db:migrate
```

Seed initial admin:

```
npm run db:seed
```

## Threat model summary

- Authentication uses credential login plus MFA (TOTP) for admin and editor roles.
- Passwords are hashed with Argon2.
- MFA secrets are encrypted at rest with AES-256-GCM.
- Admin actions are stored in audit logs.
- File uploads should validate MIME type and size before storage.
- Public read and admin write APIs must be separated and access-controlled.

## Admin MFA flow

- Admin signs in with email, password, and MFA code.
- MFA is required for admin and editor roles.
- MFA secrets are stored encrypted and are only revealed once on setup.

## Adding content blocks

1) Create a block schema and UI in the admin.
2) Add a render component under `components/blocks`.
3) Update the renderer to map block types to components.

## Deployment notes

- Set secrets and database credentials using environment variables.
- Use an S3-compatible bucket for media.
- Run Prisma migrations during deploy.

## Vercel deployment

- Set `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `MFA_ENCRYPTION_KEY` in Vercel.
- Provide S3 and SMTP variables if you enable uploads or email.
- Run `prisma generate` during build and `prisma migrate deploy` as a post-deploy step.
