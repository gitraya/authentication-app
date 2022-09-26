import bcrypt from "bcrypt";
import type { NextApiResponse } from "next";
import { connectMongo } from "libs/mongo";
import User from "models/user";
import { RequestExtends } from "types/api";
import { tokenExtractor, userExtractor } from "utils/auth";
import errorHandler, {
  InvalidCredentialsError,
  NotFoundError,
} from "utils/errors";
import { uploadImage } from "services/cloudinary";
import validator from "utils/validator";
import { User as UserType } from "types/user";

const put = async (req: RequestExtends, res: NextApiResponse) => {
  try {
    if (!req.user?._id || req.user._id.toString() !== req.query.id) {
      throw new InvalidCredentialsError("Not authorized!");
    }

    await connectMongo();

    const id = req.query.id as string;
    let user: UserType | null = await User.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (req.body.password) {
      const password = req.body.password as string;
      delete req.body.password;

      validator.checkPassword(password);

      const passwordHash: string = await bcrypt.hash(password, 10);
      req.body.passwordHash = passwordHash;
    }

    if (req.body.photo) {
      const { secure_url } = await uploadImage(req.body.photo, user.email);
      delete req.body.photo;
      req.body.photoUrl = secure_url;
    }

    user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    }).exec();

    res.status(200).json(user);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const get = async (req: RequestExtends, res: NextApiResponse) => {
  try {
    if (!req.user?._id) {
      throw new InvalidCredentialsError("Not authorized!");
    }

    await connectMongo();

    const id = req.query.id as string;
    const user: UserType | null = await User.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json(user);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const usersHandler = async (req: RequestExtends, res: NextApiResponse) => {
  tokenExtractor(req, res);
  await userExtractor(req, res);

  switch (req.method) {
    case "PUT":
      return put(req, res);
    case "GET":
      return get(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};

export default usersHandler;
