import type { HttpErrorResponse } from '@angular/common/http'
import type { Action } from '@app/common'
import type { ListResponse } from '@app/core'

export class ListActions {
  static FETCH_FAILED = '[LIST] FETCH FAILED'
  static FETCH_SUCCESS = '[LIST] FETCH SUCCESS'
  static FETCH = '[LIST] FETCH'

  static fetchFailed(id: string, response: HttpErrorResponse | Error): Action {
    return {
      type: ListActions.FETCH_FAILED,
      payload: { ...response, id },
    }
  }

  static fetchSuccess(id: string, data: ListResponse): Action {
    return {
      type: ListActions.FETCH_SUCCESS,
      payload: { ...data, id },
    }
  }

  static fetch(id: string): Action {
    return {
      type: ListActions.FETCH,
      payload: { id },
    }
  }
}
