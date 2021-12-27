import { Request, Response } from 'express';
import { User } from '../../db/models/user.js';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { privateKey } from '../../server.js';
import { IJwtDecoded } from '../../interfaces/jwtDecoded.interface.js';

/**
 * POST /v1/user
 * Expects user details
 * Return a token on successful login
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function create(req: Request, res: Response): Promise<void> {
  const email = req.body.email;
  const plainPassword = req.body.password;
  const saltRounds = 10;

  if (!email) {
    res.status(400).send({ error: 'Missing email' });
  } else if (!plainPassword) {
    res.status(400).send({ error: 'Missing password' });
  } else {
    try {
      bcrypt.hash(plainPassword, saltRounds, async (err, passwordHash) => {
        const user = await User.create({
          id: v4(),
          email,
          passwordHash,
          confirmedEmail: false,
        });

        const jwtDecoded: IJwtDecoded = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          studentId: user.studentId,
          createdAt: user.createdAt,
        };

        const token = jwt.sign({
          data: jwtDecoded,
        }, privateKey );

        res.status(201).send({ token: token, user: user });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}
