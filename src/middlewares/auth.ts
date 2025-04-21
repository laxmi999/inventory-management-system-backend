import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header('Authorization');

  if (!authHeader)
    return res.status(403).json({ message: 'No token provided.' });

  try {
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
}
