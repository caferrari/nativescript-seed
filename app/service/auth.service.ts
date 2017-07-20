import { Injectable } from '@angular/core';
import { device } from 'platform';
import { Observable } from 'rxjs/Rx';

import { Http } from '../providers/http';
import { Settings } from '../providers/settings';
import { Storage } from '../providers/storage';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private settings: Settings,
    private storage: Storage
  ) { }

  public login(cpf: string): Observable<void> {

    return this.http
      .post<any>(`${this.settings.API_ENDPOINT}/login`, {
        cpf,
        device: device.uuid,
        platform: device.os
      })
      .map(body => {
        this.storage.set<string>('token', body.token);
      });

  }

  public isLoggedIn(): boolean {
    return !!this.storage.get<string>('token');
  }

  public logout(): void {
    this.storage.set('cpf', null);
    this.storage.set('token', null);
  }


}