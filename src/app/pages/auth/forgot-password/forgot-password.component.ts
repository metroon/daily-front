import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

type UserFields = 'recoveryEmail';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public recoverPasswordForm: FormGroup;
  public formErrors: FormErrors = {
    recoveryEmail: '',
  };
  public errorMessage: any;
  public showLoader = false;

  constructor(
    public authService: AuthService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.recoverPasswordForm = fb.group({
      recoveryEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.localStorageService.clearLocalStorage();
  }
}
