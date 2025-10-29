import { NgModule, ModuleWithProviders } from '@angular/core'
import { RecordsetRegistryService } from './services'

@NgModule({})
export class RecordsetsModule {
  static provideService(): ModuleWithProviders<RecordsetsModule> {
    return {
      ngModule: RecordsetsModule,
      providers: [RecordsetRegistryService],
    }
  }
}
