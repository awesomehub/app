import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ResolveFn } from '@angular/router'
import { first, distinctUntilChanged } from 'rxjs/operators'
import { config } from '@constants'
import { ListCollectionActions, ListCollection, selectListCollection } from '@app/lists'

export const listsDataResolver: ResolveFn<ListCollection> = () => {
  const { defaultCollection } = config.lists

  const store$ = inject(Store)
  store$.dispatch(ListCollectionActions.fetch(defaultCollection))

  return store$
    .select(selectListCollection(defaultCollection))
    .pipe(
      distinctUntilChanged(),
      first(({ loaded }) => loaded),
    )
    .toPromise()
}
