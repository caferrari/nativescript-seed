import { AppError } from '../app-error';
import { BadRequestError } from '../errors/bad-request-error';
import { messages } from '../messages';
import { Parser } from '../parser';

export class BadRequestParser implements Parser {

  public getException(err: any): AppError {
    const msg = err.json().message;
    return new BadRequestError(messages[msg] || msg);
  }

  public match(err: any): boolean {
    return (err && err.status == 400 && err.json().message);
  }

}