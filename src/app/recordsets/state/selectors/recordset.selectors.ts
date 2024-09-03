import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Recordset } from '../models'

export const selectRecordsets = createFeatureSelector<Recordset<any>[]>('recordsets')

export const selectRecordset = (id: string) =>
  createSelector(selectRecordsets, (recordsets) => recordsets.find((recordset) => recordset.id === id))

export const selectRecordsetsForUpdate = (reducer: string) =>
  createSelector(selectRecordsets, (recordsets) =>
    recordsets.find((recordset) => recordset.reducer === reducer && recordset.updated === false),
  )
