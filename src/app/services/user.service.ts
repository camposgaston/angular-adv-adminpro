import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



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
