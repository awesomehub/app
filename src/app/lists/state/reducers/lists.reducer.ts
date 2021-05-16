import { Action } from '@app/common'
import { List, ListActions } from '@app/lists';
import { listReducer } from './list.reducer';

export type Lists = {
  [index: string]: List;
}

export function listsReducer(state: Lists = {}, action: Action): Lists {
  switch (action.type) {
  case ListActions.FETCH:
    if (state[action.payload.id]) {
      return state;
    }

    return Object.assign({}, state, {
      [action.payload.id]: listReducer(undefined, action)
    });

  case ListActions.FETCH_SUCCESS:
  case ListActions.FETCH_FAILED:
    return Object.assign({}, state, {
      [action.payload.id]: listReducer(state[action.payload.id], action)
    });

  default:
    return state;
  }
}
