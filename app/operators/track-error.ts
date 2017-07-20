import { Observable } from 'rxjs/Observable';
import { Observer, Operator, Subscriber } from 'rxjs/Rx';
import { alert } from 'ui/dialogs';

import { toAppException } from '../error';
import { AppError } from '../error/app-error';

Observable.prototype.trackError = trackError;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    trackError: typeof trackError;
  }
}

export function trackError<T>(this: Observable<T>, silent: boolean = false): Observable<T> {
  return this.lift(new TrackErrorOperator(silent));
}

class TrackErrorOperator<T> implements Operator<T, T> {
  constructor(private silent: boolean) { }

  call(subscriber: Subscriber<T>, source: any): any {
    return source.subscribe(new TrackErrorSubscriber(subscriber, this.silent));
  }
}

class TrackErrorSubscriber<T> extends Subscriber<T> {

  constructor(destination: Observer<T>, private silent: boolean = false) {
    super(destination);
  }

  protected _complete(): void {
    this.destination.complete();
  }

  protected _next(value?: T): void {
    this.destination.next(value);
  }

  protected _error(err?: any): void {

    const ex = toAppException(err);

    let result = Promise.resolve();

    if (!this.silent && ex instanceof AppError) {
      result = result.then(() => {
        return alert({
          okButtonText: ex.getOkText(),
          title: ex.getTitle(),
          message: ex.getMessage()
        });
      });
    }

    result.then(() => {
      this.destination.error(ex);
    });

  }
}