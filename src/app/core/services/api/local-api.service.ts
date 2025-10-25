import { Injectable } from '@angular/core'
import { Observable, from } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { ListCollectionResponse, ListResponse } from './api.interfaces'

@Injectable()
export class LocalApiService {
  fetchList(id: string): Observable<ListResponse> {
    return this.fromImportPromise<ListResponse>(
      async () =>
        import(`../../../../data/list/${id}.json`, {
          with: { type: 'json' },
        }),
    )
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    return this.fromImportPromise<ListCollectionResponse>(
      async () =>
        import(`../../../../data/collection/${id}.json`, {
          with: { type: 'json' },
        }),
    )
  }

  private fromImportPromise<T>(fn: () => Promise<{ default: T }>): Observable<T> {
    // fn() to ensure import promise does throw synchronously
    return from(fn()).pipe(
      map((mod) => mod.default),
      shareReplay({ bufferSize: 1, refCount: false }),
    )
  }
}
