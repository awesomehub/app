import { ListCollectionResponse, ListSummaryResponse } from '@app/core'

export interface ListSummary extends ListSummaryResponse {}

export interface ListCollection extends ListCollectionResponse {
  lists: ListSummary[]
  loaded: boolean
}

export class ListCollectionFactory {
  static get initialState(): ListCollection {
    return {
      id: null,
      loaded: false,
      lists: [],
      entries: 0,
    }
  }

  static fromResponse(data: ListCollectionResponse): ListCollection {
    return Object.assign(this.initialState, data, { loaded: true })
  }

  static create(data?: Partial<ListCollection>): ListCollection {
    return Object.assign(this.initialState, data)
  }
}
