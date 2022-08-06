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

export type { User };
