import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import {
  ListsHomePage,
  ListsListHomePage,
  ListsListAllPage,
  ListsListCategoryPage,
  ListsListAuxCategoriesPage
} from './pages';
import {
  ListSearchBarComponent, ListsComponent, ListCardComponent,
  ListCategoriesComponent, ListReposComponent, ListRepoCardComponent
} from './components';
import { ListRepoScoreStyleDirective } from './directives';
import {
  ListsSearchService,
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
    // Components
    ListSearchBarComponent,
    ListsComponent,
    ListCardComponent,
    ListCategoriesComponent,
    ListReposComponent,
    ListRepoCardComponent,
    // Directives
    ListRepoScoreStyleDirective
  ],
  exports: [
    ListSearchBarComponent
  ],
  providers: [
    ListsSearchService,
    HomeDataResolver,
    ListDataResolver,
    ListCategoryDataResolver,
    ListRepoScoreService
  ]
})
export class ListsModule {}
