import { Router } from 'express';
import * as organizerController from '../../../controllers/v1/organizerController';

export const OrganizerRouter = Router();

/**
 * @swagger
 *
 * /v1/organizer:
 *   post:
 *     description: Create an organizer
 *     produces:
 *       - application/json
 *     tags:
 *       - Organizer
 *     parameters:
 *     -  name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required: [email]
 *          properties:
 *            email:
 *              type: string
 *              description: The email
 *     responses:
 *       200:
 *         description: Created an organizer. Returning organizer.
 *       400:
 *          description: An error occurred
 */
OrganizerRouter.post('/', organizerController.create);
