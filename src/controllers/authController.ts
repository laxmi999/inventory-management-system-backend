import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { db } from '../db/index';
import { generateToken } from '../utils/jwt';
import { comparePasswords } from '../utils/hash';

export const userLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await db
      .selectFrom('user')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user || !(await comparePasswords(password, user.password_hash))) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ jwt: token, user: { id: user.id, name: user.username } });
  }
);
