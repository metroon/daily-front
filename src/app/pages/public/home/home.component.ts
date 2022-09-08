import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public CurrentYear = new Date().getFullYear();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value) => {
      this.jumpTo(value);
    });
  }

  public navigatetoLogin(){
    this.router.navigate(['login']);
  }

  public jumpTo(section) {
    if (section){
      document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }
  }
}
