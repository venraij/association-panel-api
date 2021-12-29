import { Request, Response } from 'express';
import { User } from '../../db/models/User.js';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';

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
      }, config.privateKey, { expiresIn: 900 });

      const refreshToken = jwt.sign({
        user: userData,
      }, config.privateKeyRefresh, { expiresIn: 86400 });

      user.lastSuccessfulLogin = new Date();
      await user.save();

      res.status(200).send({ token, refreshToken });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}

/**
 * POST /v1/auth/token
 * Get a new token
 * Return the user's token
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function token(req: Request, res: Response): Promise<void> {
  const id: string = req.body.userId;
  const refreshToken: string = req.body.refreshToken;

  if (!id) {
    res.status(400).send({ error: 'Missing user id' });
  } else if (!refreshToken) {
    res.status(400).send({ error: 'Missing refresh token' });
  } else {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        res.status(400).send({ error: 'User does not exist' });
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
      }, config.privateKey, { expiresIn: 900 });

      res.status(200).send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}
