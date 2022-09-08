import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'user';
  private organizationSearchUrl = 'organizationSearch';
  private organizationUrl = 'organization';
  private organizationUserUrl = 'organizationUser';

  constructor(private base: BaseService) {}

  getUser(id) {
    return this.base.get(`${this.userUrl}/${id}`);
  }

  getOrganizations(id) {
    return this.base.getNew(`${this.organizationSearchUrl}?UserId=${id}`);
  }

  createOrganization(newOrganization) {
    return this.base.post(`${this.organizationUrl}`, newOrganization);
  }

  createMember(newMember) {
    return this.base.post(`${this.organizationUserUrl}`, newMember);
  }

  editMember(newMember) {
    return this.base.put(
      `${this.organizationUserUrl}/${newMember.id}`,
      newMember
    );
  }

  removeMember(memberId) {
    return this.base.delete(`${this.organizationUserUrl}/${memberId}`);
  }

  getOrganizationUser(id) {
    return this.base.get(`${this.organizationUserUrl}?OrganizationId=${id}`);
  }

  update(id, body) {
    return this.base.put(`${this.userUrl}/${id}`, body);
  }
}
