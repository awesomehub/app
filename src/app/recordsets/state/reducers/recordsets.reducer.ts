import { Action } from '../../../common';
import { RecordsetActions } from '../actions';
import { recordsetReducer } from './recordset.reducer';
import { Recordset } from '../models';

export type Recordsets = Array<Recordset<any>>;

export function recordsetsReducer(state: Recordsets = [], action: Action): Recordsets {
  switch (action.type) {
  case RecordsetActions.CREATE:
    if (!state.some(recordset => recordset.id === action.payload.id)) {
      return [
        ...state,
        recordsetReducer(undefined, action)
      ];
    }
    return state;

  case RecordsetActions.RESET:
    return state
      .map(recordset => recordset.id === action.payload.id ? recordsetReducer(undefined, action) : recordset);

  case RecordsetActions.DESTROY:
    return state
      .filter(recordset => recordset.id !== action.payload.id);

  case RecordsetActions.UPDATE:
  case RecordsetActions.SET_FILTER:
  case RecordsetActions.UNSET_FILTER:
  case RecordsetActions.SORT:
  case RecordsetActions.PAGINATE:
  case RecordsetActions.SET_PAGE_SIZE:
    return state
      .map(recordset => recordset.id === action.payload.id ? recordsetReducer(recordset, action) : recordset );

  default:
    return state;
  }
}
