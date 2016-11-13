import { RecordsetFilters, RecordsetSorting } from '../../../recordsets';
import { List, ListRepo } from '../models';

export function listRepoRecordsetReducer(state: List, filters: RecordsetFilters, sorting: RecordsetSorting): Array<ListRepo> {
  let repos: Array<ListRepo> = state.entries['repo.github'];

  if (filters['category']) {
    repos = repos
      .filter(repo => {
        return repo.cats.indexOf(filters['category']) !== -1;
      });
  }

  // clone the array if it wasn't cloned by above filters
  if (sorting.by && repos === state.entries['repo.github']) {
    repos = repos.slice(0);
  }

  switch (sorting.by) {
    case 'score':
      repos = repos
        .sort((a, b) => sorting.asc
          ? a.score - b.score
          : b.score - a.score
        );
      break;

    case 'score.p':
    case 'score.h':
    case 'score.a':
    case 'score.m':
      let field = sorting.by.split('.')[1];
      repos = repos
        .sort((a, b) => sorting.asc
          ? a.scores[field] - b.scores[field]
          : b.scores[field] - a.scores[field]
        );
      break;
  }

  return repos;
}
