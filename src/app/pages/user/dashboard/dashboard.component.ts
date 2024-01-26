import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
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
  @ViewChild('modalOrg') modalOrg: ModalComponent;
  public modalOrgData = new ModalData();
  @ViewChild('modalMember') modalMember: ModalComponent;
  public modalMemberData = new ModalData();
  public user;
  public organizations;
  public organizationsUser;
  public newOrganizationForm: FormGroup;
  public selectedAvatar = '';

  public newMember = {
    OrganizationId: '',
    name: '',
    picture: '',
  };

  public members = [
    {
      OrganizationId: '63113debcc81d808191f0a81',
      id: '63115b5ece189de7b527cd51',
      name: 'Teste',
      picture:
        'https://s2.glbimg.com/YaWQl0kD1Lxx3l-n59Fk4mBreQ8=/0x0:620x461/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2015/01/23/133.jpg',
    },
    {
      OrganizationId: '63113debcc81d808191f0a81',
      id: '63115b6d393a3692f2659af2',
      name: 'Teste',
      picture:
        'https://s2.glbimg.com/YaWQl0kD1Lxx3l-n59Fk4mBreQ8=/0x0:620x461/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2015/01/23/133.jpg',
    },
    {
      OrganizationId: '63113debcc81d808191f0a81',
      id: '63115dc60672c79b1c77f2d0',
      name: 'Teste',
      picture:
        'https://s2.glbimg.com/YaWQl0kD1Lxx3l-n59Fk4mBreQ8=/0x0:620x461/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2015/01/23/133.jpg',
    },
  ];

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
      reference: ['', Validators.required],
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
    this.router.navigate(['/sorter', 'race', org.OrganizationId]);
  }

  goToOriginal(org) {
    this.router.navigate(['/' + org.OrganizationId]);
  }

  async openAddTeam() {
    this.modalOrgData.title = 'Adicionar Time';
    this.modalOrgData.confirmButtonLabel = 'Adicionar';
    this.modalOrgData.closeButtonLabel = 'Cancelar';
    let result = await this.modalOrg.open();
    if (!result) return;
    let newOrganization = this.newOrganizationForm.value;
    this.userService.createOrganization(newOrganization).subscribe((data) => {
      this.organizations.push(data);
    });
  }

  async openAddMember(organization) {
    console.log(organization);
    this.newMember.OrganizationId = organization.id;
    this.modalMemberData.title =
      'Adicionar Participante em ' + organization.name;
    this.modalMemberData.confirmButtonLabel = 'Adicionar';
    this.modalMemberData.closeButtonLabel = 'Cancelar';
    let result = await this.modalMember.open();
    if (!result) return;
    let newMember = this.newMember;
    if (this.isValid(newMember)) {
      newMember.picture = newMember.picture.replace(/\s/g, '%20');
      this.userService.createMember(newMember).subscribe((data) => {
        organization.organizationUsers.push(data);
      });
    }
    this.newMember.name = '';
    this.newMember.picture = '';
    this.selectedAvatar = '';
  }

  async openEditMember(member, organization) {
    this.newMember = { ...member };
    this.modalMemberData.title = 'Editar ' + member.name;
    this.modalMemberData.confirmButtonLabel = 'Editar';
    this.modalMemberData.closeButtonLabel = 'Cancelar';
    let result = await this.modalMember.open();
    if (!result) return;
    let newMember = this.newMember;
    if (this.isValid(newMember)) {
      newMember.picture = newMember.picture.replace(/\s/g, '%20');
      this.userService.editMember(newMember).subscribe((data) => {
        organization.organizationUsers = organization.organizationUsers.map(
          (m) => {
            if (m.id == member.id) return data;
            return m;
          }
        );
      });
    }
    this.newMember.name = '';
    this.newMember.picture = '';
    this.selectedAvatar = '';
  }

  isValid(newMember) {
    return newMember && newMember.name && newMember.picture;
  }

  setPicture(selectedAvatar) {
    this.newMember.picture = `https://api.dicebear.com/7.x/${selectedAvatar}/svg?seed=${this.newMember.name}`;
  }

  removeMember(memberId, organization) {
    this.userService.removeMember(memberId).subscribe((data) => {
      organization.organizationUsers = organization.organizationUsers.filter(
        (m) => m.id != memberId && m._id != memberId
      );
    });
  }

  setReferenceByName() {
    let name = this.newOrganizationForm.controls['name'].value;
    this.newOrganizationForm.controls['reference'].setValue(
      this.simplifyString(name)
    );
  }

  setReference() {
    let reference = this.newOrganizationForm.controls['reference'].value;
    this.newOrganizationForm.controls['reference'].setValue(
      this.simplifyString(reference)
    );
  }

  simplifyString(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}
