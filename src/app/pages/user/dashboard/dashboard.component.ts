import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalData } from 'src/app/shared/models/modal-data';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  public modalData = new ModalData();
  public user;
  public organizations;
  public organizationsUser;
  public newOrganizationForm: FormGroup;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let userId = this.localStorage.getUser().id;
    this.newOrganizationForm = this.fb.group({
      UserId: [userId, Validators.required],
      name: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    let user = this.localStorage.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = await lastValueFrom(this.userService.getUser(user.id));
    this.getOrganizations();
  }

  async getOrganizations() {
    this.organizations = await lastValueFrom(
      this.userService.getOrganizations(this.user.id)
    );
  }

  goToRace(org) {
    this.router.navigate(['/race/' + org.OrganizationId]);
  }

  goToOriginal(org) {
    this.router.navigate(['/' + org.OrganizationId]);
  }

  async openAddTeam() {
    this.modalData.title = 'Adicionar Time';
    this.modalData.confirmButtonLabel = 'Adicionar';
    this.modalData.closeButtonLabel = 'Cancelar';
    let result = await this.modal.open();
    if (!result) return;
    let newOrganization = this.newOrganizationForm.value;
    this.userService.createOrganization(newOrganization).subscribe((data) => {
      this.getOrganizations();
    });
  }
}
