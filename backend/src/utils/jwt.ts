import jwt from 'jsonwebtoken';

export const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '7d'
    }
  );
};
