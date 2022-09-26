import User from "models/user";
import type { GetOrCreateUser, User as UserType } from "types/user";
import { NotFoundError } from "utils/errors";

export const getOrCreateUser: GetOrCreateUser = async (email, name) => {
  try {
    let user: UserType = await User.findOne({ email }).exec();

    if (user) {
      return user;
    } else if (email) {
      const newUser = new User({
        email,
        name,
      });
      await newUser.save();

      return newUser;
    }

    throw new NotFoundError("User not found");
  } catch (error: any) {
    throw error;
  }
};
