import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import {
  HomeRouteComponent, SearchRouteComponent, SearchBarRouteComponent,
  ListHomeRouteComponent, ListAllRouteComponent, ListCategoryRouteComponent, ListCategoriesRouteComponent
} from './route-components';
import {
  ListsComponent, ListCardComponent, ListCategoriesComponent,
  ListReposComponent, ListRepoCardComponent
} from './components';
import { ListRepoScoreStyleDirective } from './directives';
import {
  ListsDataResolver, ListDataResolver,
  ListCategoryDataResolver, ListRepoScoreService
} from './services';
import { ListsEffects } from './state';
import { routes } from './lists.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    EffectsModule.run(ListsEffects)
  ],
  declarations: [
    // Route Components
    HomeRouteComponent,
    SearchRouteComponent,
    SearchBarRouteComponent,
    ListHomeRouteComponent,
    ListAllRouteComponent,
    ListCategoryRouteComponent,
    ListCategoriesRouteComponent,
    // Components
    ListsComponent,
    ListCardComponent,
    ListCategoriesComponent,
    ListReposComponent,
    ListRepoCardComponent,
    // Directives
    ListRepoScoreStyleDirective
  ],
  providers: [
    ListsDataResolver,
    ListDataResolver,
    ListCategoryDataResolver,
    ListRepoScoreService
  ]
})
export class ListsModule {}
