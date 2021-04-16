import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import env from './config/env';
import './database/connection';
import Errors from './middlewares/errors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(Errors);

app.listen(env.port, () => {
  console.warn(`\x1b[32mready\x1b[0m - started server on ${env.host}`);
});
