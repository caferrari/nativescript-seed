
import { AppError } from '../app-error';

export class NoInternetConnectionError extends AppError {
  constructor(public message: string = 'Não foi possível se conectar com o servidor', public title: string = '', public okText = 'Ok') {
    super(message, title, okText);
  }
}