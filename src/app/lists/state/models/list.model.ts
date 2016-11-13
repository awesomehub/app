import { ListResponse } from '../../../core';

export interface List {
  id: string;
  name: string;
  desc: string;
  score: number;
  cats: Array<ListCategory>;
  entries: {
    'repo.github': Array<ListRepo>;
  };
  updated: string;
  loaded: boolean;
}

export interface ListCategory {
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

export interface ListRepo {
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

export class ListRecord implements List {
  id = null;
  name = null;
  desc = null;
  score = 0 ;
  cats = [];
  entries = {
    'repo.github': []
  };
  updated = null;
  loaded = false;
}

export class ListRecordFactory {
  static fromResponse(data: ListResponse): List {
    // we're directly mergin the response data because it's identical to our model
    return Object.assign(new ListRecord(), data, { loaded: true });
  }

  static empty(id: string = null): List {
    return Object.assign(new ListRecord(), { id });
  }
}

