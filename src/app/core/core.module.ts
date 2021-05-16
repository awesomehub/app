import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule, Title as TitleService } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

// Application-wide modules
import { SharedModule } from '@app/shared';
import { RecordsetsModule } from '@app/recordsets';
import { ScrollSpyModule } from '@app/scroll-spy';

// Application-wide components and services
import { ApiService, ActivatedRouteStreamService, CustomRouterStateSerializerService } from './services';
import { Error404Component } from './route-components';
import { LoadingIndicatorComponent } from './components';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forChild([
      // Routes for common error pages
      { path: '404', component: Error404Component }
    ]),
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
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializerService },
    TitleService,
    ApiService,
    ActivatedRouteStreamService
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
