import { Routes } from '@angular/router';
import {
  HomeRouteComponent, SearchRouteComponent, SearchBarRouteComponent,
  ListHomeRouteComponent, ListAllRouteComponent, ListSearchRouteComponent,
  ListCategoryRouteComponent, ListCategoriesRouteComponent
} from './route-components';
import { ListsDataResolver, ListDataResolver, ListCategoryDataResolver } from './services';

const listsSearchBarRoute = {
  path: '',
  component: SearchBarRouteComponent,
  data: {
    placeholder: 'Search lists...',
    searchRoute: 'search',
    searchRouteMatch: '^\/search[\?|\;|\/]',
    cancelRoute: ''
  },
  outlet: 'header-bar'
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: HomeRouteComponent,
        resolve: {
          collection: ListsDataResolver
        }
      },
      listsSearchBarRoute
    ]
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchRouteComponent,
        resolve: {
          collection: ListsDataResolver
        }
      },
      listsSearchBarRoute
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
            path: 'search',
            component: ListSearchRouteComponent
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
      },
      {
        path: '',
        component: SearchBarRouteComponent,
        data: {
          placeholder: 'Search this list...',
          searchRoute: 'list/{{id}}/search',
          searchRouteMatch: '^\/list\/[^\/]+\/search',
          cancelRoute: 'list/{{id}}'
        },
        outlet: 'header-bar'
      }
    ]
  }
];
