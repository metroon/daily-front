import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public createUserForm: FormGroup;
  public errorMessage: any;
  public showLoader = false;

  constructor(
    public authService: AuthService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createUserForm = fb.group({
      name: ['', Validators.required],
      picture: [''],
      imageData: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.localStorageService.clearLocalStorage();
  }

  createUser() {
    if (this.createUserForm.invalid) return;
    this.authService.showLoader = true;
    let payload = this.createUserForm.value;
    payload.picture = '';
    this.authService.createUser(payload).subscribe({
      next: (res) => {
        this.toastr.success('Usuário criado com sucesso!');
        this.router.navigate(['/login']);
        this.authService.showLoader = false;
      },
      error: (err) => {
        this.toastr.warning('Houve um erro');
        this.authService.showLoader = false;
      },
    });
  }

  processFile(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (alo) => {
      this.createUserForm.controls['imageData'].setValue(reader.result);
    };
  }
}
