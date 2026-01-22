import { config } from '../config/config';
import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: String(config.EMAIL_USER),
    pass: String(config.EMAIL_PASS)
  }
});

export async function sendEmail({
  to,
  subject,
  message
}: SendEmailParams) {
  return transporter.sendMail({
    from: String(config.EMAIL_USER),
    to,
    subject,
    text: message
  });
}
