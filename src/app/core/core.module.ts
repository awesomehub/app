import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule, Title as TitleService } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

// Application-wide modules
import { SharedModule } from '../shared';
import { RecordsetsModule } from '../recordsets';
import { ScrollSpyModule } from '../scroll-spy';

// Application-wide components services and components
import { ApiService, ActivatedRouteStream, CustomRouterStateSerializer } from './services';
import { Error404Component } from './route-components';
import { LoadingIndicatorComponent } from './components';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      // Routes for common error pages
      { path: '404', component: Error404Component }
    ]),
    StoreRouterConnectingModule.forRoot(),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({name: 'AwesomeHub'}),
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
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
    TitleService,
    ApiService,
    ActivatedRouteStream
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
