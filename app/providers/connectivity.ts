import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import * as connectivity from 'tns-core-modules/connectivity';

@Injectable()
export class Connectivity {

  private connectivity$ = new BehaviorSubject<connectivity.connectionType>(connectivity.getConnectionType());

  constructor() {
    connectivity.startMonitoring((connectivity: connectivity.connectionType) => {
      this.connectivity$.next(connectivity);
    });
  }

  public typeStream(): Observable<connectivity.connectionType> {
    return this.connectivity$.asObservable().distinctUntilChanged();
  }

  public connectedStream(): Observable<boolean> {
    return this.connectivity$.asObservable().map(type => !!type).distinctUntilChanged();
  }

}