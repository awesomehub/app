import { Action as StoreAction } from '@ngrx/store';

export interface Action extends StoreAction {
  readonly payload: any;
}
