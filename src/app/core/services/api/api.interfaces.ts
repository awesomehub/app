export interface BuildResponse {
  number: string
  date: string
  urls: Record<string, string>
}

export interface ListCollectionResponse {
  id: string
  lists: ListSummaryResponse[]
  entries: number
}

export interface ListSummaryResponse {
  id: string
  name: string
  desc: string
  score: number
  entries: number
  updated: number
  url: string
}

export interface ListResponse {
  id: string
  name: string
  desc: string
  copyright?: string
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
  tags: string[]
  lang: string
  lic: string
  cats: number[]
  rank: 1 | 3 | 5 | 10 | 50 | 90 | 100
  score: number
  scores: {
    p: number
    h: number
    a: number
    m: number
  }
  hglt: string
}
