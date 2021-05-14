import { Action } from '../../../common';
import { RecordsetSorting, RecordsetReducer, RecordsetConstructorOptions } from '../models';

export class RecordsetActions {

  static CREATE         = '[RECORDSET] CREATE';
  static RESET          = '[RECORDSET] RESET';
  static UPDATE         = '[RECORDSET] UPDATE';
  static DESTROY        = '[RECORDSET] DESTROY';
  static SET_FILTER     = '[RECORDSET] SET FILTER';
  static UNSET_FILTER   = '[RECORDSET] UNSET FILTER';
  static SORT           = '[RECORDSET] SORT';
  static PAGINATE       = '[RECORDSET] PAGINATE';
  static SET_PAGE_SIZE  = '[RECORDSET] SET PAGE SIZE';

  static create(id: string, reducer: string, options?: RecordsetConstructorOptions): Action {
    return {
      type: RecordsetActions.CREATE,
      payload: {
        id,
        reducer,
        options
      }
    };
  }

  static reset(id: string, reducer: string, options?: RecordsetConstructorOptions): Action {
    return {
      type: RecordsetActions.RESET,
      payload: {
        id,
        reducer,
        options
      }
    };
  }

  static update(id: string, reducer: RecordsetReducer<any, any>, state: any): Action {
    return {
      type: RecordsetActions.UPDATE,
      payload: {
        id,
        reducer,
        state
      }
    };
  }

  static destroy(id: string): Action {
    return {
      type: RecordsetActions.DESTROY,
      payload: {
        id
      }
    };
  }

  static setFilter(id: string, filterId: string, filter: any): Action {
    return {
      type: RecordsetActions.SET_FILTER,
      payload: {
        id,
        filterId,
        filter
      }
    };
  }

  static unsetFilter(id: string, filterId: string): Action {
    return {
      type: RecordsetActions.UNSET_FILTER,
      payload: {
        id,
        filterId
      }
    };
  }

  static sort(id: string, sorting: RecordsetSorting): Action {
    return {
      type: RecordsetActions.SORT,
      payload: {
        id,
        sorting
      }
    };
  }

  static paginate(id: string): Action {
    return {
      type: RecordsetActions.PAGINATE,
      payload: {
        id
      }
    };
  }

  static setPageSize(id: string, size: number): Action {
    return {
      type: RecordsetActions.SET_PAGE_SIZE,
      payload: {
        id,
        size
      }
    };
  }
}
