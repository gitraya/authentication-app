import { NextApiRequest } from "next";
import { User } from "./user";

interface RequestExtends extends NextApiRequest {
  token?: string;
  user?: User;
}

export type { RequestExtends };
