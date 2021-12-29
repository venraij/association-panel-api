import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export default function(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).send({ error: 'Missing token' });
    return;
  }

  jwt.verify(token, config.privateKey, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send({ error: err });
    }

    req.headers.user = user;

    next();
  });
}
