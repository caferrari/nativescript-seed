import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {

  constructor() { }

  public transform(cpf: string): string {
    let value = (cpf && cpf.replace(/[^0-9]/g, '').substr(0, 12)) || '';
    let result = '';
    while (value.length && result.length < 9) {
      result += value.substr(0, 3);
      if (value.length > 3 && result.length < 8) {
        result += '.';
      }
      value = value.substr(3);
    }
    if (value.length) {
      result += '-' + value.substr(0, 2);
    }
    return result;
  }
}
