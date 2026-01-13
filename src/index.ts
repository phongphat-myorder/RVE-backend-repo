import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import emailRoute from './routes/email.route';



const app = express();

app.use(cors());
app.use(express.json());

app.use('/ReviewMe', emailRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
