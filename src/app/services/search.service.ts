import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctors.model';

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

  private transformUsers(results: User[]): User[] {
    return results.map(
      user => new User(user.name, user.lastName, user.email, '', user.google, user.role, user.img, user.uid)
    );
  }

  private transformHospital(results: Hospital[]): Hospital[] {
    return results.map(
      hospital => new Hospital(hospital.name, hospital.hid, hospital.createdBy, hospital.img)
    );
  }

  private transformDoctor(results: Doctor[]): Doctor[] {
    return results.map(
      doctor => new Doctor(doctor.name, doctor.did, doctor.createdBy, doctor.img, doctor.hospital)
    );
  }


  globalsearch(term: string) {
    const url = `${base_url}/all/${term}`;
    return this.http.get<any[]>(url, this.headers);
  }

  search(
    collection: 'users' | 'doctors' | 'hospitales',
    term: string = ''
  ) {
    const url = `${base_url}/all/collection/${collection}/${term}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (collection) {
            case 'users':
              return this.transformUsers(resp.result);

            case 'hospitales':
              return this.transformHospital(resp.result);

            case 'doctors':
              return this.transformDoctor(resp.result);

            default:
              return [];
          }

        })
      );
  }

}
