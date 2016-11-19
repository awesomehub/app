import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import {
  ListsHomePage,
  ListsListHomePage,
  ListsListAllPage,
  ListsListCategoryPage,
  ListsListAuxCategoriesPage,
  SearchBarRouteComponent
} from './pages';
import {
  ListsComponent, ListCardComponent, ListCategoriesComponent,
  ListReposComponent, ListRepoCardComponent
} from './components';
import { ListRepoScoreStyleDirective } from './directives';
import {
  HomeDataResolver,
  ListDataResolver,
  ListCategoryDataResolver,
  ListRepoScoreService
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
    // Pages
    ListsHomePage,
    ListsListHomePage,
    ListsListAllPage,
    ListsListCategoryPage,
    ListsListAuxCategoriesPage,
    SearchBarRouteComponent,
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
    HomeDataResolver,
    ListDataResolver,
    ListCategoryDataResolver,
    ListRepoScoreService
  ]
})
export class ListsModule {}
