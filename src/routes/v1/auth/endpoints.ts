import { Router } from 'express';
import * as authController from '../../../controllers/v1/authController.js';

export const AuthRouter = Router();

/**
 * @swagger
 *
 * /v1/auth/login:
 *   post:
 *     description: Login user and return jwt
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     tags:
 *       - Auth
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
 *         description: Returns a valid jwt and refreshToken
 *       400:
 *          description: An error occurred
 */
AuthRouter.post('/login', authController.login);

/**
 * @swagger
 *
 * /v1/auth/token:
 *   post:
 *     description: Returns a new token
 *     consumes:
 *       - application/json
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required: [userId, refreshToken]
 *              properties:
 *                userId:
 *                  type: string
 *                  description: The user id
 *                refreshToken:
 *                  type: string
 *                  description: The refresh token
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns a valid jwt
 *       400:
 *          description: An error occurred
 */
AuthRouter.post('/token', authController.token);
