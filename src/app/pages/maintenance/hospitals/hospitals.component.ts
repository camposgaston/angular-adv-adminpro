import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading = true;

  constructor(private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
      });
  }

}
