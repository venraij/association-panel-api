import { Request, Response } from 'express';

/**
 * POST /v1/voter
 * Expects user details
 * Return a token on successful login
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  res.status(200).send();
}
