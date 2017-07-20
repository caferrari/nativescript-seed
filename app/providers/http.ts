
import { Injectable } from '@angular/core';
import { Http as OriginalHttp, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Http {

  constructor(
    private http: OriginalHttp
  ) { }

  public get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
    return this.http
      .get(url, options)
      .map(response => response.json());
  }

  public post<T>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
    return this.http
      .post(url, body, options)
      .map(response => response.json());
  }

  public put<T>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
    return this.http
      .put(url, body, options)
      .map(response => response.json());
  }

}