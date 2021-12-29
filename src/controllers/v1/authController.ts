import { Request, Response } from 'express';
import { User } from '../../db/models/User.js';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { privateKey } from '../../server.js';

/**
 * POST /v1/auth/login
 * Login
 * Returns a valid jwt
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function login(req: Request, res: Response): Promise<void> {
  const email: string = req.body.email;
  const plainPassword: string = req.body.password;

  if (!email) {
    res.status(400).send({ error: 'Missing email' });
  } else if (!plainPassword) {
    res.status(400).send({ error: 'Missing password' });
  } else {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(400).send({ error: 'User does not exist' });
        return;
      } else if (user.verificationCode) {
        res.status(400).send({ error: 'Email not verified' });
        return;
      }

      const validPassword = await bcrypt.compare(plainPassword, user.passwordHash);

      if (!validPassword) {
        res.status(400).send({ error: 'Incorrect login credentials' });
        return;
      }

      const userData = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        createdAt: user.createdAt,
      };

      const token = jwt.sign({
        user: userData,
      }, privateKey, { expiresIn: '2h' });

      res.status(201).send(token);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}