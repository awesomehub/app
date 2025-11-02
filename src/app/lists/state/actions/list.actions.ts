import { createAction, props } from '@ngrx/store'
import type { HttpErrorResponse } from '@angular/common/http'
import type { ListResponse } from '@app/core'

export const ListActions = {
  fetch: createAction('[LIST] FETCH', props<{ id: string }>()),
  fetchSuccess: createAction('[LIST] FETCH SUCCESS', props<{ id: string; data: ListResponse }>()),
  fetchFailed: createAction('[LIST] FETCH FAILED', props<{ id: string; error: HttpErrorResponse | Error }>()),
}
