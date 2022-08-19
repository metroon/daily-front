import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DateMaskDirective } from './directives/date-mask.directive';
import { ContentTemplateComponent } from './components/templates/content-template/content-template.component';
import { FullTemplateComponent } from './components/templates/full-template/full-template.component';
import { BaseService } from './services/base.service';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { GenericDropdownComponent } from './components/generic-dropdown/generic-dropdown.component';
import { CarComponent } from './components/car/car.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FeatherIconsComponent,
    GenericDropdownComponent,
    DatepickerComponent,
    HeaderComponent,
    DateMaskDirective,
    ContentTemplateComponent,
    FullTemplateComponent,
    LoaderComponent,
    ModalComponent,
    FooterComponent,
    BreadcrumbComponent,
    CustomizerComponent,
    CarComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, NgbModule],
  exports: [
    SidebarComponent,
    FeatherIconsComponent,
    GenericDropdownComponent,
    DatepickerComponent,
    HeaderComponent,
    LoaderComponent,
    ModalComponent,
    FooterComponent,
    CustomizerComponent,
    CarComponent,
  ],
  providers: [BaseService],
})
export class SharedModule {}
