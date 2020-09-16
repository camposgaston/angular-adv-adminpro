import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;

  constructor(private fb: FormBuilder,
    private userService: UserService) {
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
      .subscribe(resp => {
        const { name, lastName, email } = this.profileForm.value;
        this.user.name = name;
        this.user.lastName = lastName;
        this.user.email = email;
        Swal.fire('Usuario modificado', 'Se modificaron los datos de usuario', 'success');
      });
  }

}
