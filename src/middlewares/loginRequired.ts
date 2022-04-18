import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UserPayload } from '../interfaces';
import User from '../models/Users';

export async function loginRequired(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(' ')[2];
    const { id } = verify(token, process.env.JWT_SECRET) as UserPayload;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).send({
        success: false,
        data: '',
        token: '',
        errors: ['Falha na autenticação'],
      });
    }

    req.user = user;

    return next();
  } catch (e) {
    return res.status(500).send({
      success: false,
      data: '',
      token: '',
      errors: ['Falha na autenticação'],
    });
  }
}
