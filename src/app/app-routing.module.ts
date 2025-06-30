import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentTemplateComponent } from './shared/components/templates/content-template/content-template.component';
import { FullTemplateComponent } from './shared/components/templates/full-template/full-template.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: FullTemplateComponent,
    children: [
      // outras rotas filhas explícitas aqui, se houver
    ],
  },
  {
    path: 'sorter',
    loadChildren: () =>
      import('./pages/sorter/sorter.module').then((m) => m.SorterModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
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
