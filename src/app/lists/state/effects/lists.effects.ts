import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Action } from '@app/common'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { filter, map, mergeMap, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators'
import { config } from '@constants'
import { ApiService } from '@app/core'
import { RecordsetActions, Recordset, selectRecordsetsForUpdate } from '@app/recordsets'
import {
  selectListCollection,
  selectList,
  ListCollectionActions,
  ListActions,
  listSummaryRecordsetReducer,
  listRepoRecordsetReducer,
  ListCollection,
  ListSummary,
  List,
  ListRepo,
} from '@app/lists'

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class ListsEffects {
  private actions$ = inject(Actions)
  private api = inject(ApiService)
  private store$ = inject(Store)
  private router = inject(Router)

  show404$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListCollectionActions.FETCH_FAILED, ListActions.FETCH_FAILED),
      filter((action) => {
        this.router.navigate(['404'])
        return false
      }),
    )
  })

  loadListCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListCollectionActions.FETCH),
      mergeMap((action: Action) =>
        this.store$.select(selectListCollection(action.payload.id)).pipe(distinctUntilChanged()),
      ),
      filter((c) => c && !c.loaded),
      switchMap((collection: ListCollection) =>
        this.api.fetchListCollection(collection.id).pipe(
          map((data) => ListCollectionActions.fetchSuccess(collection.id, data)),
          catchError((error) => of(ListCollectionActions.fetchFailed(collection.id, error))),
        ),
      ),
    )
  })

  loadList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.FETCH),
      mergeMap((action: Action) => this.store$.select(selectList(action.payload.id)).pipe(distinctUntilChanged())),
      filter((l) => l && !l.loaded),
      switchMap((list: List) =>
        this.api.fetchList(list.id).pipe(
          map((data) => ListActions.fetchSuccess(list.id, data)),
          catchError((error) => of(ListActions.fetchFailed(list.id, error))),
        ),
      ),
    )
  })

  updateListSummaryRecordsets$ = createEffect(() => {
    return this.store$.select(selectRecordsetsForUpdate(config.lists.recordsets.summary)).pipe(
      distinctUntilChanged(),
      filter((r) => r && !!r.parent),
      switchMap((recordset: Recordset<ListSummary>) =>
        this.store$.select(selectListCollection(recordset.parent)).pipe(
          distinctUntilChanged(),
          filter((c) => c && c.loaded),
          map((collection: ListCollection) =>
            RecordsetActions.update(recordset.id, listSummaryRecordsetReducer, collection),
          ),
        ),
      ),
    )
  })

  updateListRepoRecordsets$ = createEffect(() => {
    return this.store$.select(selectRecordsetsForUpdate(config.lists.recordsets.repo)).pipe(
      distinctUntilChanged(),
      filter((r) => r && !!r.parent),
      switchMap((recordset: Recordset<ListRepo>) =>
        this.store$.select(selectList(recordset.parent)).pipe(
          distinctUntilChanged(),
          filter((l) => l && l.loaded),
          map((list: List) => RecordsetActions.update(recordset.id, listRepoRecordsetReducer, list)),
        ),
      ),
    )
  })
}
