import AuthTokensConfig from './AuthTokenConfig';
import businessConfig from './businessConfig';
import { apiConfig } from './apiConfig';
import { databaseConfig } from './databaseConfig';

export class Config {
  static authTokens = new AuthTokensConfig();
  static business = businessConfig;
  static api = apiConfig;
  static database = databaseConfig;

  private constructor() {}
}
