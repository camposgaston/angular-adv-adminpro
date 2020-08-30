import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   (err) => console.warn('Error:', err),
    //   () => console.log('Observable finished')
    // );
    this.intervalSubs = this.returnInterval().subscribe(console.log);

  }
  
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(500)
      .pipe(
        // take(10),
        map(valor => valor + 1), // 0=>0+1
        filter(valor => (valor % 2 === 0) ? true : false)
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
