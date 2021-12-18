import { Router } from 'express';
import { UserRouter } from './user/endpoints';

export const v1Routes = Router();

v1Routes.use('/user', UserRouter);
