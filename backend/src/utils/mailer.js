import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({ to, otp }) {
  return resend.emails.send({
    from: process.env.MAIL_FROM,
    to,
    subject: 'Your CryptoWealth login code',
    html: `
      <div style="font-family: Inter, Arial, sans-serif;">
        <h2>Security Verification</h2>
        <p>Your one-time login code is:</p>
        <h1 style="letter-spacing:4px">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `
  });
}
