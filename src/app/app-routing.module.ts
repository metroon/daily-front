import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentTemplateComponent } from './shared/components/templates/content-template/content-template.component';
import { FullTemplateComponent } from './shared/components/templates/full-template/full-template.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FullTemplateComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/sorter/sorter.module').then((m) => m.SorterModule),
      },
      // {
      //   path: 'login',
      //   loadChildren: () =>
      //     import('./pages/auth/auth.module').then((m) => m.AuthModule),
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
