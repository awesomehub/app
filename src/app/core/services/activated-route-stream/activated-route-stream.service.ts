import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, PRIMARY_OUTLET } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from "../../../app.state";
import { getRouterPath } from "../../state";

@Injectable()
export class ActivatedRouteStream {

  private stream: Observable<ActivatedRouteSnapshot>;

  constructor(private router: Router, private store$: Store<AppState>) {
    this.stream = this.store$
      .let(getRouterPath())
      .switchMap(() => {
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
