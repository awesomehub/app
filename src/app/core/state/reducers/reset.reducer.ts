import { ActionReducer, Action } from '@ngrx/store';

/**
 * Middleware reducer for resetting the whole app state
 */
export function resetReducer(reducer: Function): ActionReducer<any> {
  return function (state: any, action: Action) {
    if (action.type === 'RESET_STATE' && action.payload) {
      state = Object.assign({}, action.payload);
    }
    return reducer(state, action);
  };
}
