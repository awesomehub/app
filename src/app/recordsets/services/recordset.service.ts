import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AppState } from '@app';
import { Recordset, RecordsetSorting, RecordsetActions, selectRecordset } from '../state';

export class RecordsetService<T> {

  private readonly recordset$: Observable<Recordset<T>>;

  constructor(private id: string, private store$: Store<AppState>) {
    this.recordset$ = this.store$.pipe(
      select(selectRecordset, { id: this.id }),
      distinctUntilChanged()
    );
  }

  fetch(): Observable<Recordset<T>> {
    return this.recordset$;
  }

  filter(id: string, filter: any): void {
    this.store$.dispatch(
      RecordsetActions.setFilter(this.id, id, filter)
    );
  }

  unfilter(id: string): void {
    this.store$.dispatch(
      RecordsetActions.unsetFilter(this.id, id)
    );
  }

  sort(sorting: RecordsetSorting): void {
    this.store$.dispatch(
      RecordsetActions.sort(this.id, sorting)
    );
  }

  setPageSize(pageSize: number): void {
    this.store$.dispatch(
      RecordsetActions.setPageSize(this.id, pageSize)
    );
  }

  paginate(): void {
    this.store$.dispatch(
      RecordsetActions.paginate(this.id)
    );
  }
}
