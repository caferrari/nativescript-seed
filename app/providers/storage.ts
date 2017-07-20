import { Injectable } from '@angular/core';
import * as applicationSettings from 'application-settings';

@Injectable()
export class Storage {

  public get(key: 'cpf'): string;
  public get<T>(key: string): T;
  public get(key: string): any {
    return JSON.parse(applicationSettings.getString(key, 'null'));
  }

  public set<T>(key: string, data: T): T {
    applicationSettings.setString(key, JSON.stringify(data));
    return data;
  }

  public clear(): void {
    const token = applicationSettings.getString('fcm-token');
    applicationSettings.clear();
    applicationSettings.setString('fcm-token', token);
  }
}