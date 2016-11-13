import { NgModule, ModuleWithProviders } from '@angular/core';

import { RecordsetFactoryService } from './services';

@NgModule({})
export class RecordsetsModule {
  static provideService(): ModuleWithProviders {
    return {
      ngModule: RecordsetsModule,
      providers: [
        RecordsetFactoryService
      ]
    };
  }
}
