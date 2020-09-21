import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public imageToUpload: File;
  public imgTemp: string | ArrayBuffer = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  hideModal() {
    this.imgTemp = null;
    this.modalImageService.hideModal();
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) { return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  uploadImage() {
    const id = this.modalImageService.id;
    const collection = this.modalImageService.collection;
    this.fileUploadService
      .updatePicture(this.imageToUpload, collection, id)
      .then(
        img => {
          Swal.fire('Usuario modificado', 'Se modificó correctamente el avatar del usuario', 'success');
          this.modalImageService.newChange.emit(img);
          this.hideModal();
        }
      ).catch(err => {
        Swal.fire('Error', 'No se pudo modificar la imagen', 'error');
      });
  }

}
