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

    const user: any = await User.findOne({ email }).exec();
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error:
          "Invalid email or password, Please register if you don't have an account yet.",
      });
    }

    const token = await generateAuthToken(user);

    res
      .status(201)
      .setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; Secure; SameSite=Strict; Max-Age=${
          60 * 60 * 24 * 7
        };`
      )
      .redirect("/");
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default loginHandler;
