import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { GetUsers } from '../interfaces/get-users.interface';

import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        token: this.token
      }
    }
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
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '989956429521-f1jmqd58qvti18bvfnip5f1p31uio62p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });

  }

  tokenValidation(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        token: this.token
      }
    }).pipe(
      map((resp: any) => {
        // default img ='' when no image in db stored
        const { email, google, img = '', lastName, name, role, uid } = resp.user;

        this.user = new User(name, lastName, email, '', google, role, img, uid);

        // Renew Token
        localStorage.setItem('token', resp.token);
        return true;
      }),
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

  updateUserProfile(data: { name: string, lastName: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        token: this.token
      }
    });
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

  getUsers(from: number = 0) {

    // http://localhost:3000/api/users?from=5
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<GetUsers>(url, this.headers)
      .pipe(
        map(resp => {
          const users = resp.users.map(
            user => new User(user.name, user.lastName, user.email, '', user.google, user.role, user.img, user.uid)
          );

          return {
            total: resp.total,
            users
          };
        })
      );

  }

}
