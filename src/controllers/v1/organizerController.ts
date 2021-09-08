import { Request, Response } from 'express';

/**
 * POST /v1/organizer
 * Expects organizer details
 * Return an organizer on successful creation
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  res.status(200).send();
}
