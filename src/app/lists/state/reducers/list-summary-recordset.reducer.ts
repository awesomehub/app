import { RecordsetFilters, RecordsetSorting } from '@app/recordsets'
import { ListCollection, ListSummary } from '@app/lists'

export function listSummaryRecordsetReducer(
  state: ListCollection,
  filters: RecordsetFilters,
  sorting: RecordsetSorting,
): ListSummary[] {
  let lists = state.lists

  if (filters['q']) {
    const q = filters['q'].toLowerCase()
    lists = lists
      .filter((list) => {
        if (!q) {
          return true
        }
        return list.name.toLowerCase().indexOf(q) !== -1
      })
      .sort((a, b) => {
        if (q) {
          return a.name.toLowerCase().indexOf(q) - b.name.toLowerCase().indexOf(q)
        }
        return 0
      })
  }

  return lists
}
