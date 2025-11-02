import { createReducer, on } from '@ngrx/store'
import { List, ListRecordFactory } from '../models'
import { ListActions } from '../actions'

export type Lists = Record<string, List>

const initialState: Lists = {}

export const listsReducer = createReducer(
  initialState,
  on(ListActions.fetch, (state, action): Lists => {
    if (state[action.id]) {
      return state
    }
    return {
      ...state,
      [action.id]: ListRecordFactory.create({ id: action.id }),
    }
  }),
  on(ListActions.fetchSuccess, (_, action): Lists => {
    // We are not merging prev state to allow only one fetched list to be available at any time
    // This is to reduce app memory consumption
    return {
      [action.id]: ListRecordFactory.fromResponse(action.data),
    }
  }),
  on(ListActions.fetchFailed, (state, action): Lists => {
    return {
      [action.id]: state[action.id],
    }
  }),
)
