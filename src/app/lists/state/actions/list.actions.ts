import { Action } from '@ngrx/store';

import { ListResponse } from '../../../core';
import { Response } from '@angular/http';

export class ListActions {

  static FETCH_FAILED   = '[LIST] FETCH FAILED';
  static FETCH_SUCCESS  = '[LIST] FETCH SUCCESS';
  static FETCH          = '[LIST] FETCH';

  static fetchFailed(id: string, response: Response): Action {
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
