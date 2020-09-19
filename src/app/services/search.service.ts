import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        token: this.token
      }
    }
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.lastName, user.email, '', user.google, user.role, user.img, user.uid)
    );
  }

  search(
    collection: 'users' | 'doctors' | 'hospitals',
    term: string = ''
  ) {
    const url = `${base_url}/all/collection/${collection}/${term}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (collection) {
            case 'users':
              return this.transformUsers(resp.result);

            default:
              break;
          }

        })
      );
  }

}
