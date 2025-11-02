import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { ResolveFn } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import { first, distinctUntilChanged } from 'rxjs/operators'
import { config } from '@constants'
import { ListCollectionActions, ListCollection, selectListCollection } from '../../state'

export const listsDataResolver: ResolveFn<ListCollection> = () => {
  const { defaultCollection } = config.lists

  const store$ = inject(Store)
  store$.dispatch(ListCollectionActions.fetch({ id: defaultCollection }))

  const data$ = store$.select(selectListCollection(defaultCollection)).pipe(
    distinctUntilChanged(),
    first(({ loaded }) => loaded),
  )

  return lastValueFrom(data$)
}
