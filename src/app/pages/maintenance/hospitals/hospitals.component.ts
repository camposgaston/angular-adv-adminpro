import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public loading = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getHospitals();

    this.imgSubs = this.modalImageService.newChange
      .pipe(delay(100))
      .subscribe(img => this.getHospitals());
  }

  getHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals()
      .subscribe(hospitals => {
        this.loading = false;
        this.hospitals = hospitals;
      });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital.hid, hospital.name)
      .subscribe(resp => {
        Swal.fire('Hospital Actualizado', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital.hid)
      .subscribe(resp => {
        Swal.fire('¡Hospital Eliminado!', hospital.name, 'success');
        this.getHospitals();
      });
  }

  async openCreateHospitalAlert() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Nuevo Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del nuevo hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value)
        .subscribe((resp: any) => {
          this.hospitals.push(resp.array);
          Swal.fire('¡Hospital Creado!', value, 'success');
        });
    }
  }

  showModal(hospital: Hospital) {
    this.modalImageService.showModal('hospitals', hospital.hid, hospital.img);
  }

}
