import { Router } from 'express';
import * as userController from '../../../controllers/v1/userController';

export const UserRouter = Router();

/**
 * @swagger
 *
 * /v1/voter:
 *   post:
 *     description: Create a voter
 *     produces:
 *       - application/json
 *     tags:
 *       - Voter
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
 *         description: Created a voter. Returning JWT.
 *       400:
 *          description: An error occurred
 */
UserRouter.post('/', userController.create);
