import { Action } from '@app/common'
import { RecordsetActions } from '../actions'
import { Recordset, RecordsetSorting, RecordsetFactory, RecordsetReducer } from '../models'

export function recordsetReducer(state: Recordset<any>, { type, payload }: Action): Recordset<any> {
  switch (type) {
    case RecordsetActions.CREATE:
    case RecordsetActions.RESET:
      return RecordsetFactory.create(payload.id, payload.reducer, payload.options)

    case RecordsetActions.SET_FILTER:
      if (state.filters[payload.filterId] === payload.filter) {
        return state
      }
      return {
        ...state,
        updated: false,
        filters: {
          ...state.filters,
          [payload.filterId]: payload.filter,
        },
      }

    case RecordsetActions.UNSET_FILTER:
      if (state.filters[payload.filterId] === undefined) {
        return state
      }
      const { [payload.filterId]: _deleted, ...filters } = state.filters
      return { ...state, updated: false, filters }

    case RecordsetActions.SORT:
      const { sorting } = payload as { sorting: RecordsetSorting }
      if (sorting.by === state.sorting.by && sorting.asc === state.sorting.asc) {
        return state
      }
      return { ...state, updated: false, sorting }

    case RecordsetActions.PAGINATE:
      return paginationReducer(state, state.pagination.current + 1)

    case RecordsetActions.SET_PAGE_SIZE:
      return paginationReducer(state, 1, payload.size)

    case RecordsetActions.UPDATE:
      const { reducer } = payload as { reducer: RecordsetReducer<any, any> }
      return paginationReducer({
        ...state,
        updated: true,
        set: reducer(payload.state, state.filters, state.sorting),
      })

    default:
      return state
  }
}

function paginationReducer(state: Recordset<any>, page = 1, pageSize?: number): Recordset<any> {
  const size = pageSize === undefined ? state.pagination.size : pageSize
  const pages = Math.ceil(state.set.length / size)
  const current = Math.min(page, pages)
  const hasNext = current < pages

  return {
    ...state,
    pagination: { pages, current, size, hasNext },
    slice: state.set.slice(0, current * size),
  }
}
