import { UnauthorizedError } from 'routing-controllers';
import L10n from '../../../localization/L10n';

class InvalidTokenError extends UnauthorizedError {
  name = 'InvalidTokenError';
  debugMessage: string;
  userFriendlyMessage: string;
  recoverySuggestion: string;

  constructor() {
    super();
    this.debugMessage = 'Invalid token';
    this.userFriendlyMessage = L10n.youMustLoginFirst;
    this.recoverySuggestion = L10n.loginAndTryAgain;
  }
}

export default InvalidTokenError;
