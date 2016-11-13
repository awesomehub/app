import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RecordsetActions, RecordsetConstructorOptions } from '../state';
import { RecordsetService } from './recordset.service';

@Injectable()
export class RecordsetFactoryService {

  static recordsets: {
    [index: string]: RecordsetService<any>
  } = {};

  constructor(private store$: Store<any>) {}

  create(id: string, reducer: string, options?: RecordsetConstructorOptions): RecordsetService<any> {
    if (RecordsetFactoryService.recordsets[id]) {
      // skip creating it if it's already created
      return RecordsetFactoryService.recordsets[id];
    }

    this.store$.dispatch(
      RecordsetActions.create(id, reducer, options)
    );

    RecordsetFactoryService.recordsets[id] = new RecordsetService(id, this.store$);

    return RecordsetFactoryService.recordsets[id];
  }

  get(id: string): RecordsetService<any> {
    if (!RecordsetFactoryService.recordsets[id]) {
      throw new Error(`Unable to find recordset '${id}', it must be created first.`);
    }

    return RecordsetFactoryService.recordsets[id];
  }

  destroy(id: string): void {
    if (!RecordsetFactoryService.recordsets[id]) {
      throw new Error(`Unable to find recordset '${id}', it must be created first.`);
    }

    return RecordsetFactoryService.recordsets[id].destroy();
  }
}
