import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authSecret from '../config/authSecret';
import ApiError from '../errors/ApiError';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new ApiError('Invalid authorization!', 401);
  }

  const token = authorization.replace('Bearer', '').trim();

  const decodedToken = verify(token, authSecret.secret);

  const { id } = decodedToken as TokenPayload;

  request.userId = id;

  return next();
}

export default authMiddleware;
