import { Router } from 'express';
import * as associationController from '../../../controllers/v1/associationController.js';
import validJwt from '../../../middleware/jwtValidation.js';

export const AssociationRouter = Router();

/**
 * @swagger
 *
 * /v1/association:
 *   post:
 *     description: Create a association
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Association
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              required: [name]
 *              properties:
 *                name:
 *                  type: string
 *                  description: The name
 *                websiteUrl:
 *                  type: string
 *                  description: The website url
 *                logoUrl:
 *                  type: string
 *                  description: The logo url
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns the created association
 *       400:
 *          description: An error occurred
 */
AssociationRouter.post('/', validJwt, associationController.create);

/**
 * @swagger
 *
 * /v1/association/user/all/{associationId}:
 *   get:
 *     description: Get all users for a association
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Association
 *     parameters:
 *       - in: path
 *         name: associationId
 *         type: string
 *         required: true
 *         description: Association ID
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Returns a list of users
 *       400:
 *          description: An error occurred
 */
AssociationRouter.get('/user/all/:associationId', validJwt, associationController.getAssociationUsers);
