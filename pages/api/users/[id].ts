import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../libs/mongo";
import User from "../../../models/user";
import errorHandler from "../../../utils/errors";

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const id = req.query.id as string;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.update(req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    await user.save();

    res.status(200).json(user);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

const usersHandler = (req: NextApiRequest, res: NextApiResponse) => {
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
