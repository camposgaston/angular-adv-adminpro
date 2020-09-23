import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Doctor } from '../../../models/doctors.model';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { delay } from 'rxjs/operators';




@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  private doctorsTemp: Doctor[] = [];
  public loading = true;
  private imgSubs: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getDoctors();

    this.imgSubs = this.modalImageService.newChange
      .pipe(delay(100))
      .subscribe(img => this.getDoctors());
  }

  getDoctors() {
    this.loading = true;

    this.doctorService.getDoctors()
      .subscribe(doctors => {

        if (doctors.length !== 0) {
          this.doctors = doctors;
          this.doctorsTemp = doctors;
        }
        this.loading = false;
      });
  }

  showModal(doctor: Doctor) {
    this.modalImageService.showModal('doctors', doctor.did, doctor.img);
  }

}
