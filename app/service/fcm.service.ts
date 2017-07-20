import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { device } from 'platform';
import { Observable } from 'rxjs/Rx';

import { ApiHttp } from '../providers/api-http';
import { Storage } from '../providers/storage';

@Injectable()
export class FCMService {

  public static FCM_TOKEN_KEY = 'fcm-token';
  public static FCM_TOKEN_UPLOADED_KEY = 'fcm-token-uploaded';

  constructor(
    private http: ApiHttp,
    private authService: AuthService,
    private storage: Storage
  ) {

    firebase.init({
      onPushTokenReceivedCallback: (token) => {
        console.log('new token received');
        this.setToken(token);
      }
    })
      .then(() => {
        console.log('firebase.init done')
        this.init();
      })
      .catch((error) => console.log('firebase.init error: ' + error))

  }

  public init() {
    const uploaded = this.storage.get<boolean>(FCMService.FCM_TOKEN_UPLOADED_KEY);

    if (uploaded) {
      console.log('FCM token already uploaded');
      return;
    }

    const token = this.storage.get<string>(FCMService.FCM_TOKEN_KEY);

    if (!token) {
      console.log('FCM token not found');
      return;
    }

    this.setToken(token);
  }

  public setToken(token: string): void {
    console.log('updating FCM token');
    this.storage.set(FCMService.FCM_TOKEN_KEY, token);
    this.storage.set(FCMService.FCM_TOKEN_UPLOADED_KEY, false);

    Observable.interval(5000)
      .filter(() => this.authService.isLoggedIn())
      .switchMap(() => this.upload())
      .retry()
      .map(() => this.storage.set<boolean>(FCMService.FCM_TOKEN_UPLOADED_KEY, true))
      .map(() => token)
      .take(1)
      .subscribe(() => console.log('token uploaded!'));
  }

  private upload(): Observable<string> {
    const token = this.storage.get<string>(FCMService.FCM_TOKEN_KEY);

    if (!token) {
      throw new Error('there is no token!');
    }

    console.log('trying to upload the token');

    return this.http
      .post<any>(`/register`, {
        device: device.uuid,
        token
      });
  }

}