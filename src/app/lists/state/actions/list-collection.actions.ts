import { createAction, props } from '@ngrx/store'
import type { HttpErrorResponse } from '@angular/common/http'
import type { ListCollectionResponse } from '@app/core'

export const ListCollectionActions = {
  fetch: createAction('[LIST COLLECTION] FETCH', props<{ id: string }>()),
  fetchSuccess: createAction('[LIST COLLECTION] FETCH SUCCESS', props<{ id: string; data: ListCollectionResponse }>()),
  fetchFailed: createAction(
    '[LIST COLLECTION] FETCH FAILED',
    props<{ id: string; error: HttpErrorResponse | Error }>(),
  ),
}
