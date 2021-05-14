import { ActionReducer } from '@ngrx/store';
import { Action } from '../../../common';
import { ListResponse } from '../../../core';
import { List, ListRecordFactory } from '../models';
import { ListActions } from '../actions';

export const listReducer: ActionReducer<List> = (state: List = null, {payload, type}: Action) => {
  switch (type) {
    case ListActions.FETCH_SUCCESS:
      return Object.assign({}, state, ListRecordFactory.fromResponse(<ListResponse>payload));

    case ListActions.FETCH:
      return ListRecordFactory.empty(payload.id);

    default:
      return state;
  }
};
