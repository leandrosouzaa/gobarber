import express from 'express';
import 'reflect-metadata';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
   console.log('👷 Server started in port 3333!');
});
