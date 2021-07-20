import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SorterComponent } from './sorter/sorter.component';
import { TeamComponent } from './team/team.component';


@NgModule({
  declarations: [
    PagesComponent,
    SorterComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
