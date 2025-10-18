import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, shareReplay, switchMap } from 'rxjs/operators'
import { config, environment } from '@constants'
import { BuildResponse, ListCollectionResponse, ListResponse } from './api.interfaces'

@Injectable()
export class ApiService {
  private readonly apiBase: string
  private readonly build$: Observable<BuildResponse>
  private readonly collectionCache = new Map<string, Observable<ListCollectionResponse>>()
  private readonly listCache = new Map<string, Observable<ListResponse>>()

  constructor(private http: HttpClient) {
    this.apiBase = `${environment.apiUrl}/`.replace(/\/$/, '')
    this.build$ = this.http
      .get<BuildResponse>(this.resolveUrl('/build.json'))
      .pipe(shareReplay({ bufferSize: 1, refCount: false }))
  }

  fetchList(id: string): Observable<ListResponse> {
    if (!this.listCache.has(id)) {
      const list$ = this.fetchListCollection(config.lists.defaultCollection).pipe(
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

      this.listCache.set(id, list$)
    }

    return this.listCache.get(id)
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    if (!this.collectionCache.has(id)) {
      const collection$ = this.build$.pipe(
        map((build) => build.urls?.[id]),
        switchMap((collectionPath) => {
          if (!collectionPath) {
            return throwError(() => new Error(`Missing list collection URL for "${id}"`))
          }
          return this.http.get<ListCollectionResponse>(this.resolveUrl(collectionPath))
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      )

      this.collectionCache.set(id, collection$)
    }

    return this.collectionCache.get(id)
  }

  private resolveUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path
    }
    const normalized = path.startsWith('/') ? path : `/${path}`
    return `${this.apiBase}${normalized}`
  }
}
