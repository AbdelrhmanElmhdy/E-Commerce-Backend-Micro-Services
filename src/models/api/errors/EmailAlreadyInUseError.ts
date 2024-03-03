import { HttpError } from 'routing-controllers';
import L10n from '../../../localization/L10n';

class EmailAlreadyInUseError extends HttpError {
  name = 'EmailAlreadyInUse';
  debugMessage: string;
  userFriendlyMessage: string;
  recoverySuggestion: string;

  constructor() {
    super(409);
    this.debugMessage = `Email is already in use`;
    this.userFriendlyMessage = L10n.emailAlreadyInUse;
  }
}

export default EmailAlreadyInUseError;
