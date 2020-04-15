import express from 'express';
import 'reflect-metadata';

import uploadConfig from './config/upload';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
   console.log('👷 Server started in port 3333!');
});
