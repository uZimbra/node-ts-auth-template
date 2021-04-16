import { Router } from 'express';
import authenticationRouter from './authentication.routes';
import userRouter from './user.routes';

const v1 = Router();

v1.use('/v1', userRouter);
v1.use('/v1', authenticationRouter);

const routes = Router();

routes.use(v1);

export default routes;
