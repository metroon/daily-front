import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/app/shared/models/member';
import { MemberRaw } from 'src/app/shared/models/member-raw';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  public teamName = '';
  public team;
  public teamCopy;
  public teamSorted = [];
  public finalTeamSorted = [];
  public idsSorted;
  public hasBeenSorted = false;
  public ended = false;
  public isVisible = true;
  public colors = [
    '#ff0000',
    '#ff8800',
    '#ffd500',
    '#ddff00',
    '#15ff00',
    '#00ffaa',
    '#00eeff',
    '#0077ff',
    '#5100ff',
    '#aa00ff',
    '#ff00ff',
    '#880000',
    '#904d00',
    '#937b00',
    '#7e9100',
    '#0d9900',
    '#008e5f',
    '#007982',
    '#003673',
    '#1d005c',
    '#4a006e',
    '#6a006a',
  ];
  public usedColors = [...this.colors];

  public racing = false;
  public scoreTimeOut;
  public percentage = 0;

  public minRaceTime = 8;
  public bigRaceLimit = 12;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private titleService: Title,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.teamName = this.router.url.split('/').pop();
    this.team = this.localStorage.getItem('TEAM');
    this.getTeam(this.teamName);
    this.setAppTitle();
  }

  setAppTitle() {
    let appTitle = this.teamName;
    appTitle = appTitle.charAt(0).toUpperCase() + appTitle.slice(1);
    this.titleService.setTitle(`${appTitle} Daily`);
  }

  async getTeam(teamName) {
    let team;
    if (!this.team[0]) {
      team = await lastValueFrom(this.teamService.get(teamName));
    } else {
      team = this.team;
    }
    this.team = team
      .sort((a, b) => a.name - b.name)
      .map((mr: MemberRaw, i) => {
        let member = new Member(
          mr.id,
          mr.name,
          mr.picture,
          this.getRadomColor()
        );
        member.order = i;
        return member;
      });
    this.teamCopy = [...this.team.filter((el) => !el.isCanceled)];
    this.teamSorted = this.teamCopy.map((m) => ({ ...m }));
    this.percentage = Math.floor((100 / team.length) * 100) / 100;
  }

  run() {
    if (this.ended || this.racing) {
      this.restart();
      return;
    }

    this.teamSorted = this.teamCopy.map((m) => ({ ...m }));
    this.shuffle(this.teamSorted).forEach((m, i) => {
      let member = this.teamCopy.find((el) => el.id == m.id);
      member.time = this.getTime(i);
      member.position = this.getPosition(i);
      this.logMember(member);
    });

    this.finalTeamSorted = this.teamCopy
      .map((m) => ({ ...m }))
      .sort((a, b) => +a.position - +b.position);

    this.setEnd();

    this.racing = !this.racing;
  }

  setEnd() {
    let timeToEnd = this.minRaceTime; // Tempo Base
    timeToEnd += (this.teamSorted.length / 10) * 2; // Decimais do último a finalizar
    timeToEnd *= 1000; // Conversão para ms
    this.scoreTimeOut = setTimeout(() => (this.ended = true), timeToEnd);
  }

  shuffle(array) {
    let curr = array.length;
    let random;

    while (0 !== curr) {
      random = Math.floor(Math.random() * curr);
      curr--;
      [array[curr], array[random]] = [array[random], array[curr]];
    }

    return array;
  }

  cancel(member) {
    if (this.racing && !this.ended) return;
    member.isCanceled = !member.isCanceled;
    let positionsChanged = false;

    if (this.ended) {
      positionsChanged = true;
      member.isCanceled
        ? this.handleRemoval(member)
        : this.handleInsertion(member);
    }

    this.teamCopy = [...this.team.filter((el) => !el.isCanceled)];

    if (positionsChanged) {
      console.clear();
      this.teamCopy
        .map((m) => ({ ...m }))
        .sort((a, b) => +a.position - +b.position)
        .forEach(this.logMember);
    }
  }

  handleInsertion(member) {
    let lastPosition = this.teamCopy.reduce(
      (curr, next) => (+curr > +next.position ? +curr : +next.position),
      0
    );
    member.position = this.getPosition(lastPosition);
  }

  handleRemoval(member) {
    this.teamCopy.forEach((m) => {
      if (+m.position > +member.position) {
        m.position = this.getPosition(+m.position - 2);
      }
    });
  }

  getTime(i) {
    return this.minRaceTime + (i / 10) * 2;
  }

  getPosition(i) {
    return i < 9 ? `0${i + 1}` : `${i + 1}`;
  }

  logMember(member) {
    let emoji = '#️⃣';
    if (member.position == '01') emoji = '🏆';
    if (member.position == '02') emoji = '🥈';
    if (member.position == '03') emoji = '🥉';
    console.log(
      `%c ${emoji} ${member.position} ➡ ${member.name}`,
      'font-size: 16px'
    );
  }

  getRadomColor() {
    if (!this.usedColors.length) {
      this.usedColors = [...this.colors];
    }
    let randomIndex = Math.floor(Math.random() * this.usedColors.length);
    let randomColor = this.usedColors[randomIndex];
    this.usedColors = this.usedColors.filter((c) => c != randomColor);
    return randomColor;
  }

  getRandomEasingFunction() {
    let r1 = Math.floor(Math.random() * 100) / 100;
    let r2 = Math.floor(Math.random() * 100) / 100;
    let x1 = r1 >= r2 ? r1 : r2;
    let x2 = r1 < r2 ? r1 : r2;

    return `cubic-bezier(${x1}, ${x2}, 1, 1)`;
  }

  restart() {
    console.clear();
    this.teamCopy = this.teamCopy.map((member) => {
      member.time = 0;
      member.position = this.getPosition(0);
      member.easingFunction = this.getRandomEasingFunction();
      return member;
    });
    this.racing = false;
    this.ended = false;
    this.isVisible = true;
    clearTimeout(this.scoreTimeOut);
  }

  goToOriginal() {
    this.router.navigate(['/' + this.teamName]);
  }
}
