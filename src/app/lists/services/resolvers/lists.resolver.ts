import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '../../../app.state';
import { ListsConfig } from '../../lists.config';
import { ListCollectionActions, ListCollection, selectListCollection } from '../../state';

@Injectable()
export class ListsDataResolver implements Resolve<ListCollection> {
  constructor(private store$: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ListCollection> {
    this.store$.dispatch(
      ListCollectionActions.fetch(ListsConfig.DEFAULT_LIST_COLLECTION)
    );

    return this.store$.pipe(
      select(selectListCollection, { id: ListsConfig.DEFAULT_LIST_COLLECTION }),
      distinctUntilChanged(),
      first(({loaded}) => loaded)
    )
    .toPromise()
  }
}
