import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config, environment } from '@constants';
import { ListCollectionResponse, ListResponse } from './api.interfaces';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  fetchList(id: string): Observable<ListResponse> {
    return this.http.get<ListResponse>(environment.apiUrl + `/${config.api.endpoints.list}/${id}.json`);
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    return this.http.get<ListCollectionResponse>(environment.apiUrl + `/${config.api.endpoints.lists}/${id}.json`);
  }
}
