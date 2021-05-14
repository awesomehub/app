import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// App state
import { reducers, metaReducers } from './app.state';

// App Root Component
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core';

// Feature Modules
import { ListsModule } from './lists';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    RouterModule.forRoot([
      { path: '**', redirectTo: '404' },
    ]),
    ListsModule
  ]
})
export class AppModule { }
