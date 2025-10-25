import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, shareReplay, switchMap } from 'rxjs/operators'
import { config, environment } from '@constants'
import { BuildResponse, ListCollectionResponse, ListResponse } from './api.interfaces'

@Injectable()
export class RemoteApiService {
  private readonly apiBase: string
  private readonly build$: Observable<BuildResponse>
  private readonly http = inject(HttpClient)

  constructor() {
    this.apiBase = `${environment.apiUrl}/`.replace(/\/$/, '')
    this.build$ = this.http
      .get<BuildResponse>(this.resolveUrl(config.api.endpoints.build))
      .pipe(shareReplay({ bufferSize: 1, refCount: false }))
  }

  fetchBuild(): Observable<BuildResponse> {
    return this.build$
  }

  fetchList(id: string): Observable<ListResponse> {
    return this.fetchListCollection(config.lists.defaultCollection).pipe(
      map((collection) => {
        const listSummary = collection.lists.find((list) => list.id === id)
        if (!listSummary?.url) {
          throw new Error(`Unable to resolve list URL for "${id}"`)
        }
        return listSummary.url
      }),
      switchMap((url) => this.http.get<ListResponse>(this.resolveUrl(url))),
      shareReplay({ bufferSize: 1, refCount: false }),
    )
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    return this.build$.pipe(
      map((build) => build.urls?.[id]),
      switchMap((collectionPath) => {
        if (!collectionPath) {
          return throwError(() => new Error(`Missing list collection URL for "${id}"`))
        }
        return this.http.get<ListCollectionResponse>(this.resolveUrl(collectionPath))
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    )
  }

  private resolveUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path
    }
    const normalized = path.startsWith('/') ? path : `/${path}`
    return `${this.apiBase}${normalized}`
  }
}
