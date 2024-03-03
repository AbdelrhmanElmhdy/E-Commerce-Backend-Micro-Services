import { AuthTokenPayload } from './AuthTokenPayload';

export interface AuthToken {
  token: string;
  expirationDate: Date;
  payload: AuthTokenPayload;
}
