import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctors.model';

import { HospitalService } from '../../../services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';


@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styles: [
  ]
})
export class DoctorEditComponent implements OnInit {

  public create = true;
  public textButton = 'Crear';
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedDoctor: Doctor;
  public selectedHospital: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.getHospital();

    // get selected hospital information
    this.doctorForm.get('hospital').valueChanges
      .subscribe(hid => {
        this.selectedHospital = this.hospitals.find(h => h.hid === hid);
      });

  }

  saveDoctor() {
    const { name } = this.doctorForm.value;
    this.doctorService.createDoctor(this.doctorForm.value)
      .subscribe((resp: any) => {
        Swal.fire(
          'Nuevo médico creado', `${name} fue agregado correctamente`, 'success'
        );
        this.router.navigateByUrl(`/dashboard/doctor/${resp.array.did}`);
      });
  }

  getHospital() {
    this.hospitalService.getHospitals()
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      });
  }

}
