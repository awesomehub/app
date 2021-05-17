import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, PRIMARY_OUTLET } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, distinctUntilChanged, filter } from 'rxjs/operators';

import { AppState } from "@app";
import { selectRouterState } from "@app/core";

@Injectable()
export class ActivatedRouteStreamService {

  private stream: Observable<ActivatedRouteSnapshot>;

  constructor(private router: Router, private store$: Store<AppState>) {
    this.stream = this.store$.pipe(
      select(selectRouterState),
      distinctUntilChanged(),
      switchMap(() => {
        return this.getChildRoutes(this.router.routerState.snapshot.root);
      }),
      distinctUntilChanged()
    );
  }

  getOutletStream(outlet: string = PRIMARY_OUTLET): Observable<ActivatedRouteSnapshot> {
    return this.stream.pipe(filter(ar => ar.outlet === outlet));
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
