import { Status } from '@shared/classes/Status';
import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const { unauthenticated } = new Status();
const { secret } = authConfig.jwt;

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JWT Token is missing.', unauthenticated);

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, secret);

    const { iat, exp, sub } = decodedToken as ITokenPayload;

    req.user = {
      uuid: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', unauthenticated);
  }
}
