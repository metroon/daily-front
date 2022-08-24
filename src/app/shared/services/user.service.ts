import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'user';
  private organizationUrl = 'organization';
  private organizationUserUrl = 'organizationUser';

  constructor(private base: BaseService) {}

  getUser(id) {
    return this.base.get(`${this.userUrl}/${id}`);
  }

  getOrganizations(id) {
    return this.base.get(`${this.organizationUrl}?UserId=${id}`);
  }

  getOrganizationUser(id) {
    return this.base.get(`${this.organizationUserUrl}?OrganizationId=${id}`);
  }
}
