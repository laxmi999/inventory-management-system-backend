import { Request, Response } from 'express';
import { db } from '../db/index';

export async function getAllUsers(req: Request, res: Response) {
  const allUsers = await db.selectFrom('user').selectAll().execute();
  res.status(200).json(allUsers);
}
