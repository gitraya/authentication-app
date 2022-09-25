import { NextApiResponse } from "next";

const errorHandler = (error: Error, response: NextApiResponse) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "InvalidCredentialsError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "NotFountError") {
    return response.status(404).json({ error: error.message });
  }

  return response.status(500).json({ error: error.message });
};

class InvalidCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export { InvalidCredentialsError, ValidationError, NotFoundError };

export default errorHandler;
