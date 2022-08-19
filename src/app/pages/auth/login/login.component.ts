import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    email: '',
    password: '',
  };
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.localStorageService.clearLocalStorage();
  }

  // Simple Login
  login() {
    this.authService.showLoader = true;
    this.authService
      // .login(this.loginForm.value['email'], this.loginForm.value['password'])
      .loginMock(
        this.loginForm.value['email'],
        this.loginForm.value['password']
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.toastr.warning('E-mail ou Senha incorretos.');
        },
        complete: () => {
          this.authService.showLoader = false;
        },
      });
  }
}
