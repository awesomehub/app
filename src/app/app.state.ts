import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { coreMetaReducers } from './core';
import { Recordsets } from './recordsets';
import { ListCollections, Lists, listCollectionsReducer, listsReducer } from './lists';
import { recordsetsReducer } from './recordsets';

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
