import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    const obs$ = new Observable(observer => {

      let i = -1;
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

    obs$.subscribe(
      valor => console.log('subs:', valor),
      (err) => console.warn('Error:', err),
      () => console.log('Observable finished')
    );
  }

}
