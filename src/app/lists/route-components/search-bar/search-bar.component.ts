import 'rxjs/add/operator/withLatestFrom';

import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { go, replace, back } from '@ngrx/router-store';

import { AppState } from '../../../app.state';
import { HeaderBarRouteComponent, ActivatedRouteStream } from '../../../core';

@Component({
  template: `
    <input #input type="search"
      [placeholder]="'Search Lists...'"
      [value]="query"
      (input)="search($event.target.value)" />
`,
  styleUrls: ['./search-bar.component.css'],
  host: {
    'class': 'list-search-bar',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarRouteComponent extends HeaderBarRouteComponent implements OnInit {

  public query: string = '';

  private searchRoute: string;
  private cancelRoute: string;
  private hasBack: boolean;

  @ViewChild('input') private input: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private routeStream: ActivatedRouteStream,
    private store$: Store<AppState>,
    private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    // Prevents input focus getting lost during typing due to component re-initiation
    this.input.nativeElement.focus();

    this.route.data.forEach(({searchRoute, cancelRoute}) => {
      this.searchRoute = searchRoute;
      this.cancelRoute = cancelRoute;
    });

    this.routeStream.getOutletStream()
      .withLatestFrom(this.route.data)
      .forEach(([{component, params}, {searchRouteComponent}]) => {
        const isSearch = component === searchRouteComponent;
        if (this.hasBack === undefined) {
          this.hasBack = !isSearch;
        }
        this.query = isSearch
          ? params['q'] || ''
          : '';
        this.cd.markForCheck();
      });
  }

  search(query: string): void {
    if (query === '') {
      this.cancel();
      return;
    }

    const path = [
      this.searchRoute,
      {
        q: query
      }
    ];
    const action = this.query === ''
      ? go(path)
      : replace(path);
    this.query = query;
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }

  cancel(): void {
    this.query = '';
    // If search is the very first page then go to the $cancelRoute
    const action = this.hasBack
      ? back()
      : go([this.cancelRoute]);
    this.store$.dispatch(action);
    this.cd.markForCheck();
  }
}
