import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { db } from '../db/index';
import { hashPassword } from '../utils/hash';

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, full_name, contact_no, password, role } = req.body;
    const password_hash = await hashPassword(password);

    const user = await db
      .insertInto('user')
      .values({
        username: username,
        email: email,
        full_name: full_name,
        contact_no: contact_no,
        password_hash: password_hash,
        role: role,
      })
      .returning(['id', 'username'])
      .executeTakeFirst();

    res.status(201).json({ message: `Registered as ${user?.username}!` });
  }
);

export const getAllUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const allUsers = await db.selectFrom('user').selectAll().execute();
    res.status(200).json(allUsers);
  }
);
