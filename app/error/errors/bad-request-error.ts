
import { AppError } from '../app-error';

export class BadRequestError extends AppError {
  constructor(public message: string = 'Erro ao enviar sua solicitação ao servidor', public title: string = '', public okText = 'Ok') {
    super(message, title, okText);
  }
}