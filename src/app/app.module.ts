import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { config, environment } from "@constants";
import { reducers, metaReducers } from './app.state';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ListsModule } from './lists';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: config.appname,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      { path: '**', redirectTo: '404' },
    ], { scrollPositionRestoration: "top" }),
    ListsModule
  ]
})
export class AppModule { }
