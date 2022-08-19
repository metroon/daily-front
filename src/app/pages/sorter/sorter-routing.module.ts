import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OriginalComponent } from './original/original.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  {
    path: 'race/:team',
    component: RaceComponent,
  },
  {
    path: ':team',
    component: OriginalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SorterRoutingModule {}
