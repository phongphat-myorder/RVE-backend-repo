import pino, { Logger } from 'pino';
import pinoHttp from 'pino-http';
import { config } from './config';

const logger: Logger = pino({
  level:config.PINO_LOG_LEVEL ,
  transport: config.APP_ENV !== 'Production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  } : undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
});

const httpLogger = pinoHttp({
  logger: logger,
  genReqId: (req, res) => {
    const existingID = req.id ?? req.headers['x-request-id'];
    if (existingID) return existingID as string;
    const id = crypto.randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
});

export { logger, httpLogger };
