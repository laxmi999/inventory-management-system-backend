import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const errrorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({ errrorMessage });
}
