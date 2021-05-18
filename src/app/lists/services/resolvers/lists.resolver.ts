import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { first, distinctUntilChanged } from 'rxjs/operators';
import { config } from '@constants';
import { AppState } from '@app';
import { ListCollectionActions, ListCollection, selectListCollection } from '@app/lists';

@Injectable()
export class ListsDataResolver implements Resolve<ListCollection> {
  constructor(private store$: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ListCollection> {
    const { defaultCollection } = config.lists

    this.store$.dispatch(
      ListCollectionActions.fetch(defaultCollection)
    );

    return this.store$.pipe(
      select(selectListCollection(defaultCollection)),
      distinctUntilChanged(),
      first(({loaded}) => loaded)
    )
      .toPromise()
  }
}
