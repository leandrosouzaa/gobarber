import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';

import AppError from './errors/AppError';

import uploadConfig from './config/upload';

import routes from './routes';
import './database';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
   if (err instanceof AppError) {
      return res.status(err.statusCode).json({
         status: 'error',
         message: err.message,
      });
   }

   console.error(err);

   return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
   });
});

app.listen(3333, () => {
   console.log('👷 Server started in port 3333!');
});
