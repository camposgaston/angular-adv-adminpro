import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Finished Promise message');
      } else {
        reject('Something went wrong');
      }
    });
    promise.then((message) => {
      console.log(message);
    })
      .catch(error => {
        console.log('Promise error', error);
      });
    console.log('Init end');
  }

}
