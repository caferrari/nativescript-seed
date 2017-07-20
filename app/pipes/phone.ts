import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {

  public transform(value: string): any {
    const dividerPosition = value.length === 11 ? 5 : 4;
    const ddd = value.substr(0, 2);
    const firstPart = value.substr(2, dividerPosition);
    const lastPart = value.substr(dividerPosition, 4);

    return `(${ddd}) ${firstPart}-${lastPart}`;
  }
}
