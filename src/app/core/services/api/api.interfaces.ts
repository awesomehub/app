/**
 * Response Data
 */
export interface ListCollectionResponse {
  lists: ListSummaryResponse[]
}

export interface ListSummaryResponse {
  id: string
  name: string
  desc: string
  score: number
  entries: number
  updated: number
}

export interface ListResponse {
  id: string
  name: string
  desc: string
  score: number
  cats: ListCategoryResponse[]
  entries: {
    'repo.github': ListRepoResponse[]
  }
  updated: number
}

export interface ListCategoryResponse {
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

export interface ListRepoResponse {
  author: string
  name: string
  desc: string
  lang: string
  cats: number[]
  score: number
  scores: {
    p: number
    h: number
    a: number
    m: number
  }
  pushed: number
}
