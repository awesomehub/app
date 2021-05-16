import { ActionReducer } from '@ngrx/store';
import { AppState } from '@app';

export function debugReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state, action) {
    const result = reducer(state, action);
    console.groupCollapsed(`[DEBUG REDUCER]: ${action.type}`);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}
