import { Action } from '@app/common'
import { ListCollection, ListCollectionActions } from '@app/lists'
import { listCollectionReducer } from './list-collection.reducer'

export type ListCollections = Record<string, ListCollection>

export function listCollectionsReducer(state: ListCollections = {}, action: Action): ListCollections {
  switch (action.type) {
    case ListCollectionActions.FETCH:
      if (state[action.payload.id]) {
        return state
      }
      return {
        ...state,
        [action.payload.id]: listCollectionReducer(undefined, action),
      }

    case ListCollectionActions.FETCH_SUCCESS:
    case ListCollectionActions.FETCH_FAILED:
      return {
        ...state,
        [action.payload.id]: listCollectionReducer(state[action.payload.id], action),
      }

    default:
      return state
  }
}
