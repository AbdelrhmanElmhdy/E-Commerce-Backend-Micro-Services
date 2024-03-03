import { AuthToken } from '../../Utility/AuthToken';
import { User } from '../../entities/User';
import { AuthTokensResponse } from './AuthTokensResponse';
import UserResponse from './UserResponse';

class AuthenticationResponse {
  authTokens: AuthTokensResponse;
  user: UserResponse;

  constructor(values: { accessToken: AuthToken; refreshToken: AuthToken; user: User }) {
    this.authTokens = new AuthTokensResponse({ ...values });
    this.user = new UserResponse(values.user);
  }
}

export default AuthenticationResponse;
