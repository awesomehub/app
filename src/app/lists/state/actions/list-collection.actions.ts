import type { HttpErrorResponse } from '@angular/common/http'
import type { Action } from '@app/common'
import type { ListCollectionResponse } from '@app/core'

export class ListCollectionActions {
  static FETCH_FAILED = '[LIST COLLECTION] FETCH FAILED'
  static FETCH_SUCCESS = '[LIST COLLECTION] FETCH SUCCESS'
  static FETCH = '[LIST COLLECTION] FETCH'

  static fetchFailed(id: string, response: HttpErrorResponse | Error): Action {
    return {
      type: ListCollectionActions.FETCH_FAILED,
      payload: { ...response, id },
    }
  }

  static fetchSuccess(id: string, data: ListCollectionResponse): Action {
    return {
      type: ListCollectionActions.FETCH_SUCCESS,
      payload: { ...data, id },
    }
  }

  static fetch(id: string): Action {
    return {
      type: ListCollectionActions.FETCH,
      payload: { id },
    }
  }
}
