import { ListResponse, ListCategoryResponse, ListRepoResponse } from '@app/core'

export interface List extends ListResponse {
  cats: ListCategory[]
  entries: {
    'repo.github': ListRepo[]
  }
  loaded: boolean
}

export interface ListCategory extends ListCategoryResponse {}

export interface ListRepo extends ListRepoResponse {}

export type ListRepoScoreType = keyof ListRepo['scores']

export class ListRecordFactory {
  static get initialState(): List {
    return {
      id: null,
      name: null,
      desc: null,
      score: 0,
      cats: [],
      entries: {
        'repo.github': [],
      },
      updated: null,
      loaded: false,
    }
  }

  static fromResponse(data: ListResponse): List {
    return Object.assign(this.initialState, data, { loaded: true })
  }

  static create(data?: Partial<List>): List {
    return Object.assign(this.initialState, data)
  }
}
