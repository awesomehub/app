import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

// App Root Component
import { AppComponent } from './app.component';

// Core Module
import { CoreModule } from './core';

// Feature Modules
import { ListsModule } from './lists';

// Our root reducer
import { rootReducer } from './app.state';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    StoreModule.provideStore(rootReducer),
    RouterModule.forRoot([
      { path: '**', redirectTo: '404' },
    ]),
    ListsModule
  ]
})
export class AppModule { }
