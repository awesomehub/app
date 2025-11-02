import { createReducer, on } from '@ngrx/store'
import { ListCollection, ListCollectionFactory } from '../models'
import { ListCollectionActions } from '../actions'

export type ListCollections = Record<string, ListCollection>

const initialState: ListCollections = {}

export const listCollectionsReducer = createReducer(
  initialState,
  on(ListCollectionActions.fetch, (state, { id }): ListCollections => {
    if (state[id]) {
      return state
    }
    return {
      ...state,
      [id]: ListCollectionFactory.create({ id }),
    }
  }),
  on(ListCollectionActions.fetchSuccess, (state, { id, data }): ListCollections => {
    return {
      ...state,
      [id]: ListCollectionFactory.fromResponse(data),
    }
  }),
  on(ListCollectionActions.fetchFailed, (state, { id }): ListCollections => {
    return {
      ...state,
      [id]: state[id],
    }
  }),
)
