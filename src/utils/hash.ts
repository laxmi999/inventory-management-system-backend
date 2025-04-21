import bcrypt from 'bcrypt';

const salt = Number(process.env.SALT_ROUNDS);

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
