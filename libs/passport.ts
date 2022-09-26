import bcrypt from "bcrypt";
import passport from "passport";
import Local from "passport-local";
import Google from "passport-google-oidc";
import Facebook from "passport-facebook";
import Github from "passport-github2";
import Twitter from "passport-twitter";
import type { Authenticate } from "types/passport";
import User from "models/user";
import { User as UserType } from "types/user";
import { InvalidCredentialsError } from "utils/errors";
import { getOrCreateUser } from "libs/users";

const scopes: any = {
  google: ["profile", "email"],
  facebook: ["email"],
};

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
    callbackURL: `${process.env.APP_URL}/api/auth/login/google`,
    scope: scopes.google,
  },
  async (issuer: any, profile: any, done: any) => {
    try {
      const email = profile?.emails[0]?.value || "";
      const user: UserType = await getOrCreateUser(email, profile.displayName);

      done(null, user);
    } catch (error: any) {
      done(error);
    }
  }
);

const facebookStrategy = new Facebook.Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID || "",
    clientSecret: process.env.FACEBOOK_APP_SECRET || "",
    callbackURL: `${process.env.APP_URL}/api/auth/login/facebook`,
    profileFields: ["id", "displayName", "email"],
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      const { email, name } = profile._json;
      const user: UserType = await getOrCreateUser(email, name);

      done(null, user);
    } catch (error: any) {
      done(error);
    }
  }
);

const githubStrategy = new Github.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: `${process.env.APP_URL}/api/auth/login/github`,
  },
  async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
      const { email, name } = profile._json;
      const user: UserType = await getOrCreateUser(email, name);

      done(null, user);
    } catch (error: any) {
      done(error);
    }
  }
);

const twitterStrategy = new Twitter.Strategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || "",
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || "",
    callbackURL: `${process.env.APP_URL}/api/auth/login/twitter`,
    includeEmail: true,
  },
  async (token: any, tokenSecret: any, profile: any, done: any) => {
    try {
      const { email, name } = profile._json;
      const user: UserType = await getOrCreateUser(email, name);

      done(null, user);
    } catch (error: any) {
      done(error);
    }
  }
);

const authenticate: Authenticate = (method, request, response) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      method,
      { session: false, ...(scopes[method] && { scope: scopes[method] }) },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    )(request, response);
  });

passport.use("local", localStrategy);
passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);
passport.use("github", githubStrategy);
passport.use("twitter", twitterStrategy);

export default authenticate;
