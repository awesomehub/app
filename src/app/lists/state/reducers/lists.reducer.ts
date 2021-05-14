import { Action } from '../../../common'
import { List } from '../models';
import { ListActions } from '../actions';
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
