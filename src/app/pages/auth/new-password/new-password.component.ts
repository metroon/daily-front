import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import jwt_decode from 'jwt-decode';

type UserFields = 'password';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  public newPasswordForm: FormGroup;
  public formErrors: FormErrors = {
    password: '',
  };
  public errorMessage: any;
  public userId = '';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.newPasswordForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      userId: [],
    });
  }

  ngOnInit() {
    this.localStorageService.clearLocalStorage();
    this.activatedRoute.queryParams.subscribe((params) => {
      let auth = params['auth'];
      if (auth) {
        this.decodeAuth(auth);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  decodeAuth(jwt) {
    try {
      let decoded = jwt_decode(jwt);
      let expirationDate = (decoded['exp'] * 1000) as any;
      if (this.authService.isTokenExpired(expirationDate)) {
        this.toaster.warning('Este link expirou! Tente novamente.');
        this.router.navigate(['/login']);
      } else {
        let userId = decoded['User.Identity.Name'];
        if (!userId) {
          this.toaster.error('Algo deu errado');
          this.router.navigate(['/login']);
        } else {
          this.userId = userId;
          this.localStorageService.setAccessToken(jwt);
        }
      }
    } catch (err) {
      this.toaster.error('Link inválido');
      this.router.navigate(['/login']);
    }
  }

  newPassword() {
    this.authService.showLoader = true;
    let password = this.newPasswordForm.get('password').value;
    let newPassword = {
      password,
      userId: this.userId,
    };
    this.authService.confirmChangePassword(newPassword).subscribe({
      next: (res) => {
        this.toaster.success('Senha alterada com sucesso');
        this.router.navigate(['/login']);
        this.authService.showLoader = false;
      },
      error: (err) => {
        this.toaster.error('Algo deu errado! Tente novamente mais tarde.');
        this.router.navigate(['/login']);
        this.authService.showLoader = false;
      },
    });
  }
}
