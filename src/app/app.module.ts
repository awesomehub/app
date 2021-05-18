import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { config, environment } from "@constants";
import { CoreModule, RouterStateSerializerService } from '@app/core';
import { ListsModule } from '@app/lists';

import { AppComponent } from './app.component';
import { reducers, metaReducers } from './app.state';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: '404' },
    ], { scrollPositionRestoration: "top" }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterStateSerializerService
    }),
    StoreDevtoolsModule.instrument({
      name: config.appname,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    CoreModule,
    ListsModule,
  ]
})
export class AppModule {}
