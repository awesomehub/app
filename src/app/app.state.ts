import { compose } from '@ngrx/core';
import { Reducers } from './common';
import { Recordsets } from './recordsets';
import { ListCollections, Lists, listCollectionsReducer, listsReducer } from './lists';
import { coreReducers, coreMetaReducers } from './core';

export interface AppState {
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
