import { Breadcrumb } from './../models/breadcrumb';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();
  private readonly _activeBreadcrumbs$ = new BehaviorSubject<string>('');
  readonly activeBreadcrumbs$ = this._activeBreadcrumbs$.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (!event.url.includes('/login')) {
          this._breadcrumbs$.next(
            this.buildBreadCrumb(this.activatedRoute.root)
          );
          this.buildVariants();
        }
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    //Se nenhum routeConfig estiver disponível, está no path raiz
    var label = '';
    var path = '';
    var icon = '';
    if (route.routeConfig) {
      path = route.routeConfig.path;
      if (route.routeConfig.data) {
        label = route.routeConfig.data.breadcrumb?.title;
        icon = route.routeConfig.data.breadcrumb?.icon;
      }
    }
    // Se a rota for uma rota dinâmica, como ':id', remova-a
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: Breadcrumb = {
      title: label,
      path: nextUrl,
      icon: icon,
    };
    // apenas adicionar rotas com o title diferente de vazio
    const newBreadcrumbs = breadcrumb.title
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  buildVariants() {
    this._activeBreadcrumbs$.next(
      this._breadcrumbs$.value[this._breadcrumbs$.value.length - 1]?.title
    );
    this._breadcrumbs$.value[this._breadcrumbs$.value.length - 1].active = true;
  }
}
