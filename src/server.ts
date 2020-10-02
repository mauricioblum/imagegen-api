import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

// import uploadConfig from '@config/upload';
// import AppError from '@shared/errors/AppError';
// import rateLimiter from './middlewares/rateLimiter';
// import routes from './routes';
// import '@shared/infra/typeorm';
// import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
// app.use(rateLimiter);
// app.use(routes);

// app.use(errors());

app.get('/', (req: Request, res: Response) =>
  res.json({ message: 'Hello world' }),
);

app.listen(3333, () => {
  console.log('🎉 Server started on port 3333');
});
