import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: String(process.env.EMAIL_USER!),
    pass: String(process.env.EMAIL_PASS!)
  }
});

export async function sendEmail({
  to,
  subject,
  message
}: SendEmailParams) {
  return transporter.sendMail({
    from: String(process.env.EMAIL_USER!),
    to,
    subject,
    text: message
  });
}
