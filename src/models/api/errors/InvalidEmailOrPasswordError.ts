import { UnauthorizedError } from 'routing-controllers';
import L10n from '../../../localization/L10n';

class InvalidEmailOrPasswordError extends UnauthorizedError {
  name = 'InvalidEmailOrPasswordError';
  debugMessage: string;
  userFriendlyMessage: string;
  recoverySuggestion: string;

  constructor() {
    super();
    this.debugMessage = `Invalid email or password`;
    this.userFriendlyMessage = L10n.invalidEmailOrPassword;
  }
}

export default InvalidEmailOrPasswordError;
