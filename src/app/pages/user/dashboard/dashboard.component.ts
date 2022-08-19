import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public email = 'djianlucca@outlook.com';
  public user;
  public organizations;
  public organizationsUser;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    this.user = (await lastValueFrom(this.userService.getUser(this.email)))[0];
    this.organizations = await lastValueFrom(
      this.userService.getOrganizations(this.user.id)
    );
  }

  async getOrganizationUsers(organizationId) {
    this.organizationsUser = await lastValueFrom(
      this.userService.getOrganizationUser(organizationId)
    );
    this.localStorage.setItem('TEAM', this.organizationsUser);
  }

  goToRace() {
    this.router.navigate(['/race/' + this.organizations[0].name]);
  }
}
