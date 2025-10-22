import { ListSummary } from './list-summary.model'

export interface ListCollection {
  id: string
  loaded: boolean
  lists: ListSummary[]
}

export class ListCollectionRecord implements ListCollection {
  id = null
  loaded = false
  lists = []
}
