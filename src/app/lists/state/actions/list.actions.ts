import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@app/common';
import { ListResponse } from '@app/core';

export class ListActions {
  static FETCH_FAILED   = '[LIST] FETCH FAILED';
  static FETCH_SUCCESS  = '[LIST] FETCH SUCCESS';
  static FETCH          = '[LIST] FETCH';

  static fetchFailed(id: string, response: HttpErrorResponse): Action {
    return {
      type: ListActions.FETCH_FAILED,
      payload: Object.assign({}, response, { id })
    };
  }

  static fetchSuccess(id: string, data: ListResponse): Action {
    return {
      type: ListActions.FETCH_SUCCESS,
      payload: Object.assign({}, data, { id })
    };
  }

  static fetch(id: string): Action {
    return {
      type: ListActions.FETCH,
      payload: {
        id
      }
    };
  }
}
