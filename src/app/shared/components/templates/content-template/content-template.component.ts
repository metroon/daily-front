import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavService } from 'src/app/shared/services/nav.service';
import { CustomizerService } from '../../../services/customizer.service';

@Component({
  selector: 'app-content-template',
  templateUrl: './content-template.component.html',
  styleUrls: ['./content-template.component.scss'],
})
export class ContentTemplateComponent implements OnInit {
  public screenWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event?: undefined) {
    this.screenWidth = window.innerWidth;
    this.navService.collapseSidebar = this.screenWidth < 768;
  }

  constructor(
    public navService: NavService,
    public customizer: CustomizerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onResize();
    this.subscribeToRouter();
  }

  subscribeToRouter() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e) => {
        this.navService.collapseSidebar = this.screenWidth < 768;
      });
  }
}
