import { InterceptorInterface, Action, Interceptor } from 'routing-controllers';

@Interceptor()
export class SnakeCaseInterceptor implements InterceptorInterface {
  private toSnakeCase(input: any): any {
    if (input === null || typeof input !== 'object') {
      return input;
    }

    if (Array.isArray(input)) {
      return input.map(item => this.toSnakeCase(item));
    }

    return Object.keys(input).reduce((acc: any, key: string) => {
      // Remove leading underscore if any
      const snakeCaseKey = key.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`).replace(/^_/, '');

      acc[snakeCaseKey] = this.toSnakeCase(input[key]);
      return acc;
    }, {});
  }

  intercept(action: Action, content: any) {
    return this.toSnakeCase(content);
  }
}
