import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Doctor } from '../models/doctors.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  getDoctors() {

    // http://localhost:3000/api/doctors
    const url = `${base_url}/doctors`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctors: Doctor[] }) => resp.doctors)
      );
  }

  getDoctorById(did: string) {

    // http://localhost:3000/api/doctors/{did}
    const url = `${base_url}/doctors/${did}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, doctor: Doctor }) => resp.doctor)
      );
  }

  createDoctor(doctor: { name: string, hospital: string }) {

    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {

    const url = `${base_url}/doctors/${doctor.did}`;
    return this.http.put(url, doctor, this.headers);
  }

  deleteDoctor(did: string) {

    const url = `${base_url}/doctors/${did}`;
    return this.http.delete(url, this.headers);
  }
}
