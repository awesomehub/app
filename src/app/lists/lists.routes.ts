import { Routes } from '@angular/router';

import {
  HomeRouteComponent, SearchRouteComponent, SearchBarRouteComponent,
  ListHomeRouteComponent, ListAllRouteComponent, ListCategoryRouteComponent, ListCategoriesRouteComponent
} from './route-components';
import { ListsDataResolver, ListDataResolver, ListCategoryDataResolver } from './services';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeRouteComponent,
    resolve: {
      collection: ListsDataResolver
    }
  },
  {
    path: 'search',
    component: SearchRouteComponent,
    resolve: {
      collection: ListsDataResolver
    }
  },
  {
    path: '',
    component: SearchBarRouteComponent,
    data: {
      searchRoute: 'search',
      searchRouteComponent: SearchRouteComponent,
      cancelRoute: ''
    },
    outlet: 'header-bar'
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
            component: ListHomeRouteComponent,
          },
          {
            path: 'all',
            component: ListAllRouteComponent
          },
          {
            path: ':category',
            resolve: {
              category: ListCategoryDataResolver
            },
            component: ListCategoryRouteComponent,
          }
        ]
      },
      {
        path: '',
        component: ListCategoriesRouteComponent,
        outlet: 'drawer'
      }
    ],

  }
];
