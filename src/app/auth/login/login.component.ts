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
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [(localStorage.getItem('remember') === 'true' ? true : false)]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService) { }


  login(): void {

    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.setItem('remember', 'false');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    // this.router.navigateByUrl('/');
  }
}
