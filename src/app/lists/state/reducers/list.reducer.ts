import { ActionReducer } from '@ngrx/store'
import { Action } from '@app/common'
import { ListActions } from '../actions'
import { List, ListRecordFactory } from '../models'

export const listReducer: ActionReducer<List> = (state: List = null, { payload, type }: Action) => {
  switch (type) {
    case ListActions.FETCH_SUCCESS:
      return ListRecordFactory.fromResponse(payload)

    case ListActions.FETCH:
      return ListRecordFactory.create(payload)

    default:
      return state
  }
}
