import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { db } from '../db/index';

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const allUsers = await db.selectFrom('user').selectAll().execute();
    res.status(200).json(allUsers);
  }
);
