import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

@Injectable()
export class ActivatedRouteStream {

  private stream: Observable<ActivatedRoute>;

  constructor(private router: Router) {
    this.stream = this.router.events
      .filter((e: Event) => e instanceof NavigationEnd)
      .switchMap(e => {
        return this.getChildRoutes(this.router.routerState.root);
      })
      .distinctUntilChanged();
  }

  getOutletStream(outlet: string = 'primary'): Observable<ActivatedRoute> {
    return this.stream
      .filter(ar => ar.outlet === outlet);
  }

  private getChildRoutes(root: ActivatedRoute) {
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
