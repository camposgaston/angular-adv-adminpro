import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {



    this.returnObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('subs:', valor),
      (err) => console.warn('Error:', err),
      () => console.log('Observable finished')
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>(observer => {

      const interval = setInterval(() => {

        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
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
