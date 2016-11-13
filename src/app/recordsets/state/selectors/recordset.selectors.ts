import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { Observable } from 'rxjs/Observable';

import { Selector } from '../../../common';
import { Recordset } from '../models';

export function getRecordsets(): Selector<any, Recordset<any>> {
  return (state$: Observable<any>) => state$
    .map(state => state.recordsets)
    .distinctUntilChanged()
    .switchMap((recordsets: Recordset<any>[]) => recordsets);
}

export function getRecordsetsForUpdate(reducer: string): Selector<any, Recordset<any>> {
  return (state$: Observable<any>) => state$
    .let(getRecordsets())
    .filter((recordset: Recordset<any>) => recordset.reducer === reducer && recordset.updated === false)
    .distinctUntilChanged();
}

export function getRecordset(id: string): Selector<any, Recordset<any>> {
  return (state$: Observable<any>) => state$
    .let(getRecordsets())
    .filter((recordset: Recordset<any>) => recordset.id === id)
    .distinctUntilChanged();
}
