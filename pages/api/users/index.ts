import type { NextApiResponse } from "next";
import { connectMongo } from "../../../libs/mongo";
import User from "../../../models/user";
import errorHandler from "../../../utils/errors";
import { tokenExtractor, userExtractor } from "../../../utils/auth";
import { RequestExtends } from "../../../types/api";

const get = async (req: RequestExtends, res: NextApiResponse) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ error: "Not authorized!" });
    }

    await connectMongo();
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const usersHandler = async (req: RequestExtends, res: NextApiResponse) => {
  tokenExtractor(req, res);
  await userExtractor(req, res);

  switch (req.method) {
    case "GET":
      return get(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default usersHandler;
