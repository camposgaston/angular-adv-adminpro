import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        token: this.token
      }
    };
  }

  getHospitals() {

    // http://localhost:3000/api/hospitals
    const url = `${base_url}/hospitals`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals)
      );
  }

  createHospital(name: string) {

    const url = `${base_url}/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(hid: string, name: string) {

    const url = `${base_url}/hospitals/${hid}`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(hid: string) {

    const url = `${base_url}/hospitals/${hid}`;
    return this.http.delete(url, this.headers);
  }
}
