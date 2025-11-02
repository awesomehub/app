import { createSelector, createFeatureSelector } from '@ngrx/store'
import { Recordset } from './recordset.model'

export const selectRecordsets = createFeatureSelector<Recordset<any>[]>('recordsets')

export const selectRecordset = (id: string) =>
  createSelector(selectRecordsets, (recordsets) => recordsets.find((rs) => rs.id === id))

export const selectDirtyRecordset = <T>(reducer: string) =>
  createSelector(selectRecordsets, (recordsets: Recordset<T>[]) =>
    recordsets.find((rs) => rs.reducer === reducer && rs.dirty),
  )
