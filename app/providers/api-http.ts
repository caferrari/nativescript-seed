import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Http } from './http';
import { Settings } from './settings';
import { Storage } from './storage';


@Injectable()
export class ApiHttp {

  constructor(
    private http: Http,
    private storage: Storage,
    private settings: Settings
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.http
      .get(this.compileUrl(url), this.getOptions());
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post(this.compileUrl(url), body, this.getOptions());
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put(this.compileUrl(url), body, this.getOptions());
  }

  private compileUrl(url: string): string {
    return `${this.settings.API_ENDPOINT}${url}`;
  }

  private getOptions() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', `bearer ${this.storage.get('token')}`);

    return {
      headers
    }
  }

}