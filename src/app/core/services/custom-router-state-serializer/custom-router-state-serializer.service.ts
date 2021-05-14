import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterState } from '../../state';

@Injectable()
export class CustomRouterStateSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: {
        queryParams
      }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
