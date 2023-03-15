import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TeamService } from 'src/app/shared/services/team.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-original',
  templateUrl: './original.component.html',
  styleUrls: ['./original.component.scss'],
})
export class OriginalComponent implements OnInit {
  public teamName = '';
  public team;
  public teamGroup = [];
  public teamCopy;
  public hasBeenSorted = false;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private titleService: Title,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.teamName = this.router.url.split('/').pop();
    await this.getTeam(this.teamName);
    this.setAppTitle();
    this.setTemGroups();
  }

  private setTemGroups() {
    let teamLines = this.team.length / 8;
    let startSlice = 0;
    let endSlice = 8;
    for (let index = 0; index < teamLines; index++) {
      this.teamGroup[index] = this.team.slice(startSlice, endSlice);
      startSlice = endSlice;
      endSlice = endSlice + (endSlice + 1);
    }
  }

  private setAppTitle() {
    let appTitle = this.teamName;
    appTitle = appTitle.charAt(0).toUpperCase() + appTitle.slice(1);
    this.titleService.setTitle(`${appTitle} Daily`);
  }

  async getTeam(teamName) {
    if (this.isOpenId(this.teamName)) {
      this.team = await this.getOrganizationUsers(this.teamName);
    } else {
      this.team = await lastValueFrom(this.teamService.get(teamName));
    }
    this.team = this.team
      .map((el) => {
        el.isCanceled = false;
        return el;
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    this.teamCopy = this.team.filter((el) => !el.isCanceled);
  }

  startSorter() {
    let counter = 0;
    let interval = setInterval(() => {
      this.teamCopy = this.shuffle(this.teamCopy);
      if (counter >= 25) {
        clearInterval(interval);
      }
      counter++;
    }, 50);
    this.hasBeenSorted = true;
  }

  resetPage() {
    window.location.reload();
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * array.length);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  generateRandom(maxLimit = 100) {
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99

    return rand;
  }

  cancel(member) {
    member.isCanceled = !member.isCanceled;
    this.teamCopy = this.team.filter((el) => !el.isCanceled);
  }

  goToRace() {
    this.router.navigate(['/race/' + this.teamName]);
  }

  async getOrganizationUsers(organizationId) {
    return await lastValueFrom(
      this.userService.getOrganizationUser(organizationId)
    );
  }

  isOpenId(id) {
    let checkForHexRegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    return checkForHexRegExp.test(id);
  }
}
