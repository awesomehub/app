import { RecordsetFilters, RecordsetSorting } from '@app/recordsets'
import type { ListCollection, ListSummary } from '../models'

export function listSummaryRecordsetReducer(
  state: ListCollection,
  filters: RecordsetFilters,
  sorting: RecordsetSorting,
): ListSummary[] {
  let lists = state.lists

  const query = filters['q']?.toLowerCase().trim()
  if (query) {
    lists = lists
      .filter((list) => list.name.toLowerCase().indexOf(query) !== -1)
      .sort((a, b) => a.name.toLowerCase().indexOf(query) - b.name.toLowerCase().indexOf(query))
  } else {
    lists = lists.slice(0).sort((a, b) => {
      const aOrder = a.score + a.entries * 0.15
      const bOrder = b.score + b.entries * 0.15
      return bOrder - aOrder
    })
  }

  return lists
}
