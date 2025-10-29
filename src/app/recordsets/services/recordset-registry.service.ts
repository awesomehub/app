import { inject, Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { RecordsetActions, RecordsetConstructorOptions } from '../state'
import { RecordsetService } from './recordset.service'

@Injectable({ providedIn: 'root' })
export class RecordsetRegistryService {
  private recordsets: Record<string, RecordsetService<any>> = {}
  private store$ = inject(Store)

  register(id: string, reducer: string, options?: RecordsetConstructorOptions): RecordsetService<any> {
    if (this.recordsets[id]) {
      // Reset it if it's already created
      this.store$.dispatch(RecordsetActions.reset(id, reducer, options))
      return this.recordsets[id]
    }

    this.store$.dispatch(RecordsetActions.create(id, reducer, options))
    this.recordsets[id] = new RecordsetService(id, this.store$)
    return this.recordsets[id]
  }

  get(id: string): RecordsetService<any> {
    if (!this.recordsets[id]) {
      throw new Error(`Unable to find recordset '${id}', it must be created first.`)
    }

    return this.recordsets[id]
  }

  destroy(id: string): void {
    if (!this.recordsets[id]) {
      throw new Error(`Unable to destroy recordset '${id}', it must be created first.`)
    }

    this.store$.dispatch(RecordsetActions.destroy(id))
    delete this.recordsets[id]
  }
}
