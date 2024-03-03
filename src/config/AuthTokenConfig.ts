import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

class AuthTokensConfig {
  accessTokenExpirationDurationInMinutes = 30;
  refreshTokenExpirationDurationInYears = 2;
  jwtAccessTokenSecretKey = process.env.JWT_TOKEN_SECRET_KEY;
  jwtRefreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;
}

export default AuthTokensConfig;
