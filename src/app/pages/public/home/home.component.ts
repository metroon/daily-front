import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public CurrentYear = new Date().getFullYear();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigatetoLogin(){
    this.router.navigate(['login']);
  }

  public locateItemPosition(item: string) {
    let el = document.querySelector(`#${item}`);
console.log("EL", el)
    if (el != null) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
