import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../../libs/mongo";
import User from "../../../models/user";
import errorHandler from "../../../utils/errors";

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const usersHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return get(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default usersHandler;
