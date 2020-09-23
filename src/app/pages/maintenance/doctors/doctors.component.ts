import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Doctor } from '../../../models/doctors.model';

import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';


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

  search(term: string) {
    this.loading = true;
    if (term.length === 0) {
      this.loading = false;
      return this.doctors = this.doctorsTemp;
    }

    this.searchService.search('doctors', term)
      .subscribe((resp: Doctor[]) => {
        this.doctors = resp;
        this.loading = false;
      });
  }

  showModal(doctor: Doctor) {
    this.modalImageService.showModal('doctors', doctor.did, doctor.img);
  }

  deleteDoctor(doctor: Doctor) {

    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Está a punto de borrar al medico: ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar Medico'
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor(doctor.did)
          .subscribe(resp => {
            this.getDoctors();
            Swal.fire({
              title: 'Usuario Borrado',
              text: `Se borro el medico: ${doctor.name}`,
              icon: 'success'
            });
          });
      }
    });

  }

}