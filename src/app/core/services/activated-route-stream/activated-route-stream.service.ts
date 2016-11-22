import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Event, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

@Injectable()
export class ActivatedRouteStream {

  private stream: Observable<ActivatedRouteSnapshot>;

  constructor(private router: Router) {
    this.stream = this.router.events
      .filter((e: Event) => e instanceof NavigationEnd)
      .switchMap(e => {
        return this.getChildRoutes(this.router.routerState.snapshot.root);
      })
      .distinctUntilChanged();
  }

  getOutletStream(outlet: string = PRIMARY_OUTLET): Observable<ActivatedRouteSnapshot> {
    return this.stream
      .filter(ar => ar.outlet === outlet);
  }

  private getChildRoutes(root: ActivatedRouteSnapshot) {
    let routes = [];
    for (let route of root.children) {
      if (route.component) {
        routes.push(route);
      }
      routes.push(...this.getChildRoutes(route));
    }

    return routes;
  }
}
