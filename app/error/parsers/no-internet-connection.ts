import { AppError } from '../app-error';
import { NoInternetConnectionError } from '../errors/no-internet-connection-error';
import { Parser } from '../parser';

export class NoInternetConnectionParser implements Parser {

  public getException(): AppError {
    return new NoInternetConnectionError();
  }

  public match(err: any): boolean {
    return (err && err.status == 200 && err.type == 3);
  }

}