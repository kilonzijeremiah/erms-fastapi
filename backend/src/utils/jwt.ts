import jwt from "jsonwebtoken";

const SECRET = "erms_secret_key";

export const generateToken = (user: any) => {
  return jwt.sign(user, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
