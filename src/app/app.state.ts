import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { coreMetaReducers } from '@app/core';
import { Recordsets, recordsetsReducer } from '@app/recordsets';
import { ListCollections, Lists, listCollectionsReducer, listsReducer } from '@app/lists';

export interface AppState {
  router: RouterReducerState<any>;
  recordsets: Recordsets;
  collections: ListCollections;
  lists: Lists;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  recordsets: recordsetsReducer,
  collections: listCollectionsReducer,
  lists: listsReducer
};

export const metaReducers: Array<MetaReducer<AppState>> = coreMetaReducers;
