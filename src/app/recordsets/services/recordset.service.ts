import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import { Recordset, RecordsetSorting, RecordsetActions, getRecordset } from '../state';

export class RecordsetService<T> {

  private recordset$: Observable<Recordset<T>>;

  constructor(private id: string, private store$: Store<any>) {
    this.recordset$ = store$.let(getRecordset(this.id))
      .distinctUntilChanged();
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
