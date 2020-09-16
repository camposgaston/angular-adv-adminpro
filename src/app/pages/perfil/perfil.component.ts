import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';

import { User } from '../../models/user.model';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;
  public imgTemp: string | ArrayBuffer = null;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value)
      .subscribe(() => {
        const { name, lastName, email } = this.profileForm.value;
        this.user.name = name;
        this.user.lastName = lastName;
        this.user.email = email;
        Swal.fire('Usuario modificado', 'Se modificaron los datos de usuario', 'success');
      }, (err) => {
        Swal.fire('Usuario no modificado', err.error.msg, 'error');
      });
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
    this.fileUploadService
      .updatePicture(this.imageToUpload, 'users', this.user.uid)
      .then(
        img => {
          this.user.img = img;
          Swal.fire('Usuario modificado', 'Se modificó correctamente el avatar del usuario', 'success');
        }
      ).catch(err => {
        Swal.fire('Error', 'No se pudo modificar la imagen', 'error');
      });
  }

}
