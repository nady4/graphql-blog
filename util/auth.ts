import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
