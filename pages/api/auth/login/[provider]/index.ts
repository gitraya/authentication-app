import nextConnect from "next-connect";
import passport from "passport";
import session from "express-session";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "libs/mongo";
import { generateAuthToken } from "libs/auth";
import type { User } from "types/user";
import authenticate from "libs/passport";
import { session as sessionConfig } from "utils/configs";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const user: User = await authenticate(req.query.provider, req, res);
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
    console.error(error.message);
    res.redirect("/register");
  }
};

export default nextConnect()
  .use(passport.initialize())
  .use(session(sessionConfig))
  .get(getHandler);
