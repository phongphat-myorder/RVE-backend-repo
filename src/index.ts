import cors from 'cors';
import express from 'express';
import http from 'http';
import { config, validateConfig } from './config/config';
import { connectDB } from './config/database';
import { httpLogger, logger } from './config/logger';
import { initRedis } from './config/redis';
import emailRoute from './routes/email.route';

const app = express();
let server: http.Server;

app.use(cors());
app.use(express.json());
app.use('/ReviewMe', emailRoute);
app.use(httpLogger);

validateConfig();
const PORT = Number(config.PORT);

async function startApp() {

  if (config.APP_ENV !== 'Local') {
    await connectDB();
    await initRedis();
  }

  server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// <---- disposability graceful shutdown

startApp().catch(err => {
  console.error('❌ Failed to start application:', err);
  process.exit(1);
});
