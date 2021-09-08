import { Router } from 'express';
import { VoterRouter } from './voter/endpoints';

export const v1Routes = Router();

v1Routes.use('/voter', VoterRouter);
