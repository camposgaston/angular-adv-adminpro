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
    this.getUsers().then(usuarios => {
      // console.log(usuarios);
    });
    // Promise example
    // const promise = new Promise((resolve, reject) => {
    //   if (false) { resolve('Finished Promise message'); }
    //   else { reject('Something went wrong'); }
    // });
    // promise.then((message) => { console.log(message); })
    //   .catch(error => { console.log('Promise error', error); });
    // console.log('Init end');

  }

  getUsers(): any {
    return new Promise((resolve, reject) => {


      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });

  }

}
