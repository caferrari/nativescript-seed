import { Parser } from './parser';

export class ErrorParser {

  private static parsers: Parser[] = [];

  private constructor() { }

  static register(parser: Parser): void {
    ErrorParser.parsers.push(parser);
  }

  static getError(err: any): any {
    const parser = ErrorParser.parsers.find(parser => parser.match(err));

    if (parser) {
      return parser.getException(err);
    }

    return err;

  }

}