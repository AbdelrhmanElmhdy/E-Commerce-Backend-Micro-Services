import { JsonController, Body, Post, InternalServerError, UseBefore, Req, OnUndefined } from 'routing-controllers';
import { User, UserScope } from '../models/entities/User';
import { compare, hash } from 'bcryptjs';
import RegisterRequestBody from '../models/api/requests/RegisterRequestBody';
import AuthenticationResponse from '../models/api/responses/AuthenticationResponse';
import EmailAlreadyInUseError from '../models/api/errors/EmailAlreadyInUseError';
import InvalidEmailOrPasswordError from '../models/api/errors/InvalidEmailOrPasswordError';
import { v4 as UUID } from 'uuid';
import { RefreshToken } from '../models/entities/RefreshToken';
import { DependencyContainer } from '../DependencyContainer';
import { AuthTokensResponse } from '../models/api/responses/AuthTokensResponse';
import InvalidTokenError from '../models/api/errors/InvalidTokenError';
import { InvalidatedRefreshToken } from '../models/entities/InvalidatedRefreshToken';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { InvalidatedAccessToken } from '../models/entities/InvalidatedAccessToken';
import { Request } from 'express';

@JsonController('/auth')
export class AuthController {
  authTokensManager = DependencyContainer.authTokensManager;

  // MARK: Routes

  @Post('/register')
  async register(@Body({ required: true }) userData: RegisterRequestBody): Promise<AuthenticationResponse> {
    // Check if the email is already registered
    const isEmailIsUse = await this.isEmailIsUse(userData.email);
    if (isEmailIsUse) throw new EmailAlreadyInUseError();

    // Hash the password before saving to the database
    const hashedPassword = await hash(userData.password, 10);

    // Create a new user
    const user = await User.create({
      id: UUID(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });

    // Generate JWT tokens
    const accessToken = this.authTokensManager.generateAccessToken(user.id, userData.email);
    const refreshToken = this.authTokensManager.generateRefreshToken(user.id, userData.email);

    // Store refresh token
    RefreshToken.create({ id: UUID(), ...refreshToken, userId: user.id, invalidatedRefreshTokens: [] });

    // Return the tokens and user information
    return new AuthenticationResponse({ accessToken, refreshToken, user });
  }

  @Post('/login')
  async login(@Body() userData: { email: string; password: string }): Promise<AuthenticationResponse> {
    // Find the user by email
    const user = await User.scope(UserScope.includingSensitiveData).findOne({ where: { email: userData.email } });

    // Check if the user exists
    if (!user) throw new InvalidEmailOrPasswordError();

    // Check if the password is correct
    const passwordIsCorrect = await compare(userData.password, user.dataValues.password);
    if (!passwordIsCorrect) throw new InvalidEmailOrPasswordError();

    // Generate JWT tokens
    const accessToken = this.authTokensManager.generateAccessToken(user.id, userData.email);
    const refreshToken = this.authTokensManager.generateRefreshToken(user.id, userData.email);

    // Store refresh token
    RefreshToken.create({ id: UUID(), ...refreshToken, userId: user.id, invalidatedRefreshTokens: [] });

    // Return the tokens and user information
    return new AuthenticationResponse({ accessToken, refreshToken, user });
  }

  @Post('/refresh-token')
  async refreshToken(@Body() { refresh_token: refreshToken }: { refresh_token: string }): Promise<object> {
    try {
      const decodedRefreshToken = this.authTokensManager.decodeRefreshToken(refreshToken);

      // Check if refresh token is invalidated
      const invalidatedRefreshToken = await InvalidatedRefreshToken.findOne({
        where: { token: refreshToken },
        include: [RefreshToken],
      });

      if (invalidatedRefreshToken) {
        invalidatedRefreshToken.dataValues.activeRefreshToken.destroy();
        throw new Error(); // Will be intercepted in the catch block
      }

      const activeRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });
      if (!activeRefreshToken) throw new Error(); // Will be intercepted in the catch block

      const { userId, email } = decodedRefreshToken.payload;

      // Generate JWT tokens pair
      const newAccessToken = this.authTokensManager.generateAccessToken(userId, email);
      const newRefreshToken = this.authTokensManager.generateRefreshToken(userId, email);

      // Store new refresh token
      activeRefreshToken.update({ ...newRefreshToken });

      // Store the old refresh token in the invalidated tokens table
      InvalidatedRefreshToken.create({
        token: decodedRefreshToken.token,
        activeRefreshTokenId: activeRefreshToken.id,
      });

      // Return the new tokens
      return new AuthTokensResponse({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch {
      throw new InvalidTokenError();
    }
  }

  @UseBefore(AuthMiddleware)
  @OnUndefined(200)
  @Post('/logout')
  async logout(@Req() request: Request, @Body() { refresh_token: refreshToken }: { refresh_token: string }) {
    const accessToken = request.headers['authorization']?.split(' ')[1];
    const { expirationDate } = this.authTokensManager.decodeAccessToken(accessToken);

    // Revoke the access token
    InvalidatedAccessToken.create({ token: accessToken, expirationDate });

    // Revoke the refresh token
    RefreshToken.destroy({ where: { token: refreshToken } });
  }

  // MARK: Convenience

  private async isEmailIsUse(email: string): Promise<boolean> {
    const existingUser = await User.findOne({ where: { email } });
    return existingUser ? true : false;
  }
}
