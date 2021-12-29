import { Router } from 'express';
import * as userController from '../../../controllers/v1/userController';

export const UserRouter = Router();

/**
 * @swagger
 *
 * /v1/user:
 *   post:
 *     description: Registers a new user
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
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
 *         description: Created a user. Returning email.
 *       400:
 *          description: An error occurred
 */
UserRouter.post('/', userController.register);

/**
 * @swagger
 *
 * /v1/user/verify:
 *   post:
 *     description: Verifies a users email
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              required: [email, verificationCode]
 *              properties:
 *                email:
 *                  type: string
 *                  description: The email
 *                verificationCode:
 *                  type: string
 *                  description: The password
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns the verified email
 *       400:
 *          description: An error occurred
 */
UserRouter.post('/verify', userController.verifyEmail);
