interface TokenPayload {
  id: string;
  email: string;
}

interface IAuth {
  email: string;
  password: string;
}

export type { TokenPayload, IAuth };
