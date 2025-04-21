import jwt from 'jsonwebtoken';
const jwt_secret = process.env.JWT_SECRET_KEY;

if (!jwt_secret) {
  throw new Error(
    'JWT_SECRET_KEY is not defined in your environment variables.'
  );
}

export const generateToken = (user: { id: number; email: string }) => {
  try {
    return jwt.sign({ id: user.id, email: user.email }, jwt_secret, {
      expiresIn: '3h',
    });
  } catch (error) {
    console.error('JWT Generation Error:', error);
    return null;
  }
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwt_secret);
};
