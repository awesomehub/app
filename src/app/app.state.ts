import { compose } from '@ngrx/core';
import { RouterState } from '@ngrx/router-store';
import { Reducers } from './common';
import { Recordsets } from './recordsets';
import { ListCollections, Lists, listCollectionsReducer, listsReducer } from './lists';
import { coreReducers, coreMetaReducers } from './core';

export interface AppState {
  router: RouterState;
  recordsets: Recordsets;
  collections: ListCollections;
  lists: Lists;
}

export const reducers: Reducers = {
  collections: listCollectionsReducer,
  lists: listsReducer
};

export function rootReducer(state: any, action: any) {
  return compose(...coreMetaReducers)(Object.assign(coreReducers, reducers))(state, action);
}
