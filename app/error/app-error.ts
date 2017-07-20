
export abstract class AppError {

  constructor(public message: string = '', public title: string = '', public okText = 'Ok') {

  }

  getTitle(): string {
    return this.title
  }

  getMessage(): string {
    return this.message;
  }

  getOkText(): string {
    return this.okText;
  }

}