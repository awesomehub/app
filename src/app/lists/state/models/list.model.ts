import { ListResponse } from '@app/core'

export interface List {
  id: string
  name: string
  desc: string
  score: number
  cats: ListCategory[]
  entries: {
    'repo.github': ListRepo[]
  }
  updated: string
  loaded: boolean
}

export interface ListCategory {
  id: number
  title: string
  path: string
  parent: number
  order: number
  count: {
    all: number
    'repo.github': number
  }
}

export type ListRepoScoreType = 'p' | 'h' | 'a' | 'm'

export interface ListRepo {
  author: string
  name: string
  desc: string
  lang: string
  lic: string
  cats: number[]
  score: number
  scores: Record<ListRepoScoreType, number>
  pushed: number
}

export class ListRecord implements List {
  id = null
  name = null
  desc = null
  score = 0
  cats = []
  entries = {
    'repo.github': [],
  }
  updated = null
  loaded = false
}

export class ListRecordFactory {
  static fromResponse(data: ListResponse): List {
    // we're directly merging the response data because it's identical to our model
    return Object.assign(new ListRecord(), data, { loaded: true })
  }

  static empty(id: string = null): List {
    return Object.assign(new ListRecord(), { id })
  }
}
