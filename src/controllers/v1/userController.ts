import { Request, Response } from 'express';
import { User } from '../../db/models/User.js';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * POST /v1/user
 * Expects user details
 * Return the user's email on registration
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function register(req: Request, res: Response): Promise<void> {
  const email: string = req.body.email;
  const plainPassword: string = req.body.password;
  const studentId: string = req.body.studentId;
  const firstName: string = req.body.firstName;
  const lastName: string = req.body.lastName;
  const saltRounds = 10;

  if (!email) {
    res.status(400).send({ error: 'Missing email' });
  } else if (!plainPassword) {
    res.status(400).send({ error: 'Missing password' });
  } else {
    try {
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        res.status(409).send({ error: 'User already exists' });
        return;
      }

      const verificationCode = crypto.randomBytes(4).toString('hex');
      const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

      const user = await User.create({
        id: v4(),
        email,
        passwordHash,
        confirmedEmail: false,
        studentId,
        firstName,
        lastName,
        verificationCode,
      });

      console.log('Verification code:', verificationCode);

      res.status(201).send({ email: user.email });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}

/**
 * PATCH /v1/user/verify
 * Verifies the users email
 * Return the user's email on registration
 * @param {Request} req Request
 * @param {Response} res Response
 */
export async function verifyEmail(req: Request, res: Response): Promise<void> {
  const email: string = req.body.email;
  const verificationCode: string = req.body.verificationCode;

  if (!email) {
    res.status(400).send({ error: 'Missing email' });
  } else if (!verificationCode) {
    res.status(400).send({ error: 'Missing verification code' });
  } else {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(400).send({ error: 'User does not exist' });
      } else if (user.verificationCode !== verificationCode) {
        res.status(400).send({ error: 'Incorrect verification code' });
      } else if (user.emailVerified) {
        res.status(400).send({ error: 'Email already verified' });
      } else {
        user.verificationCode = null;
        user.emailVerified = true;
        await user.save();

        res.status(200).send({ email: user.email });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err});
    }
  }
}


