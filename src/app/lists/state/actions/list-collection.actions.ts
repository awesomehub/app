import { Action } from '@ngrx/store';

import { ListCollectionResponse } from '../../../core';
import { Response } from '@angular/http';

export class ListCollectionActions {

  static FETCH_FAILED   = '[LIST COLLECTION] FETCH FAILED';
  static FETCH_SUCCESS  = '[LIST COLLECTION] FETCH SUCCESS';
  static FETCH          = '[LIST COLLECTION] FETCH';

  static fetchFailed(id: string, response: Response): Action {
    return {
      type: ListCollectionActions.FETCH_FAILED,
      payload: Object.assign({}, response, { id })
    };
  }

  static fetchSuccess(id: string, data: ListCollectionResponse): Action {
    return {
      type: ListCollectionActions.FETCH_SUCCESS,
      payload: Object.assign({}, data, { id })
    };
  }

  static fetch(id: string): Action {
    return {
      type: ListCollectionActions.FETCH,
      payload: {
        id
      }
    };
  }
}
