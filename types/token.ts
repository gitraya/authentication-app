import { User } from "types/user";

interface TokenPayload {
  id: string;
  email: string;
}

interface IAuth {
  email: string;
  password: string;
}

export type GenerateAuthToken = (user: User) => string;

export type { TokenPayload, IAuth };
