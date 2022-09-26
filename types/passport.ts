import { NextApiRequest, NextApiResponse } from "next";

export type Method = "local" | "google" | "facebook" | "twitter" | "github";

export type Authenticate = (
  method: Method,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<any>;
