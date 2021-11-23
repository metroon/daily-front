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
  public teamCopy;
  public hasBeenSorted = false;

  constructor(private base: BaseService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.getTeam(this.router.url);
    this.setAppTitle();
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
    console.log("TEAM", this.team);
    this.teamCopy = this.team.filter(el => !el.isCanceled)
  }

  sort() {
    let counter = 0;
    let interval = setInterval(() => {
      this.teamCopy = this.shuffle(this.teamCopy);
      if (counter >= 30) {
        clearInterval(interval);
      }
      counter++;
    }, 50);
    this.hasBeenSorted = true;
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  cancel(member) {
    member.isCanceled = !member.isCanceled;
    this.teamCopy = this.team.filter(el => !el.isCanceled)
  }
}
