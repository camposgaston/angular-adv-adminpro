import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})

export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Gaston', [Validators.required, Validators.minLength(2)]],
    lastName: ['Campos', [Validators.required, Validators.minLength(2)]],
    email: ['camposgaston321654987@gmail.com', [Validators.required, Validators.email]],
    password: ['123456789', [Validators.required, Validators.minLength(8)]],
    password2: ['123456789', [Validators.required, Validators.minLength(8)]],
    termsAndConditions: [true, [Validators.requiredTrue]]
  }, {
    validators: this.samePassValidation('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Create user
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        console.log('user created');
        console.log(resp);
      }, (err) => {
        // console.log(err.error.msg)
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  notValidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  samePasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return false;
    }
    return true;
  }

  // Equal Passwords validation
  samePassValidation(pass1FieldName: string, pass2FieldName: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1FieldName);
      const pass2Control = formGroup.get(pass2FieldName);
      if (pass1Control.value === pass2Control.value) {
        // if both are the same password, no error (null)
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ passNotMatch: true });
      }

      // To do: Add password strength validations here!!!!
    };
  }

}
