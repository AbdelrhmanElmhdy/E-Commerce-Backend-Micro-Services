import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import i18n from 'i18n';
import { Request, Response } from 'express';
import { Config } from '../config/config';

@Middleware({ type: 'before' })
export class LocalizationMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: (err?: any) => any): any {
    i18n.configure({
      locales: Config.api.supportedLocales,
      defaultLocale: Config.api.defaultLocale,
      directory: __dirname + '/../localization/locales',
      objectNotation: true,
      updateFiles: false,
    });

    // Extract locale from the URL or use the default
    const locale = Config.api.supportedLocales.includes(req.params.locale)
      ? req.params.locale
      : Config.api.defaultLocale;

    i18n.init(req, res);
    i18n.setLocale(locale);

    next();
  }
}
