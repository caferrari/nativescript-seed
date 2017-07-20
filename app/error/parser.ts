import { AppError } from './app-error';

export interface Parser {
  getException(err: any): AppError;
  match(err: any): boolean;
}