import { Routes } from '@angular/router';

import { ListsHomePage, ListsListHomePage, ListsListAllPage, ListsListCategoryPage, ListsListAuxCategoriesPage, SearchBarRouteComponent } from './pages';
import { HomeDataResolver, ListDataResolver, ListCategoryDataResolver } from './services';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    resolve: {
      collection: HomeDataResolver
    },
    children: [
      {
        path: '',
        component: ListsHomePage
      },
      {
        path: '',
        component: SearchBarRouteComponent,
        outlet: 'header-bar'
      }
    ]
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
            resolve: {
              category: ListCategoryDataResolver
            },
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
