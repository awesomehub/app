import { ActionReducer } from '@ngrx/store'
import { Action } from '@app/common'
import { ListResponse } from '@app/core'
import { ListActions } from '../actions'
import { List, ListRecordFactory } from '../models'

export const listReducer: ActionReducer<List> = (state: List = null, { payload, type }: Action) => {
  switch (type) {
    case ListActions.FETCH_SUCCESS:
      return Object.assign({}, state, ListRecordFactory.fromResponse(payload as ListResponse))

    case ListActions.FETCH:
      return ListRecordFactory.empty(payload.id)

    default:
      return state
  }
}
