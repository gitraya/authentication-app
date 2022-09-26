import jwt from "jsonwebtoken";
import { GenerateAuthToken } from "types/token";

const generateAuthToken: GenerateAuthToken = (user) => {
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
