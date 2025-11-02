import { NgModule, provideZonelessChangeDetection } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { EffectsModule } from '@ngrx/effects'
import { environmentProviders } from '@constants'
import { CoreModule, RouterStateSerializerService } from './core'
import { ListsModule } from './lists'
import { AppComponent } from './app.component'
import { reducers, metaReducers } from './app.state'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [provideZonelessChangeDetection()],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{ path: '**', redirectTo: '404' }], { scrollPositionRestoration: 'top' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterStateSerializerService,
    }),
    environmentProviders,
    EffectsModule.forRoot(),
    CoreModule,
    ListsModule,
  ],
})
export class AppModule {}
