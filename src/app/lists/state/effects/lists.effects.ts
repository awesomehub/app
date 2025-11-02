import { Injectable, inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { filter, map, mergeMap, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators'
import { config } from '@constants'
import { LocalApiService } from '@app/core'
import { RecordsetActions, selectDirtyRecordset } from '@app/recordsets'
import { ListSummary, ListRepo } from '../models'
import { ListActions, ListCollectionActions } from '../actions'
import { selectListCollection, selectList } from '../selectors'
import { listRepoRecordsetReducer, listSummaryRecordsetReducer } from '../reducers'

// noinspection JSUnusedGlobalSymbols
@Injectable()
export class ListsEffects {
  private actions$ = inject(Actions)
  private api = inject(LocalApiService)
  private store$ = inject(Store)
  private router = inject(Router)

  show404$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ListCollectionActions.fetchFailed, ListActions.fetchFailed),
        filter(() => {
          this.router.navigate(['404'])
          return false
        }),
      )
    },
    { dispatch: false },
  )

  loadListCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListCollectionActions.fetch),
      mergeMap(({ id }) => this.store$.select(selectListCollection(id)).pipe(distinctUntilChanged())),
      filter((c) => c && !c.loaded),
      switchMap(({ id }) =>
        this.api.fetchListCollection(id).pipe(
          map((data) => ListCollectionActions.fetchSuccess({ id, data })),
          catchError((error) => of(ListCollectionActions.fetchFailed({ id, error }))),
        ),
      ),
    )
  })

  loadList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.fetch),
      mergeMap((action) => this.store$.select(selectList(action.id)).pipe(distinctUntilChanged())),
      filter((l) => l && !l.loaded),
      switchMap((list) =>
        this.api.fetchList(list.id).pipe(
          map((data) => ListActions.fetchSuccess({ id: list.id, data })),
          catchError((error) => of(ListActions.fetchFailed({ id: list.id, error }))),
        ),
      ),
    )
  })

  updateListSummaryRecordsets$ = createEffect(() => {
    return this.store$.select(selectDirtyRecordset<ListSummary>(config.lists.recordsets.summary)).pipe(
      distinctUntilChanged(),
      filter((rs) => !!rs?.parent),
      switchMap(({ id, parent }) =>
        this.store$.select(selectListCollection(parent)).pipe(
          distinctUntilChanged(),
          filter((collection) => collection?.loaded),
          map((state) => RecordsetActions.update({ id, reducer: listSummaryRecordsetReducer, state })),
        ),
      ),
    )
  })

  updateListRepoRecordsets$ = createEffect(() => {
    return this.store$.select(selectDirtyRecordset<ListRepo>(config.lists.recordsets.repo)).pipe(
      distinctUntilChanged(),
      filter((rs) => !!rs?.parent),
      switchMap(({ id, parent }) =>
        this.store$.select(selectList(parent)).pipe(
          distinctUntilChanged(),
          filter((list) => list?.loaded),
          map((state) => RecordsetActions.update({ id, reducer: listRepoRecordsetReducer, state })),
        ),
      ),
    )
  })
}
