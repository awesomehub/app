import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Action } from '@app/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, map, mergeMap, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { config } from '@constants';
import { AppState } from '@app';
import { ApiService } from '@app/core';
import { RecordsetActions, Recordset, selectRecordsetsForUpdate } from '@app/recordsets';
import {
  selectListCollection, selectList,
  ListCollectionActions, ListActions,
  listSummaryRecordsetReducer, listRepoRecordsetReducer,
  ListCollection, ListSummary, List, ListRepo
} from '@app/lists';

@Injectable()
export class ListsEffects {

  show404$ = createEffect(() => this.actions$.pipe(
    ofType(ListCollectionActions.FETCH_FAILED, ListActions.FETCH_FAILED),
    filter(action => {
      this.router.navigate(['404']);
      return false;
    })
  ));

  loadListCollection$ = createEffect(() => this.actions$.pipe(
    ofType(ListCollectionActions.FETCH),
    mergeMap((action: Action) =>
      this.store$.pipe(
        select(selectListCollection(action.payload.id)),
        distinctUntilChanged()
      )
    ),
    filter(c => c && !c.loaded),
    switchMap((collection: ListCollection) =>
      this.api.fetchListCollection(collection.id).pipe(
        map(data => ListCollectionActions.fetchSuccess(collection.id, data)),
        catchError(error => of(ListCollectionActions.fetchFailed(collection.id, error)))
      )
    )
  ));

  loadList$ = createEffect(() => this.actions$.pipe(
    ofType(ListActions.FETCH),
    mergeMap((action: Action) =>
      this.store$.pipe(
        select(selectList(action.payload.id)),
        distinctUntilChanged()
      )
    ),
    filter(l => l && !l.loaded),
    switchMap((list: List) =>
      this.api.fetchList(list.id).pipe(
        map(data => ListActions.fetchSuccess(list.id, data)),
        catchError(error => of(ListActions.fetchFailed(list.id, error)))
      )
    )
  ));

  updateListSummaryRecordsets$ = createEffect(() => this.store$.pipe(
    select(selectRecordsetsForUpdate(config.lists.recordsets.summary)),
    distinctUntilChanged(),
    filter(r => r && !!r.parent),
    switchMap((recordset: Recordset<ListSummary>) =>
      this.store$.pipe(
        select(selectListCollection(recordset.parent)),
        distinctUntilChanged(),
        filter(c => c && c.loaded),
        map((collection: ListCollection) => RecordsetActions.update(recordset.id, listSummaryRecordsetReducer, collection))
      )
    )
  ));

  updateListRepoRecordsets$ = createEffect(() => this.store$.pipe(
    select(selectRecordsetsForUpdate(config.lists.recordsets.repo)),
    distinctUntilChanged(),
    filter(r => r && !!r.parent),
    switchMap((recordset: Recordset<ListRepo>) =>
      this.store$.pipe(
        select(selectList(recordset.parent)),
        distinctUntilChanged(),
        filter(l => l && l.loaded),
        map((list: List) => RecordsetActions.update(recordset.id, listRepoRecordsetReducer, list))
      )
    )
  ));

  constructor(
      private actions$: Actions,
      private api: ApiService,
      private store$: Store<AppState>,
      private router: Router
  ) {}
}
