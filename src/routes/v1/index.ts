import { Router } from 'express';
import { AuthRouter } from './auth/endpoints.js';
import { UserRouter } from './user/endpoints.js';

export const v1Routes = Router();

v1Routes.use('/user', UserRouter);
v1Routes.use('/auth', AuthRouter);
