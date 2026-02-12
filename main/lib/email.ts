import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export async function sendAdminInviteEmail({
  to,
  inviteUrl,
}: {
  to: string;
  inviteUrl: string;
}) {
  const transport = getTransport();
  if (!transport) {
    return false;
  }

  const from = process.env.SMTP_FROM || "Abstruse Networks <no-reply@abstruse.local>";

  const subject = "Your Abstruse Admin Invite";
  const text = `You have been invited to manage Abstruse Networks, LLC.\n\n1) Open this invite link: ${inviteUrl}\n2) Set your password.\n3) Sign in at /auth/sign-in.\n4) Complete MFA setup at /admin/mfa (required).\n\nIf you did not request this invite, you can ignore this email.`;

  await transport.sendMail({
    from,
    to,
    subject,
    text,
  });

  return true;
}
