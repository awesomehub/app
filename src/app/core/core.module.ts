import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule, Title as TitleService } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpModule } from '@angular/http';
import { RouterStoreModule } from '@ngrx/router-store';

// Application-wide modules
import { SharedModule } from '../shared';
import { RecordsetsModule } from '../recordsets';
import { ScrollSpyModule } from '../scroll-spy';

import { ApiService } from './services';
import { Error404Component } from './route-components';
import { LoadingIndicatorComponent } from './components';
import { routes } from './core.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    RouterModule.forChild(routes),
    RouterStoreModule.connectRouter(),
    ScrollSpyModule.provideService(),
    RecordsetsModule.provideService()
  ],
  declarations: [
    Error404Component,
    LoadingIndicatorComponent
  ],
  exports: [
    SharedModule,
    Error404Component,
    LoadingIndicatorComponent
  ],
  providers: [
    TitleService,
    ApiService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error ('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

export { TitleService };
