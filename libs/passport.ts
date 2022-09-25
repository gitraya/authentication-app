import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import passport from "passport";
import Local from "passport-local";
import Google from "passport-google-oidc";
import type { Method } from "types/passport";
import User from "models/user";
import { User as UserType } from "types/user";
import { InvalidCredentialsError, NotFoundError } from "utils/errors";

export const localStrategy = new Local.Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const error = new InvalidCredentialsError("Invalid email or password");

    try {
      const user: UserType = await User.findOne({ email }).exec();

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash || "");

      if (user && passwordCorrect) {
        return done(null, user);
      }

      done(error);
    } catch (error: any) {
      done(error);
    }
  }
);

export const googleStrategy = new Google.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["email", "profile"],
  },
  async (issuer: any, profile: any, done: any) => {
    try {
      const email = profile?.emails[0]?.value || "";
      const user: UserType = await User.findOne({ email }).exec();

      if (user) {
        return done(null, user);
      }

      done(new NotFoundError("User not found"));
    } catch (error: any) {
      done(error);
    }
  }
);

const authenticate: any = (
  method: Method,
  request: NextApiRequest,
  response: NextApiResponse
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(request, response);
  });

passport.use("local", localStrategy);
passport.use("google", googleStrategy);

export default authenticate;
