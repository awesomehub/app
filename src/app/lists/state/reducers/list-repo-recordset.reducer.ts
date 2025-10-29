import { RecordsetFilters, RecordsetSorting } from '@app/recordsets'
import type { List, ListRepo } from '../models'

export function listRepoRecordsetReducer(
  state: List,
  filters: RecordsetFilters,
  sorting: RecordsetSorting,
): ListRepo[] {
  let repos = state.entries['repo.github']

  const category = filters['category']
  if (category) {
    repos = repos.filter((repo) => repo.cats.includes(category))
  }

  const query = filters['q']?.toLowerCase().trim()
  if (query) {
    const queryScores = new Map<string, number>()
    repos = repos
      .filter((repo) => {
        const key = `${repo.author}/${repo.name}`
        let score = key.toLowerCase().indexOf(query)
        if (score === -1) score = repo.desc.toLowerCase().indexOf(query)
        if (score !== -1) queryScores.set(key, score)
        return score !== -1
      })
      .sort((a, b) => {
        const sa = queryScores.get(`${a.author}/${a.name}`)!
        const sb = queryScores.get(`${b.author}/${b.name}`)!
        return sa - sb
      })
  }

  // clone the array if it wasn't cloned by above filters
  if (sorting.by && repos === state.entries['repo.github']) {
    repos = repos.slice(0)
  }

  switch (sorting.by) {
    case 'score':
      repos = repos.sort((a, b) => (sorting.asc ? a.score - b.score : b.score - a.score))
      break

    case 'score.p':
    case 'score.h':
    case 'score.a':
    case 'score.m':
      const field = sorting.by.split('.')[1]
      repos = repos.sort((a, b) =>
        sorting.asc ? a.scores[field] - b.scores[field] : b.scores[field] - a.scores[field],
      )
      break
  }

  return repos
}
