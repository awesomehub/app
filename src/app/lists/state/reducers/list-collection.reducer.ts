import { ActionReducer } from '@ngrx/store';
import { Action } from '../../../common';
import { ListSummaryResponse } from '../../../core';
import { ListCollection, ListCollectionRecord, createListSummary } from '../models';
import { ListCollectionActions } from '../actions';

const initialState: ListCollection = new ListCollectionRecord();

export const listCollectionReducer: ActionReducer<ListCollection> = (state: ListCollection = initialState, {payload, type}: Action) => {
  switch (type) {
    case ListCollectionActions.FETCH_SUCCESS:
      return Object.assign({}, state, {
        loaded: true,
        lists: [
          ...
          payload.lists.map((data: ListSummaryResponse) => {
            return createListSummary(data);
          })
        ]
      });

    case ListCollectionActions.FETCH:
      return Object.assign({}, state, {
        id: payload.id
      });

    default:
      return state;
  }
};
