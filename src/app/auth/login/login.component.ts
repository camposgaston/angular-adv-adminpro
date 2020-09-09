import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmited = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [(localStorage.getItem('remember') === 'true' ? true : false)]
  });

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

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
        // redirect to Dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {

    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  };



  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const googleToken = ({
          token: googleUser.getAuthResponse().id_token
        });
        // console.log(id_token);
        this.userService.loginGoogle(googleToken).subscribe(resp => {
          // redirect to Dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
