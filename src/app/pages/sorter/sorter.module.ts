import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SorterRoutingModule } from './sorter-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaceComponent } from './race/race.component';
import { OriginalComponent } from './original/original.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [RaceComponent, OriginalComponent],
  imports: [CommonModule, SorterRoutingModule, SharedModule, ColorPickerModule],
})
export class SorterModule {}
