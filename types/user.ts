import { Types } from "mongoose";

interface User {
  _id: Types.ObjectId;
  name?: string;
  phone?: string;
  email: string;
  passwordHash?: string;
  photoUrl?: string;
  bio?: string;
}

interface ModelUser {
  name?: string;
  phone?: string;
  email: string;
  passwordHash?: string;
  photoUrl?: string;
  bio?: string;
}

export type GetOrCreateUser = (email: string, name: string) => Promise<User>;

export type { User, ModelUser };
