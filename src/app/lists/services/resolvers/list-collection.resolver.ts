import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ResolveFn } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { first, distinctUntilChanged } from 'rxjs/operators'
import { ListCollectionActions, ListCollection, selectListCollection } from '../../state'

export const listCollectionDataResolver: ResolveFn<ListCollection> = (route) => {
  const store$ = inject(Store)
  const id: string = route.params['id'] ?? route.data['id']

  store$.dispatch(ListCollectionActions.fetch({ id }))

  const data$ = store$.select(selectListCollection(id)).pipe(
    distinctUntilChanged(),
    first(({ loaded }) => loaded),
  )

  return lastValueFrom(data$)
}
