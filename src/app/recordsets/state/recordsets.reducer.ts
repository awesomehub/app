import { createReducer, on } from '@ngrx/store'
import { Recordset, RecordsetFactory } from './recordset.model'
import { RecordsetActions } from './recordset.actions'

export type Recordsets = Recordset<any>[]

const initialState: Recordsets = []

export const recordsetsReducer = createReducer(
  initialState,
  on(RecordsetActions.create, (state, { id, reducer, options }): Recordsets => {
    if (!state.some((rs) => rs.id === id)) {
      return [...state, RecordsetFactory.create(id, reducer, options)]
    }
    return state
  }),
  on(RecordsetActions.reset, (state, { id, reducer, options }): Recordsets => {
    return updateRecordset(state, id, () => RecordsetFactory.create(id, reducer, options))
  }),
  on(RecordsetActions.destroy, (state, { id }): Recordsets => {
    return state.filter((recordset) => recordset.id !== id)
  }),
  on(RecordsetActions.setFilter, (state, { id, filterId, filterValue }): Recordsets => {
    return updateRecordset(state, id, (rs) => {
      if (rs.filters[filterId] === filterValue) return rs
      return {
        ...rs,
        dirty: true,
        filters: {
          ...rs.filters,
          [filterId]: filterValue,
        },
      }
    })
  }),
  on(RecordsetActions.unsetFilter, (state, { id, filterId }): Recordsets => {
    return updateRecordset(state, id, (rs) => {
      if (rs.filters[filterId] === undefined) return rs
      const { [filterId]: _deleted, ...filters } = rs.filters
      return { ...rs, dirty: true, filters }
    })
  }),
  on(RecordsetActions.sort, (state, { id, sorting }): Recordsets => {
    return updateRecordset(state, id, (rs) => {
      if (sorting.by === rs.sorting.by && sorting.asc === rs.sorting.asc) {
        return rs
      }
      return { ...rs, dirty: true, sorting }
    })
  }),
  on(RecordsetActions.paginate, (state, { id }): Recordsets => {
    return updateRecordset(state, id, (rs) => updatePagination(rs, rs.pagination.current + 1))
  }),
  on(RecordsetActions.setPageSize, (state, { id, size }): Recordsets => {
    return updateRecordset(state, id, (rs) => updatePagination(rs, 1, size))
  }),
  on(RecordsetActions.update, (state, { id, reducer, state: parentState }): Recordsets => {
    return updateRecordset(state, id, (rs) =>
      updatePagination({
        ...rs,
        dirty: false,
        set: reducer(parentState, rs.filters, rs.sorting),
      }),
    )
  }),
)

function updateRecordset(state: Recordsets, id: string, fn: (rs: Recordset<any>) => Recordset<any>): Recordsets {
  return state.map((rs) => (rs.id === id ? fn(rs) : rs))
}

function updatePagination(recordset: Recordset<any>, page = 1, pageSize?: number): Recordset<any> {
  const size = pageSize === undefined ? recordset.pagination.size : pageSize
  const pages = Math.ceil(recordset.set.length / size)
  const current = Math.min(page, pages)
  const hasNext = current < pages

  return {
    ...recordset,
    pagination: { pages, current, size, hasNext },
    slice: recordset.set.slice(0, current * size),
  }
}
