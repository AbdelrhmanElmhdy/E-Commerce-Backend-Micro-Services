import { AuthToken } from '../../Utility/AuthToken';

type TokenDetails = {
  token: string;
  expirationDate: number;
};

export class AuthTokensResponse {
  accessToken: TokenDetails;
  refreshToken: TokenDetails;

  constructor(values: { accessToken: AuthToken; refreshToken: AuthToken }) {
    this.accessToken = {
      token: values.accessToken.token,
      expirationDate: values.accessToken.expirationDate.getTime(),
    };

    this.refreshToken = {
      token: values.refreshToken.token,
      expirationDate: values.refreshToken.expirationDate.getTime(),
    };
  }
}
