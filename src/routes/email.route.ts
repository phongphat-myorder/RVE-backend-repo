import { Router, Request, Response } from 'express';
import { sendEmail } from '../services/email.service';

const router = Router();

interface SendEmailBody {
  message: string;
}

router.post(
  '/send-email',
  async (req: Request<{}, {}, SendEmailBody>, res: Response) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    try {
      await sendEmail({ to: 'phongpat003@gmail.com', subject: 'test', message });
      return res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
  }
);

export default router;
