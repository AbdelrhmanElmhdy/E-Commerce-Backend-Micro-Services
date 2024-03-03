import { Request, Response, NextFunction } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import TokenNotProvidedError from '../models/api/errors/TokenNotProvidedError';
import InvalidTokenError from '../models/api/errors/InvalidTokenError';
import { DependencyContainer } from '../DependencyContainer';
import { InvalidatedAccessToken } from '../models/entities/InvalidatedAccessToken';

export class AuthMiddleware implements ExpressMiddlewareInterface {
  authTokensManager = DependencyContainer.authTokensManager;

  async use(request: Request, response: Response, next: NextFunction): Promise<any> {
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) throw new TokenNotProvidedError();

    try {
      const decodedAccessToken = this.authTokensManager.decodeAccessToken(token);

      // Attach the user id and email to the request for later use in controllers
      request['userId'] = decodedAccessToken.payload.userId;
      request['email'] = decodedAccessToken.payload.email;
    } catch {
      throw new InvalidTokenError();
    }

    const accessTokenIsInvalidated = (await InvalidatedAccessToken.findByPk(token)) != null;

    if (accessTokenIsInvalidated) throw new InvalidTokenError();

    next();
  }
}
