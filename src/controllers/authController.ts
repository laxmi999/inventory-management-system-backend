import { Request, Response } from 'express';
import { db } from '../db/index';
import { generateToken } from '../utils/jwt';
import { hashPassword, comparePasswords } from '../utils/hash';

export async function registerUser(req: Request, res: Response) {
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

export async function userLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst();

  if (!user || !(await comparePasswords(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ jwt: token });
}
