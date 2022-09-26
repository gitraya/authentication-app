import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "libs/mongo";
import { generateAuthToken } from "libs/auth";
import User from "models/user";
import errorHandler, { ValidationError } from "utils/errors";
import validator from "utils/validator";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const { email, password } = req.body;

    if (!password || !email) {
      throw new ValidationError("Email and password are required");
    }

    validator.checkPassword(password);

    const passwordHash: string = await bcrypt.hash(password, 10);

    const user: any = new User({
      email,
      passwordHash,
    });
    await user.save();

    const token: string = await generateAuthToken(user);
    res
      .status(201)
      .setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; Secure; SameSite=Strict; Max-Age=${
          60 * 60 * 24 * 7
        };`
      )
      .json(user);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const registerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default registerHandler;
