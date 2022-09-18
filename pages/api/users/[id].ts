import bcrypt from "bcrypt";
import type { NextApiResponse } from "next";
import { connectMongo } from "../../../libs/mongo";
import User from "../../../models/user";
import { RequestExtends } from "../../../types/api";
import { tokenExtractor, userExtractor } from "../../../utils/auth";
import errorHandler from "../../../utils/errors";

const put = async (req: RequestExtends, res: NextApiResponse) => {
  try {
    if (!req.user?._id || req.user._id.toString() !== req.query.id) {
      return res.status(401).json({ error: "Not authorized!" });
    }

    await connectMongo();

    const id = req.query.id as string;
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.password) {
      const password = req.body.password as string;
      delete req.body.password;
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      if (!passwordPattern.test(password)) {
        return res.status(400).json({
          error:
            "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      req.body.passwordHash = passwordHash;
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
      return res.status(401).json({ error: "Not authorized!" });
    }

    await connectMongo();

    const id = req.query.id as string;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
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

export default usersHandler;
