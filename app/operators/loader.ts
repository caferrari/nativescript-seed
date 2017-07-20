import { LoadingIndicator } from 'nativescript-loading-indicator';
import { Observable } from 'rxjs/Observable';
import { Observer, Operator, Subscriber } from 'rxjs/Rx';

Observable.prototype.loader = loader;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    loader: typeof loader;
  }
}

export function loader<T>(this: Observable<T>, message: string): Observable<T> {
  return this.lift(new LoaderOperator(message));
}

class LoaderOperator<T> implements Operator<T, T> {
  constructor(private message: string) { }

  call(subscriber: Subscriber<T>, source: any): any {
    return source.subscribe(new LoaderSubscriber(subscriber, this.message));
  }
}

let loaderCount = 0;
const _loader = new LoadingIndicator();

class LoaderSubscriber<T> extends Subscriber<T> {

  private hided = false;

  constructor(destination: Observer<T>,
    private message: string) {
    super(destination);
    this.show();
  }

  protected _next(value?: any): void {
    this.hide();
    this.destination.next(value);
  }

  protected _complete(): void {
    this.hide();
    this.destination.complete();
  }

  protected _error(err?: any): void {
    this.hide();
    this.destination.error(err);
    this.destination.complete();
  }

  protected show(): void {
    if (loaderCount > 0) {
      return;
    }
    loaderCount++;

    _loader.show({
      message: this.message,
      android: {
        indeterminate: true,
        cancelable: false,
        progressStyle: 1,
        secondaryProgress: 1
      },
      ios: {
        square: false,
        margin: 10,
        dimBackground: true,
        color: '#666666',
        mode: 'MBProgressHUDModeDeterminate'
      }
    });
  }

  protected hide(): void {

    if (this.hided) {
      return;
    }

    this.hided = true;
    loaderCount--;
    if (loaderCount <= 0) {
      _loader.hide();
      loaderCount = 0;
    }
  }
}