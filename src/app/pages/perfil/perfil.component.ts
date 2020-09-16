import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['Nombre', Validators.required],
      lastName: ['Apellido', Validators.required],
      email: ['email', [Validators.required, Validators.email]]
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
