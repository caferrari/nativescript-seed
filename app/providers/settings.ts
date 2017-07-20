import { Injectable } from '@angular/core';

@Injectable()
export class Settings {

  public get API_ENDPOINT(): string {
    return 'http://10.84.77.139:3000/api/mobile';
  }

}