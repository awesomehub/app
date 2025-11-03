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
import {
  HomeSkeletonComponent,
  ListHomeSkeletonComponent,
  ListAllSkeletonComponent,
  DrawerSkeletonComponent,
  SearchBarSkeletonComponent,
} from './skeletons'
import { listsDataResolver, listDataResolver, listCategoryDataResolver } from './services'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeRouteComponent,
        resolve: { collection: listsDataResolver },
        data: { skeleton: HomeSkeletonComponent },
      },
      {
        path: 'search',
        component: SearchRouteComponent,
        resolve: { collection: listsDataResolver },
        data: { skeleton: HomeSkeletonComponent },
      },
      {
        path: '',
        component: SearchBarRouteComponent,
        data: {
          skeleton: SearchBarSkeletonComponent,
          placeholder: 'Search lists...',
          searchRoute: 'search',
          searchRouteMatch: '^/search[?|;|/]',
          cancelRoute: '',
        },
        outlet: 'header-bar',
      },
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
            data: { skeleton: ListHomeSkeletonComponent },
          },
          {
            path: 'all',
            component: ListAllRouteComponent,
            data: { skeleton: ListAllSkeletonComponent },
          },
          {
            path: 'search',
            component: ListSearchRouteComponent,
            data: { skeleton: ListAllSkeletonComponent },
          },
          {
            path: '**',
            resolve: {
              category: listCategoryDataResolver,
            },
            component: ListCategoryRouteComponent,
            data: { skeleton: ListAllSkeletonComponent },
          },
        ],
      },
      {
        path: '',
        component: ListCategoriesRouteComponent,
        outlet: 'drawer',
        data: { skeleton: DrawerSkeletonComponent },
      },
      {
        path: '',
        component: SearchBarRouteComponent,
        data: {
          skeleton: SearchBarSkeletonComponent,
          placeholder: 'Search this list...',
          searchRoute: 'list/:id/search',
          searchRouteMatch: '^/list/[^/]+/search',
          cancelRoute: 'list/:id',
        },
        outlet: 'header-bar',
      },
    ],
  },
]
