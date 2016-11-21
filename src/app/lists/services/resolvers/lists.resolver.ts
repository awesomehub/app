import 'rxjs/add/operator/let';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppState } from '../../../app.state';
import { ListsConfig } from '../../lists.config';
import { ListCollectionActions, ListCollection, getListCollection } from '../../state';

@Injectable()
export class ListsDataResolver implements Resolve<ListCollection> {
  constructor(private store$: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ListCollection> {
    this.store$.dispatch(
      ListCollectionActions.fetch(ListsConfig.DEFAULT_LIST_COLLECTION)
    );

    return this.store$
      .let(getListCollection(ListsConfig.DEFAULT_LIST_COLLECTION))
      .first(({loaded}) => loaded)
      .toPromise();
  }
}
