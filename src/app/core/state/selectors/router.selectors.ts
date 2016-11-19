import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';

import { RouterState } from '@ngrx/router-store';

import { AppState } from '../../../app.state';
import { Selector } from '../../../common';

export function getRouter(): Selector<AppState, RouterState> {
  return (state$: Observable<AppState>) => state$
    .select(state => state.router)
    .distinctUntilChanged();
}

export function getRouterPath(): Selector<AppState, string> {
  return (state$: Observable<AppState>) => state$
    .let(getRouter())
    .select((router: RouterState) => router.path)
    // This filters the initial router state {path:''}
    .filter(path => path.length > 0)
    .distinctUntilChanged();
}
