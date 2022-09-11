import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../libs/mongo";
import { generateAuthToken } from "../../../libs/auth";
import User from "../../../models/user";
import errorHandler from "../../../utils/errors";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ error: "Email or Password is required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user: any = new User({
      email,
      passwordHash,
    });
    await user.save();

    const token = await generateAuthToken(user);
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
