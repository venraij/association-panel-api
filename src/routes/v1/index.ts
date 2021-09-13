import { Router } from 'express';
import { OrganizerRouter } from './organizer/endpoints';
import { VoterRouter } from './voter/endpoints';

export const v1Routes = Router();

v1Routes.use('/voter', VoterRouter);
v1Routes.use('/organizer', OrganizerRouter);
