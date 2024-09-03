import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router'
import { first, distinctUntilChanged } from 'rxjs/operators'
import { ListActions, List, selectList } from '@app/lists'

export const listDataResolver: ResolveFn<List> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id']

  const store$ = inject(Store)
  store$.dispatch(ListActions.fetch(id))

  return store$
    .select(selectList(id))
    .pipe(
      distinctUntilChanged(),
      first(({ loaded }) => loaded),
    )
    .toPromise()
}
