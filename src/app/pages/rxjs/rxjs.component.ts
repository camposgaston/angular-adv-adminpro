import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.returnObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   (err) => console.warn('Error:', err),
    //   () => console.log('Observable finished')
    // );
    this.returnInterval()
      .subscribe(console.log);
  }

  returnInterval(): Observable<number> {
    return interval(1000)
      .pipe(
        take(4),
        map(valor => valor + 1)
      );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {

      const intervalObs = setInterval(() => {

        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalObs);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);

    });
    return obs$;
  }

}
