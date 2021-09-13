import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { Organizer } from '../../db/models/organizer';

/**
 * POST /v1/organizer
 * Expects organizer details
 * Return an organizer on successful creation
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  const name = req.body.name;
  const email = req.body.email;

  if (!name) {
    res.status(400).send({ error: 'Missing name' });
  } else if (!email) {
    res.status(400).send({ error: 'Missing email' });
  } else {
    const emailExists = await Organizer.findOne({ where: { email: email } });

    if (!emailExists) {
      try {
        const organizer = await Organizer.create({
          id: v4(),
          name,
          email,
        });
        res.status(200).send(organizer);
      } catch (e) {
        console.log(e);
        res.status(500).send({ error: e});
      }
    } else {
      res.status(400).send({ error: 'Email exists' });
    }
  }

  res.status(200).send();
}
