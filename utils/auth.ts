import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User as UserType } from "../types/user";
import User from "../models/user";
import { TokenPayload } from "../types/token";

interface RequestExtends extends NextApiRequest {
  token?: string;
  user?: UserType;
}

const tokenExtractor = (request: RequestExtends, response: NextApiResponse) => {
  const authorization = request.headers.authorization || "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
};

const userExtractor = async (
  request: RequestExtends,
  response: NextApiResponse
) => {
  if (request.token) {
    const decodedToken: TokenPayload | string | JwtPayload = jwt.verify(
      request.token,
      process.env.JWT_SECRET || "secret"
    );

    if (typeof decodedToken === "object") {
      if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
      }

      request.user = (await User.findById(decodedToken.id)) || undefined;
    }
  }
};

export { tokenExtractor, userExtractor };
