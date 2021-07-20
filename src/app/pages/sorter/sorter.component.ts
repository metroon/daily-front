import { BaseService } from './../../shared/services/base.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss'],
})
export class SorterComponent implements OnInit {
  public team;
  public teamCopy;
  public hasBeenSorted = false;

  constructor(private base: BaseService, private router: Router) { }

  ngOnInit(): void {
    this.getTeam(this.router.url);
  }

  async getTeam(teamName) {
    this.team = (await this.base.get(`${teamName}.json`).toPromise()).map(el => {
      el.isCanceled = false;
      return el;
    }).sort((a, b) => a.name - b.name);
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
