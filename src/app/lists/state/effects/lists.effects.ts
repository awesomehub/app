import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';

import { AppState } from '../../../app.state';
import { ApiService } from '../../../core';
import { ListsConfig } from '../../lists.config';
import { getListCollection, getList } from '../selectors';
import { ListCollectionActions, ListActions } from '../actions';
import { listSummaryRecordsetReducer, listRepoRecordsetReducer } from '../reducers';
import { ListCollection, ListSummary, List, ListRepo } from '../models';
import { RecordsetActions, Recordset, getRecordsetsForUpdate } from '../../../recordsets';

@Injectable()
export class ListsEffects {

  @Effect()
  show404$ = this.actions$
    .ofType(ListCollectionActions.FETCH_FAILED, ListActions.FETCH_FAILED)
    .filter(action => {
      this.router.navigate(['404']);
      return false;
    });

  @Effect()
  loadListCollection$ = this.actions$
    .ofType(ListCollectionActions.FETCH)
    .mergeMap((action: Action) => this.store$.let(getListCollection(action.payload.id)))
    .filter(({loaded}) => !loaded)
    .switchMap((collection: ListCollection) =>
      this.api.fetchListCollection(collection.id)
        .map(data => ListCollectionActions.fetchSuccess(collection.id, data))
        .catch(error => Observable.of(ListCollectionActions.fetchFailed(collection.id, error)))
    );

  @Effect()
  loadList$ = this.actions$
    .ofType(ListActions.FETCH)
    .mergeMap((action: Action) => this.store$.let(getList(action.payload.id)))
    .filter(({loaded}) => !loaded)
    .switchMap((list: List) =>
      this.api.fetchList(list.id)
        .map(data => ListActions.fetchSuccess(list.id, data))
        .catch(error => Observable.of(ListActions.fetchFailed(list.id, error)))
    );

  @Effect()
  updateListSummaryRecordsets$ = this.store$
    .let(getRecordsetsForUpdate(ListsConfig.LIST_SUMMARY_RECORDSET))
    .filter(({parent}) => !!parent)
    .switchMap((recordset: Recordset<ListSummary>) =>
      this.store$.let(getListCollection(recordset.parent))
        .filter(({loaded}) => loaded)
        .map((collection: ListCollection) => RecordsetActions.update(recordset.id, listSummaryRecordsetReducer, collection))
    );

  @Effect()
  updateListRepoRecordsets$ = this.store$
    .let(getRecordsetsForUpdate(ListsConfig.LIST_REPO_RECORDSET))
    .filter(({parent}) => !!parent)
    .switchMap((recordset: Recordset<ListRepo>) =>
      this.store$.let(getList(recordset.parent))
        .filter(({loaded}) => loaded)
        .map((list: List) => RecordsetActions.update(recordset.id, listRepoRecordsetReducer, list))
    );

  constructor(
      private actions$: Actions,
      private api: ApiService,
      private store$: Store<AppState>,
      private router: Router
  ) { }
}
