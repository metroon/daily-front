import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TeamService } from 'src/app/shared/services/team.service';
import { lastValueFrom } from 'rxjs';

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
    private titleService: Title
  ) {}

  async ngOnInit() {
    this.teamName = this.router.url.split('/').pop();
    await this.getTeam(this.teamName);
    this.setAppTitle();
  }

  private setAppTitle() {
    let appTitle = this.teamName;
    appTitle = appTitle.charAt(0).toUpperCase() + appTitle.slice(1);
    this.titleService.setTitle(`${appTitle} Daily`);
  }

  async getTeam(teamName) {
    lastValueFrom(this.teamService.get(teamName))
      .then((team) => {
        this.team = team
          .map((el) => {
            el.isCanceled = false;
            return el;
          })
          .sort((a, b) => (a.name > b.name ? 1 : -1));
        this.teamCopy = this.team.filter((el) => !el.isCanceled);
      })
      .catch((error) => {
        this.router.navigate(['not-found']);
      });
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
    this.teamCopy = this.team.filter((el) => !el.isCanceled);
  }

  goToRace() {
    this.router.navigate(['/race/' + this.teamName]);
  }
}
