import { Routes } from '@angular/router';

import { ListsHomePage, ListsListHomePage, ListsListAllPage, ListsListCategoryPage, ListsListAuxCategoriesPage } from './pages';
import { HomeDataResolver, ListDataResolver } from './services';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListsHomePage,
    resolve: {
      collection: HomeDataResolver
    }
  },
  {
    path: 'list/:id',
    resolve: {
      list: ListDataResolver
    },
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: ListsListHomePage,
          },
          {
            path: 'all',
            component: ListsListAllPage
          },
          {
            path: ':category',
            component: ListsListCategoryPage,
          }
        ]
      },
      {
        path: '',
        component: ListsListAuxCategoriesPage,
        outlet: 'aux-drawer'
      }
    ],

  }
];
