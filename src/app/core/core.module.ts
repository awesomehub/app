import { NgModule, Optional, SkipSelf } from '@angular/core'
import { RouterModule } from '@angular/router'
import { provideHttpClient, withFetch } from '@angular/common/http'

// Application-wide modules
import { SharedModule } from '@app/shared'
import { RecordsetsModule } from '@app/recordsets'
import { ScrollSpyModule } from '@app/scroll-spy'

// Application-wide components and services
import { HelmetService, ApiService, AnalyticsService, ActivatedRouteStreamService } from './services'
import { Error404Component } from './route-components'
import { LoadingIndicatorComponent } from './components'

@NgModule({
  imports: [
    RouterModule.forChild([
      // Routes for common error pages
      { path: '404', component: Error404Component },
    ]),
    SharedModule,
    ScrollSpyModule.provideService(),
    RecordsetsModule.provideService(),
  ],
  declarations: [Error404Component, LoadingIndicatorComponent],
  exports: [SharedModule, Error404Component, LoadingIndicatorComponent],
  providers: [provideHttpClient(withFetch()), HelmetService, AnalyticsService, ApiService, ActivatedRouteStreamService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.')
    }
  }
}
