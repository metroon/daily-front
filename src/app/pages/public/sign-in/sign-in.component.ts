import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public createUserForm: FormGroup;
  public errorMessage: any;
  public showLoader = false;

  constructor(private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private toastr: ToastrService) 
    {
      this.createUserForm = fb.group({
        name: ['', Validators.required],
        picture: [''],
        imageData: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    this.localStorageService.clearLocalStorage();
  }

  public navigatetoLogin(){
    this.router.navigate(['login']);
  }

  public createUser() {
    if (this.createUserForm.invalid) return;
    this.showLoader = true;
    this.createUserForm.removeControl("confirmPassword");
    let payload = this.createUserForm.value;
    payload.picture = '';
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
        this.showLoader = false;
      },
      error: (err) => {
        this.toastr.warning('Houve um erro');
        this.showLoader = false;
      },
    });
  }

  public processFile(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.createUserForm.controls['imageData'].setValue(reader.result);
    };
  }
}
