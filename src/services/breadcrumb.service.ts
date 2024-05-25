import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, map} from "rxjs";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  title$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.title) {
            routeTitle = route!.snapshot.title;
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        console.log('route:', title)
        if (title) {
          this.title$.next(title);
        }
      });
  }
}
