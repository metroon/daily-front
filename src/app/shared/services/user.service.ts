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

  public getUser(id) {
    return this.base.get(`${this.userUrl}/${id}`);
  }

  public getOrganizations(id) {
    return this.base.get(`${this.organizationUrl}?UserId=${id}`);
  }

  public getOrganizationUser(id) {
    return this.base.get(`${this.organizationUserUrl}?OrganizationId=${id}`);
  }

  public createUser(newUser) {
    return this.base.post('user', newUser);
  }
}
