import { createAction, props } from '@ngrx/store'
import { RecordsetSorting, RecordsetReducer, RecordsetConstructorOptions } from './recordset.model'

export const RecordsetActions = {
  create: createAction(
    '[RECORDSET] CREATE',
    props<{ id: string; reducer: string; options?: RecordsetConstructorOptions }>(),
  ),
  reset: createAction(
    '[RECORDSET] RESET',
    props<{ id: string; reducer: string; options?: RecordsetConstructorOptions }>(),
  ),
  update: createAction('[RECORDSET] UPDATE', props<{ id: string; reducer: RecordsetReducer<any, any>; state: any }>()),
  destroy: createAction('[RECORDSET] DESTROY', props<{ id: string }>()),
  setFilter: createAction('[RECORDSET] SET FILTER', props<{ id: string; filterId: string; filterValue: any }>()),
  unsetFilter: createAction('[RECORDSET] UNSET FILTER', props<{ id: string; filterId: string }>()),
  sort: createAction('[RECORDSET] SORT', props<{ id: string; sorting: RecordsetSorting }>()),
  paginate: createAction('[RECORDSET] PAGINATE', props<{ id: string }>()),
  setPageSize: createAction('[RECORDSET] SET PAGE SIZE', props<{ id: string; size: number }>()),
}
