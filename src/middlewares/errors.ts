import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/ApiError';

function Errors(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof ApiError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.warn(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!',
  });
}

export default Errors;
