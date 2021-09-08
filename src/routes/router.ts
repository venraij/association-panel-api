import {Router} from 'express';
import * as express from 'express';
import path from 'path';
import {v1Routes} from './v1';

const router = Router();
router.use('/v1', v1Routes);

router.get('/swagger.js', (req: express.Request, res: express.Response) => {
  res.sendFile('swagger.js', {root: path.join(process.cwd())});
});

export default router;
