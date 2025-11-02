import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { Recordset, RecordsetSorting, RecordsetActions, selectRecordset } from '../state'

export class RecordsetService<T> {
  private readonly recordset$: Observable<Recordset<T>>

  constructor(
    private id: string,
    private store$: Store,
  ) {
    this.recordset$ = this.store$.select(selectRecordset(this.id)).pipe(distinctUntilChanged())
  }

  fetch(): Observable<Recordset<T>> {
    return this.recordset$
  }

  filter(filterId: string, filterValue: any): void {
    this.store$.dispatch(RecordsetActions.setFilter({ id: this.id, filterId, filterValue }))
  }

  unfilter(filterId: string): void {
    this.store$.dispatch(RecordsetActions.unsetFilter({ id: this.id, filterId }))
  }

  sort(sorting: RecordsetSorting): void {
    this.store$.dispatch(RecordsetActions.sort({ id: this.id, sorting }))
  }

  setPageSize(size: number): void {
    this.store$.dispatch(RecordsetActions.setPageSize({ id: this.id, size }))
  }

  paginate(): void {
    this.store$.dispatch(RecordsetActions.paginate({ id: this.id }))
  }
}
