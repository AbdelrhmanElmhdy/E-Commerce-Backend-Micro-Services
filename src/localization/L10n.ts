import i18n from 'i18n';

class L10n {
  static get internalServerError() {
    return i18n.__('internalServerError');
  }

  static get emailAlreadyInUse(): string {
    return i18n.__('emailAlreadyInUse');
  }

  static get invalidEmailOrPassword(): string {
    return i18n.__('invalidEmailOrPassword');
  }

  static get youMustLoginFirst(): string {
    return i18n.__('youMustLoginFirst');
  }

  static get loginAndTryAgain(): string {
    return i18n.__('loginAndTryAgain');
  }

  private constructor() {}
}

export default L10n;
