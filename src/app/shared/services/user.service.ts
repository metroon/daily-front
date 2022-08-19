import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'user';
  private organizationUrl = 'organization';
  private organizationUserUrl = 'organizationUser';

  constructor(private base: BaseService) {}

  getUser(email) {
    return this.base.get(`${this.userUrl}?email=${email}`);
  }

  getOrganizations(id) {
    return this.base.get(`${this.organizationUrl}?UserId=${id}`);
  }

  getOrganizationUser(id) {
    return this.base.get(`${this.organizationUserUrl}?OrganizationId=${id}`);
  }
}
