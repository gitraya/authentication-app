import { NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "models/user";
import { TokenPayload } from "types/token";
import { RequestExtends } from "types/api";

const tokenExtractor: any = (
  request: RequestExtends,
  response: NextApiResponse
) => {
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
      request.user = (await User.findById(decodedToken.id)) || undefined;
    }
  }
};

export { tokenExtractor, userExtractor };
