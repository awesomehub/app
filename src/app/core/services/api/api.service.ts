import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response } from '@angular/http';

import { AppConfig } from '../../../app.config';
import { ListCollectionResponse, ListResponse, RequestArgs, RequestOptions } from './api.interfaces';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  fetchList(id: string): Observable<ListResponse> {
    return this.request({
      url: AppConfig.API_LIST_URL + `/${id}.json`
    });
  }

  fetchListCollection(id: string): Observable<ListCollectionResponse> {
    return this.request({
      url: AppConfig.API_LISTS_URL + `/${id}.json`
    });
  }

  fetch(url: string): Observable<any> {
    return this.request({url});
  }

  request(options: RequestOptions): Observable<any> {
    const req: Request = new Request(this.requestArgs(options));
    return this.http.request(req)
      .map((res: Response) => res.json());
  }

  requestArgs(options: RequestOptions): RequestArgs {
    const { method, query, url } = options;
    let search: string[] = [];

    if (query) {
      search.push(query);
    }

    return {
      method: method || RequestMethod.Get,
      search: search.join('&'),
      url
    };
  }
}
