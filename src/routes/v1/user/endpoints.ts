import { Router } from 'express';
import * as userController from '../../../controllers/v1/userController';

export const UserRouter = Router();

/**
 * @swagger
 *
 * /v1/user:
 *   post:
 *     description: Creates a new user
 *     consumes:
 *       - application/json
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required: [email, password]
 *              properties:
 *                email:
 *                  type: string
 *                  description: The email
 *                password:
 *                  type: string
 *                  description: The password
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Created a user. Returning JWT.
 *       400:
 *          description: An error occurred
 */
UserRouter.post('/', userController.create);
