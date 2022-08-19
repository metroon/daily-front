import { Breadcrumb } from './../../models/breadcrumb';
import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;
  activeBreadcrumb$: Observable<string>;

  constructor(public breadcrumbService: BreadcrumbsService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    this.activeBreadcrumb$ = breadcrumbService.activeBreadcrumbs$;
  }
}
