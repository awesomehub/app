import { ListSummaryResponse } from '../../../core';

export interface ListSummary {
  id: string;
  name: string;
  desc: string;
  score: number;
  entries: number;
  updated: string;
}

export class ListSummaryRecord implements ListSummary {
  id = null;
  name = null;
  desc = null;
  score = 0 ;
  entries = 0;
  updated = null;
}

export function createListSummary(data: ListSummaryResponse): ListSummary {
  // we're directly mergin the response data because it's identical to our model
  return Object.assign(new ListSummaryRecord(), data);
}
