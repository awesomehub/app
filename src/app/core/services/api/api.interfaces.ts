/**
 * Response Data
 */
export interface ListCollectionResponse {
  lists: ListSummaryResponse[];
}

export interface ListSummaryResponse {
  id: string;
  name: string;
  desc: string;
  score: number;
  entries: number;
  updated: string;
}

export interface ListResponse {
  id: string;
  name: string;
  desc: string;
  score: number;
  cats: Array<ListCategoryResponse>;
  entries: {
    'repo.github': Array<ListRepoResponse>;
  };
  updated: string;
}

export interface ListCategoryResponse {
  id: number;
  title: string;
  path: string;
  parent: number;
  order: number;
  count: {
    all: number;
    'repo.github': number;
  }
}

export interface ListRepoResponse {
  author: string;
  name: string;
  desc: string;
  lang: string;
  cats: Array<number>;
  score: number;
  score_d: number;
  scores: {
    p: number;
    h: number;
    a: number;
    m: number;
  };
  scores_d: {
    p: number;
    h: number;
    a: number;
    m: number;
  };
  pushed: number;
  updated: number;
}
