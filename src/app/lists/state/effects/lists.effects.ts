import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Action } from '../../../common';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, map, tap, mergeMap, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '../../../app.state';
import { ApiService } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { selectListCollection, selectList } from '../selectors';
import { ListCollectionActions, ListActions } from '../actions';
import { listSummaryRecordsetReducer, listRepoRecordsetReducer } from '../reducers';
import { ListCollection, ListSummary, List, ListRepo } from '../models';
import { RecordsetActions, Recordset, selectRecordsetsForUpdate } from '../../../recordsets';

@Injectable()
export class ListsEffects {

  @Effect()
  show404$ = this.actions$.pipe(
    ofType(ListCollectionActions.FETCH_FAILED, ListActions.FETCH_FAILED),
    filter(action => {
      this.router.navigate(['404']);
      return false;
    })
  );

  @Effect()
  loadListCollection$ = this.actions$.pipe(
    ofType(ListCollectionActions.FETCH),
    mergeMap((action: Action) => 
      this.store$.pipe(
        select(selectListCollection, { id: action.payload.id }),
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
  );

  @Effect()
  loadList$ = this.actions$.pipe(
    ofType(ListActions.FETCH),
    mergeMap((action: Action) => 
      this.store$.pipe(
        select(selectList, { id: action.payload.id }),
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
  )

  @Effect()
  updateListSummaryRecordsets$ = this.store$.pipe(
    select(selectRecordsetsForUpdate, { reducer: ListsConfig.LIST_SUMMARY_RECORDSET }),
    distinctUntilChanged(),
    filter(r => r && !!r.parent),
    tap(val => console.log('BEFORE Filter', val)),
    switchMap((recordset: Recordset<ListSummary>) =>
      this.store$.pipe(
        select(selectListCollection, { id: recordset.parent }),
        distinctUntilChanged(),
        filter(c => c && c.loaded),
        map((collection: ListCollection) => RecordsetActions.update(recordset.id, listSummaryRecordsetReducer, collection))
      )
    )
  )

  @Effect()
  updateListRepoRecordsets$ = this.store$.pipe(
    select(selectRecordsetsForUpdate, { reducer: ListsConfig.LIST_REPO_RECORDSET }),
    distinctUntilChanged(),
    filter(r => r && !!r.parent),
    switchMap((recordset: Recordset<ListRepo>) =>
      this.store$.pipe(
        select(selectList, { id: recordset.parent }),
        distinctUntilChanged(),
        filter(l => l && l.loaded),
        map((list: List) => RecordsetActions.update(recordset.id, listRepoRecordsetReducer, list))
      )
    )
  )

  constructor(
      private actions$: Actions,
      private api: ApiService,
      private store$: Store<AppState>,
      private router: Router
  ) { }
}
