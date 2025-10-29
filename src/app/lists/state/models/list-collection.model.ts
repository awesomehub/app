import { ListCollectionResponse, ListSummaryResponse } from '@app/core'

export interface ListSummary extends ListSummaryResponse {}

export interface ListCollection extends ListCollectionResponse {
  lists: ListSummary[]
  loaded: boolean
}

export class ListCollectionFactory {
  static initialState: ListCollection = {
    id: null,
    loaded: false,
    lists: [],
    entries: 0,
  }

  static fromResponse(data: ListCollectionResponse): ListCollection {
    return {
      ...this.initialState,
      ...data,
      loaded: true,
    }
  }

  static create(data?: Partial<ListCollection>): ListCollection {
    return { ...this.initialState, ...data }
  }
}
