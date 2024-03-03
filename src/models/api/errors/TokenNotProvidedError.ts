import { UnauthorizedError } from 'routing-controllers';
import L10n from '../../../localization/L10n';

class TokenNotProvidedError extends UnauthorizedError {
  name = 'TokenNotProvidedError';
  debugMessage: string;
  userFriendlyMessage: string;
  recoverySuggestion: string;

  constructor() {
    super();
    this.debugMessage = 'Token not provided';
    this.userFriendlyMessage = L10n.youMustLoginFirst;
    this.recoverySuggestion = L10n.loginAndTryAgain;
  }
}

export default TokenNotProvidedError;
