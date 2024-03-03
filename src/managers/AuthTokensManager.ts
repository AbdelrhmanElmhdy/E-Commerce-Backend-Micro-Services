import { sign, verify } from 'jsonwebtoken';
import AuthTokensConfig from '../config/AuthTokenConfig';
import { AuthTokenPayload } from '../models/Utility/AuthTokenPayload';
import { AuthToken } from '../models/Utility/AuthToken';

export class AuthTokensManager {
  config: AuthTokensConfig;

  constructor(config: AuthTokensConfig) {
    this.config = config;
  }

  decodeAccessToken(token): AuthToken {
    const tokenDetails = this.getDetailsDateFrom(token, this.config.jwtAccessTokenSecretKey);

    return { token, ...tokenDetails };
  }

  decodeRefreshToken(token): AuthToken {
    const tokenDetails = this.getDetailsDateFrom(token, this.config.jwtRefreshTokenSecretKey);

    return { token, ...tokenDetails };
  }

  generateAccessToken(userId: string, email: string): AuthToken {
    const secretKey = this.config.jwtAccessTokenSecretKey;
    const token = this.generateToken({
      payload: { userId, email },
      secretKey,
      expiresIn: `${this.config.accessTokenExpirationDurationInMinutes}m`,
    });

    const tokenDetails = this.getDetailsDateFrom(token, secretKey);

    return { token, ...tokenDetails };
  }

  generateRefreshToken(userId: string, email: string): AuthToken {
    const secretKey = this.config.jwtRefreshTokenSecretKey;
    const token = this.generateToken({
      payload: { userId, email },
      secretKey,
      expiresIn: `${this.config.refreshTokenExpirationDurationInYears}y`,
    });

    const tokenDetails = this.getDetailsDateFrom(token, secretKey);

    return { token, ...tokenDetails };
  }

  private generateToken(options: { payload: AuthTokenPayload; secretKey: string; expiresIn: string }): string {
    return sign(options.payload, options.secretKey, { expiresIn: options.expiresIn });
  }

  private getDetailsDateFrom(
    token: string,
    secretKey: string
  ): { expirationDate: Date; payload: AuthTokenPayload } {
    const decodedToken: any = verify(token, secretKey);

    // Get the expiration timestamp from the decoded token
    const expirationTimestamp = decodedToken.exp;

    // Convert the expiration timestamp to a JavaScript Date object
    const expirationDate = new Date(expirationTimestamp * 1000);
    const userId = decodedToken.userId;
    const email = decodedToken.email;

    return { expirationDate, payload: { userId, email } };
  }
}
