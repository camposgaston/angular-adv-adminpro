import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';

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
  public selectedHospital: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['Juan', Validators.required],
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
    console.log(this.doctorForm.value);
  }

  getHospital() {
    this.hospitalService.getHospitals()
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
      });
  }

}
