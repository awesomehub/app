export interface Recordset<T> {
  id: string
  reducer: string
  parent: string
  updated: boolean
  set: T[]
  slice: T[]
  filters: RecordsetFilters
  sorting: RecordsetSorting
  pagination: RecordsetPagination
}

export type RecordsetReducer<T, V> = (state: T, filters: RecordsetFilters, sorting: RecordsetSorting) => V[]

export type RecordsetFilters = Record<string, any>

export interface RecordsetSorting {
  by: string
  asc: boolean
}

export interface RecordsetPagination {
  pages: number
  current: number
  size: number
  hasNext: boolean
}

export interface RecordsetConstructorOptions {
  parent?: string
  filters?: RecordsetFilters
  sorting?: RecordsetSorting
  size?: number
}

export class RecordsetRecord implements Recordset<any> {
  id = null
  reducer = null
  parent = null
  updated = false
  set = []
  slice = []
  filters = {}
  sorting = {
    by: null,
    asc: true,
  }
  pagination = {
    pages: 0,
    current: 0,
    size: 10,
    hasNext: false,
  }

  constructor(id: string, reducer: string, options?: RecordsetConstructorOptions) {
    this.id = id
    this.reducer = reducer

    if (options.parent) {
      this.parent = options.parent
    }
    if (options.filters) {
      this.filters = options.filters
    }
    if (options.sorting) {
      this.sorting = options.sorting
    }
    if (options.size) {
      this.pagination.size = options.size
    }
  }
}
