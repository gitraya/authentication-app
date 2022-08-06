import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../libs/mongo";
import { generateAuthToken } from "../../libs/auth";
import User from "../../models/user";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();

    const { email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      passwordHash,
    });
    await user.save();

    const token = await generateAuthToken(user);

    res.status(201).json({ token, email: user.email });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const registerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

export default registerHandler;
