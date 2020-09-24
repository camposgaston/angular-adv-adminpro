import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
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

  public textButton = 'Crear Nuevo Medico';
  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public selectedDoctor: Doctor;
  public selectedHospital: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ did }) => this.getDoctorData(did));

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

  getDoctorData(id: string) {
    if (id === 'new') {
      return;
    }

    this.doctorService.getDoctorById(id)
      .pipe(
        delay(100)
      )
      .subscribe((doctor: any) => {
        if (!doctor) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }
        const { name, hospital: { _id } } = doctor;
        this.selectedDoctor = doctor;
        this.doctorForm.setValue({ name, hospital: _id });
        this.textButton = 'Editar Medico';
      });
  }

  saveDoctor() {
    const { name } = this.doctorForm.value;

    if (this.selectedDoctor) {
      // Update Doctor
      const data = {
        ...this.doctorForm.value,
        did: this.selectedDoctor.did
      };
      this.doctorService.updateDoctor(data)
        .subscribe(resp => {
          Swal.fire('Médico Editado', `${name} fue editado correctamente`, 'success');
        });
    } else {
      // create Doctor      
      this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Nuevo médico creado', `${name} fue agregado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${resp.array.did}`);
        });
    }

  }

  getHospital() {
    this.hospitalService.getHospitals()
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      });
  }

}
