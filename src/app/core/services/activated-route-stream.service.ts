import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, PRIMARY_OUTLET } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { switchMap, distinctUntilChanged, filter } from 'rxjs/operators'

import { selectRouterState } from '@app/core'

@Injectable()
export class ActivatedRouteStreamService {
  private readonly stream: Observable<ActivatedRouteSnapshot>

  constructor(
    private readonly router: Router,
    private readonly store$: Store,
  ) {
    this.stream = this.store$.select(selectRouterState).pipe(
      distinctUntilChanged(),
      switchMap(() => {
        return this.getChildRoutes(this.router.routerState.snapshot.root)
      }),
      distinctUntilChanged(),
    )
  }

  getOutletStream(outlet: string = PRIMARY_OUTLET): Observable<ActivatedRouteSnapshot> {
    return this.stream.pipe(filter((ar) => ar.outlet === outlet))
  }

  private getChildRoutes(root: ActivatedRouteSnapshot) {
    const routes = []
    for (const route of root.children) {
      if (route.component) {
        routes.push(route)
      }
      routes.push(...this.getChildRoutes(route))
    }
    return routes
  }
}
