import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollComponent } from './components';
import { ScrollSpyService } from './services';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    InfiniteScrollComponent
  ],
  exports: [
    InfiniteScrollComponent
  ]
})
export class ScrollSpyModule {
  static provideService(): ModuleWithProviders {
    return {
      ngModule: ScrollSpyModule,
      providers: [
        ScrollSpyService
      ]
    };
  }
}
