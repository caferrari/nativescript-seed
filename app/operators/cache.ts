import { Observable } from 'rxjs/Observable';
import { Observer, Operator, Subscriber } from 'rxjs/Rx';
import * as applicationSettings from 'application-settings';

Observable.prototype.cache = cache;

interface CacheResponse<T> {
  cached: boolean;
  value: T;
}

interface CacheObject<T> {
  createdAt: number;
  expiresAt: number;
  data: T;
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    cache: typeof cache;
  }
}

export function cache<T>(this: Observable<T>, key: string, ttl?: number): Observable<CacheResponse<T>> {
  return this.lift(new CacheOperator(key, ttl));
}

class CacheOperator<T> implements Operator<T, CacheResponse<T>> {
  constructor(private key: string, private ttl?: number) { }

  call(subscriber: Subscriber<CacheResponse<T>>, source: any): any {
    new CacheSubscriber(source, subscriber, this.key, this.ttl);
  }
}

class CacheSubscriber<T> extends Subscriber<T> {

  private key: string;
  private cacheFound: boolean;

  constructor(
    private source: any,
    destination: Observer<T>,
    key: string,
    private ttl: number = 10000000
  ) {
    super(destination);

    this.key = `cache_${key}`;

    const cacheData = this.getCache();

    if (cacheData) {
      this.destination.next({
        cached: true,
        value: cacheData
      });
      this.cacheFound = true;
    }

    this.source.subscribe(this);
  }

  protected _next(value?: any): void {
    this.setCache(value);
    this.destination.next({
      cached: false,
      value
    });
  }

  protected _error(err?: any): void {
    if (!this.cacheFound) {
      this.destination.error(err);
    }
    this.destination.complete();
  }

  private setCache(data: T): void {
    const now = Math.ceil(Date.now() / 1000);
    applicationSettings.setString(this.key, JSON.stringify({
      createdAt: now,
      expiresAt: now + this.ttl,
      data
    }));
  }

  private getCache(): T {
    const jsondata = applicationSettings.getString(this.key);

    if (!jsondata) {
      return null;
    }

    const data = <CacheObject<T>>JSON.parse(jsondata);

    const now = Math.ceil(Date.now() / 1000);

    if (data.createdAt > now || data.expiresAt <= now) {
      applicationSettings.remove(this.key);
      return null;
    }

    return data.data;
  }

}