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

    let i = -1;

    const obs$ = new Observable(observer => {

      const interval = setInterval(() => {

        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }
        if (i === 2) {
          i = 0;
          observer.error('i llego al valor de 2');
        }
      }, 1000);

    });

    obs$.pipe(
      retry(2)
    ).subscribe(
      valor => console.log('subs:', valor),
      (err) => console.warn('Error:', err),
      () => console.log('Observable finished')
    );
  }

}
