import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.state';
import { Selector } from '../../../common';
import { ListCollections, Lists } from '../reducers';
import { ListCollection, List } from '../models';

export function getListCollections(): Selector<AppState, ListCollection> {
  return (state$: Observable<AppState>) => state$
    .map(state => state.collections)
    .distinctUntilChanged()
    .switchMap((collections: ListCollections) => {
      // convert it to array so that we emit one collection at a time
      return Object.keys(collections).map(key => collections[key]);
    });
}

export function getListCollection(id: string): Selector<AppState, ListCollection> {
  return (state$: Observable<AppState>) => state$
    .let(getListCollections())
    .filter((collection: ListCollection) => collection.id === id)
    .distinctUntilChanged();
}

export function getLists(): Selector<AppState, List> {
  return (state$: Observable<AppState>) => state$
    .map(state => state.lists)
    .distinctUntilChanged()
    .switchMap((lists: Lists) => {
      // convert it to array so that we emit one list at a time
      return Object.keys(lists).map(key => lists[key]);
    });
}

export function getList(id: string): Selector<AppState, List> {
  return (state$: Observable<AppState>) => state$
    .let(getLists())
    .filter((list: List) => list.id === id)
    .distinctUntilChanged();
}
