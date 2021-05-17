import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app';
import { Recordset } from '../models';

export const selectRecordsets = createFeatureSelector<AppState, Array<Recordset<any>>>(
  'recordsets'
);

export const selectRecordset = createSelector(
  selectRecordsets,
  (recordsets, props) => 
    recordsets.find((recordset: Recordset<any>) => 
      recordset.id === props.id
    )
);

export const selectRecordsetsForUpdate = createSelector(
  selectRecordsets,
  (recordsets, props) => 
    recordsets.find((recordset: Recordset<any>) => 
      recordset.reducer === props.reducer && recordset.updated === false
    )
);
