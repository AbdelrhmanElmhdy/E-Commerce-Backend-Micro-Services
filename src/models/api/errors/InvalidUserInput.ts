import { HttpError } from 'routing-controllers';

class InvalidUserInput extends HttpError {
  name = 'InvalidUserInput';
  debugMessage: string;
  userFriendlyMessage: string;
  recoverySuggestion: string;
  invalidField: string;

  constructor(fieldName: string, localizedMessage: string) {
    super(412);
    this.debugMessage = `Invalid ${fieldName}`;
    this.userFriendlyMessage = localizedMessage;
    this.invalidField = fieldName;
  }
}

export default InvalidUserInput;
