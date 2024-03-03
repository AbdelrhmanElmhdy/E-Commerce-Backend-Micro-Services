import { Config } from './config/config';
import { AuthTokensManager } from './managers/AuthTokensManager';

export class DependencyContainer {
  static authTokensManager = new AuthTokensManager(Config.authTokens);
}
