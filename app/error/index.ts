import { ErrorParser } from './error-parser';
import { BadRequestParser } from './parsers/bad-request';
import { NoInternetConnectionParser } from './parsers/no-internet-connection';


ErrorParser.register(new NoInternetConnectionParser());
ErrorParser.register(new BadRequestParser());

export function toAppException(err: any) {
  return ErrorParser.getError(err);
}