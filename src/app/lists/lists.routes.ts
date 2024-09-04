import { Routes } from '@angular/router'
import {
  HomeRouteComponent,
  SearchRouteComponent,
  SearchBarRouteComponent,
  ListHomeRouteComponent,
  ListAllRouteComponent,
  ListSearchRouteComponent,
  ListCategoryRouteComponent,
  ListCategoriesRouteComponent,
} from './route-components'
import { listsDataResolver, listDataResolver, listCategoryDataResolver } from './services'

const listsSearchBarRoute = {
  path: '',
  component: SearchBarRouteComponent,
  data: {
    placeholder: 'Search lists...',
    searchRoute: 'search',
    searchRouteMatch: '^/search[?|;|/]',
    cancelRoute: '',
  },
  outlet: 'header-bar',
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: HomeRouteComponent,
        resolve: {
          collection: listsDataResolver,
        },
      },
      listsSearchBarRoute,
    ],
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        component: SearchRouteComponent,
        resolve: {
          collection: listsDataResolver,
        },
      },
      listsSearchBarRoute,
    ],
  },
  {
    path: 'list/:id',
    resolve: {
      list: listDataResolver,
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
            component: ListAllRouteComponent,
          },
          {
            path: 'search',
            component: ListSearchRouteComponent,
          },
          {
            path: ':category',
            resolve: {
              category: listCategoryDataResolver,
            },
            component: ListCategoryRouteComponent,
          },
        ],
      },
      {
        path: '',
        component: ListCategoriesRouteComponent,
        outlet: 'drawer',
      },
      {
        path: '',
        component: SearchBarRouteComponent,
        data: {
          placeholder: 'Search this list...',
          searchRoute: 'list/{{id}}/search',
          searchRouteMatch: '^/list/[^/]+/search',
          cancelRoute: 'list/{{id}}',
        },
        outlet: 'header-bar',
      },
    ],
  },
]
