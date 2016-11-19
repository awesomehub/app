import { Routes } from '@angular/router';

import {
  HomeRouteComponent, SearchBarRouteComponent,
  ListHomeRouteComponent, ListAllRouteComponent,
  ListCategoryRouteComponent, ListCategoriesRouteComponent
} from './route-components';
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
        component: HomeRouteComponent
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
