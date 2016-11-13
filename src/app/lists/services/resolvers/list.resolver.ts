import 'rxjs/add/operator/let';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppState } from '../../../app.state';
import { ListActions, List, getList } from '../../state';

@Injectable()
export class ListDataResolver implements Resolve<any> {

  constructor(private store$: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Promise<List> {
    let id = route.params['id'];

    this.store$.dispatch(
      ListActions.fetch(id)
    );

    return this.store$
      .let(getList(id))
      .first(({loaded}) => loaded)
      .toPromise();
  }
}
