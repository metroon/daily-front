import { BaseService } from './../../shared/services/base.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss'],
})
export class SorterComponent implements OnInit {
  public team;
  public teamGroup = [];
  public teamCopy;
  public hasBeenSorted = false;

  constructor(private base: BaseService, private router: Router, private titleService: Title) { }

  async ngOnInit() {
    await this.getTeam(this.router.url);
    this.setAppTitle();
    this.setTemGroups();
  }

  private setTemGroups() {
    let teamLines = this.team.length / 8;
    let startSlice = 0;
    let endSlice = 8;
    for (let index = 0; index < teamLines; index++) {
      console.log(this.team.slice(startSlice, endSlice));
      this.teamGroup[index] = this.team.slice(startSlice, endSlice);
      startSlice = endSlice;
      endSlice = endSlice + (endSlice + 1);
    }
  }

  private setAppTitle() {
    let appTitle = this.router.url.replace('/', '');
    appTitle = appTitle.charAt(0).toUpperCase() + appTitle.slice(1);
    this.titleService.setTitle(`${appTitle} Daily`);
  }

  async getTeam(teamName) {
    this.team = (await this.base.get(`${teamName}.json`).toPromise()).map(el => {
      el.isCanceled = false;
      return el;
    }).sort((a, b) => a.name > b.name ? 1 : -1);
    this.teamCopy = this.team.filter(el => !el.isCanceled)
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
    console.log(rand); // say 99.81321410836433

    rand = Math.floor(rand); // 99

    return rand;
  }

  cancel(member) {
    member.isCanceled = !member.isCanceled;
    this.teamCopy = this.team.filter(el => !el.isCanceled)
  }
}
