import { ActionReducer } from '@ngrx/store'
import { Action } from '@app/common'
import { ListCollectionActions } from '../actions'
import { ListCollection, ListCollectionFactory } from '../models'

const initialState = ListCollectionFactory.create()

export const listCollectionReducer: ActionReducer<ListCollection> = (
  state: ListCollection = initialState,
  { payload, type }: Action,
) => {
  switch (type) {
    case ListCollectionActions.FETCH_SUCCESS:
      return ListCollectionFactory.fromResponse(payload)

    case ListCollectionActions.FETCH:
      return ListCollectionFactory.create(payload)

    default:
      return state
  }
}
