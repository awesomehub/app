import { Action } from '@app/common'
import { RecordsetActions } from '../actions'
import { Recordset, RecordsetSorting, RecordsetRecord, RecordsetReducer } from '../models'

export function recordsetReducer(state: Recordset<any>, { type, payload }: Action): Recordset<any> {
  let newState
  switch (type) {
    case RecordsetActions.CREATE:
    case RecordsetActions.RESET:
      return new RecordsetRecord(payload.id, payload.reducer, payload.options)

    case RecordsetActions.SET_FILTER:
      if (state.filters[payload.filterId] === payload.filter) {
        return state
      }

      return Object.assign({}, state, {
        updated: false,
        filters: {
          [payload.filterId]: payload.filter,
        },
      })

    case RecordsetActions.UNSET_FILTER:
      if (state.filters[payload.filterId] === undefined) {
        return state
      }

      const newFilters = Object.assign({}, state.filters)
      delete newFilters[payload.filterId]

      return Object.assign({}, state, {
        updated: false,
        filters: newFilters,
      })

    case RecordsetActions.SORT:
      const { sorting }: { sorting: RecordsetSorting } = payload
      if (sorting.by === state.sorting.by && sorting.asc === state.sorting.asc) {
        return state
      }

      return Object.assign({}, state, {
        updated: false,
        sorting: sorting,
      })

    case RecordsetActions.PAGINATE:
      return Object.assign({}, state, getUpdatedPagination(state, state.pagination.current + 1))

    case RecordsetActions.SET_PAGE_SIZE:
      return Object.assign({}, state, getUpdatedPagination(state, 1, payload.size))

    case RecordsetActions.UPDATE:
      const reducer: RecordsetReducer<any, any> = payload.reducer
      newState = Object.assign({}, state, {
        updated: true,
        set: reducer(payload.state, state.filters, state.sorting),
      })

      return Object.assign(newState, getUpdatedPagination(newState))

    default:
      return state
  }
}

function getUpdatedPagination(state: Recordset<any>, page = 1, pageSize?: number) {
  const size = pageSize === undefined ? state.pagination.size : pageSize
  const pages = Math.ceil(state.set.length / size)
  const current = Math.min(page, pages)
  const hasNext = current < pages

  const slice = state.set.slice(0, current * size)

  return {
    pagination: { pages, current, size, hasNext },
    slice: slice,
  }
}
