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

  public createOrganization(newOrganization) {
    return this.base.post(`${this.organizationUrl}`, newOrganization);
  }

  public createMember(newMember) {
    return this.base.post(`${this.organizationUserUrl}`, newMember);
  }

  public editMember(newMember) {
    return this.base.put(
      `${this.organizationUserUrl}/${newMember.id}`,
      newMember
    );
  }

  public removeMember(memberId) {
    return this.base.delete(`${this.organizationUserUrl}/${memberId}`);
  }

  public getOrganizationUser(id) {
    return this.base.get(`${this.organizationUserUrl}?OrganizationId=${id}`);
  }

  public createUser(newUser) {
    return this.base.post('user', newUser);
  }

  update(id, body) {
    return this.base.put(`${this.userUrl}/${id}`, body);
  }
}
