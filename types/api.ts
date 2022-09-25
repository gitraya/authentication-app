import { NextApiRequest } from "next";
import { User } from "types/user";

interface RequestExtends extends NextApiRequest {
  token?: string;
  user?: User;
}

export type { RequestExtends };
