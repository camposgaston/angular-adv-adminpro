import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent {

  public formSubmited = false;

  public loginForm = this.fb.group({
    email: ['camposgaston321654987@gmail.com', [Validators.required, Validators.email]],
    password: ['123456789', [Validators.required, Validators.minLength(8)]],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) { }


  login(): void {

    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp);
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    // this.router.navigateByUrl('/');
  }
}
