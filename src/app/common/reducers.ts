import { ActionReducer } from '@ngrx/store';

export interface MetaReducer {
  (reducer: any): ActionReducer<any>;
}

export type Reducers = {
  [index: string]: ActionReducer<any>;
}

export type MetaReducers = Array<MetaReducer>;
