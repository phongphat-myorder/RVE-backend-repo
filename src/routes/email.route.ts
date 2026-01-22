import { Request, Response, Router } from 'express';
import { config } from '../config/config';
import { WorkshopRepository } from '../mongoDB/workshop_db.repository';
import { resultData } from '../routes/interface/resultInterface';
import { sendEmail } from '../services/email.service';

const router = Router();

interface SendEmailBody {
  message: string;
}

const WorkshopRepo = new WorkshopRepository();
const cacheMessage:resultData[] = [];  // <---- process delete this line if not use cache

router.get('/health', async (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});


router.post(
  '/send-email',
  async (req: Request<{}, {}, SendEmailBody>, res: Response) => {
    const { message } = req.body;

    if (!message) {
      WorkshopRepo.recordData('Missing message', config.EMAIL_USER)
      cacheMessage.push({ status: 'Missing message', sender: config.EMAIL_USER , timestamp: Date.now().toString() }); // <---- process delete this line if not use cache
      return res.status(400).json({ message: 'Missing message' });
    }

    try {
      await sendEmail({ to: 'phongpat003@gmail.com', subject: '🚀 Workshop 12 Factor app message review', message });
      WorkshopRepo.recordData('success', config.EMAIL_USER)
      cacheMessage.push({ status: 'success', sender: config.EMAIL_USER, timestamp: Date.now().toString() }); // <---- process delete this line if not use cache
    } catch (error) {
      console.error(error);
      WorkshopRepo.recordData('fail', config.EMAIL_USER)
      cacheMessage.push({ status: 'fail', sender: config.EMAIL_USER, timestamp: Date.now().toString() }); // <---- process delete this line if not use cache
    }
  }
);

router.get('/getRes', async (req: Request, res: Response) => { 
  res.status(200).json({ cacheMessage }); // <---- process Get response
});

router.delete('/deleteRes', async (req: Request, res: Response) => { 
  cacheMessage.length = 0; // <---- process Delete response
  res.status(200).json({ message: 'All responses deleted' }); 
});

export default router;
