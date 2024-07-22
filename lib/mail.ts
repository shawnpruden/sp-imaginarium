import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const passwordResetLink = `${domain}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@sp-imaginarium.vercel.app',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${passwordResetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@sp-imaginarium.vercel.app',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
  });
};
