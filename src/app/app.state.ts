import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { RouterReducerState, routerReducer } from '@ngrx/router-store'
import { coreMetaReducers } from './core'
import { Recordsets, recordsetsReducer } from './recordsets'
import { ListCollections, Lists, listCollectionsReducer, listsReducer } from './lists'

export interface AppState {
  router: RouterReducerState<any>
  recordsets: Recordsets
  collections: ListCollections
  lists: Lists
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  recordsets: recordsetsReducer,
  collections: listCollectionsReducer,
  lists: listsReducer,
}

export const metaReducers: MetaReducer<AppState>[] = coreMetaReducers
