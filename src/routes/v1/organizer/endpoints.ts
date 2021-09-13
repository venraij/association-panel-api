import { Router } from 'express';
import * as organizerController from '../../../controllers/v1/organizerController';

export const OrganizerRouter = Router();

/**
 * @swagger
 *
 * /v1/organizer:
 *   post:
 *     summary: Create an organizer
 *     produces:
 *       - application/json
 *     tags:
 *       - Organizer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [email, name]
 *              properties:
 *                email:
 *                  type: string
 *                  description: The email
 *                name:
 *                  type: string
 *                  description: The name
 *     responses:
 *       200:
 *         description: Created an organizer. Returning organizer.
 *       400:
 *          description: An error occurred
 */
OrganizerRouter.post('/', organizerController.create);

