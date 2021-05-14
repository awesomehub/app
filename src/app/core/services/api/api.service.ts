import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../../../app.config';
import { ListCollectionResponse, ListResponse } from './api.interfaces';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  fetchList(id: string): Observable<ListResponse> {
    return this.http.get<ListResponse>(AppConfig.API_LIST_URL + `/${id}.json`);
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    return this.http.get<ListCollectionResponse>(AppConfig.API_LISTS_URL + `/${id}.json`);
  }
}
