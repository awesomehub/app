import { inject } from '@angular/core'
import { Router, ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { List, ListCategory } from '@app/lists'

export const listCategoryDataResolver: ResolveFn<ListCategory | boolean> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const list: List = route.parent.data['list']
  const category = list.cats.find((c) => c.path === route.params['category'])
  if (!category) {
    router.navigate(['404'])
    return false
  }

  return category
}
