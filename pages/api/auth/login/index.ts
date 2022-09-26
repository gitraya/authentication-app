import nextConnect from "next-connect";
import passport from "passport";
import session from "express-session";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "libs/mongo";
import { generateAuthToken } from "libs/auth";
import type { User } from "types/user";
import errorHandler, { ValidationError } from "utils/errors";
import authenticate from "libs/passport";
import { session as sessionConfig } from "utils/configs";
import { IAuth } from "types/token";

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const { email, password } = req.body as IAuth;

    if (!password || !email) {
      throw new ValidationError("Email and password are required");
    }

    if (password.length < 6) {
      throw new ValidationError("Password must be at least 6 characters");
    }

    const user: User = await authenticate("local", req, res);
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

export default nextConnect()
  .use(passport.initialize())
  .use(session(sessionConfig))
  .post(postHandler);
