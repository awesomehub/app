import { inject } from '@angular/core'
import { Router, ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import type { List, ListCategory } from '../../state'

export const listCategoryDataResolver: ResolveFn<ListCategory | boolean> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const categoryPath = route.url.map((segment) => segment.path).join('/')

  const list: List = route.parent.data['list']
  const category = list.cats.find((c) => c.path === categoryPath)
  if (!category) {
    router.navigate(['404'])
    return false
  }

  const categoryPathEncoded = route.url.map((segment) => segment.toString()).join('/')
  if (categoryPath !== categoryPathEncoded) {
    // needed to redirect legacy category urls to new ones
    router.navigate(['list', list.id, ...categoryPath.split('/')], {
      queryParams: route.queryParams,
      fragment: route.fragment,
      replaceUrl: true,
    })
  }

  return category
}
