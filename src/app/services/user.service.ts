import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  googleInit() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '989956429521-f1jmqd58qvti18bvfnip5f1p31uio62p.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
    });
  }

  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        token
      }
    }).pipe(
      tap((resp: any) => {
        // Renew Token
        localStorage.setItem('token', resp.token);
      }), map(resp => true),
      catchError(error => of(false))
    );

  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {
    console.log('info enviada al back: ', formData);
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(googleToken) {
    return this.http.post(`${base_url}/login/google`, googleToken)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
