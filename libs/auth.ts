import type { User } from "../types/user";
import jwt from "jsonwebtoken";

const generateAuthToken = (user: User) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "secret", options);
};

export { generateAuthToken };
