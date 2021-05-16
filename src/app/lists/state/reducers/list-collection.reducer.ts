import { ActionReducer } from '@ngrx/store';
import { Action } from '@app/common';
import { ListSummaryResponse } from '@app/core';
import { ListCollection, ListCollectionRecord, ListCollectionActions, createListSummary } from '@app/lists';

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
